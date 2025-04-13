import React, { useState } from 'react'
import BlogLayout from '@/components/BlogLayout'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlusCircle, Edit, Trash, Upload, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { useBlogPostControllerCreate, useBlogPostControllerDelete, useBlogPostControllerGetAll, useBlogPostControllerUpdate } from '@/api/generated/blog-post/blog-post'
import type { CreateBlogPostDTO, ResponseBlogPostDTO, ResponseBlogPostListDTO, ResponseCommentListDTO } from '../api/model'
import { useCommentControllerGetAll, useCommentControllerUpdate, useCommentControllerDelete } from '@/api/generated/comment/comment'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'

const AdminPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { user } = useAuth()

  // Posts state
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [editingPost, setEditingPost] = useState<number | null>(null)

  // Fetch posts
  const { data: posts, isLoading: isLoadingPosts } = useBlogPostControllerGetAll() as { data: ResponseBlogPostListDTO, isLoading: boolean }

  // Fetch comments
  const { data: comments, isLoading: isLoadingComments } = useCommentControllerGetAll() as { data: ResponseCommentListDTO, isLoading: boolean }

  // Post mutations
  const createPost = useBlogPostControllerCreate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogPost'] })
        toast({ title: 'Success', description: 'Post created successfully' })
        resetForm()
      },
      onError: () => {
        toast({ title: 'Error', description: 'Failed to create post', variant: 'destructive' })
      }
    }
  })

  const updatePost = useBlogPostControllerUpdate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogPost'] })
        toast({ title: 'Success', description: 'Post updated successfully' })
        setEditingPost(null)
        resetForm()
      },
      onError: () => {
        toast({ title: 'Error', description: 'Failed to update post', variant: 'destructive' })
      }
    }
  })

  const deletePost = useBlogPostControllerDelete({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogPost'] })
        toast({ title: 'Success', description: 'Post deleted successfully' })
      },
      onError: () => {
        toast({ title: 'Error', description: 'Failed to delete post', variant: 'destructive' })
      }
    }
  })

  // Comment mutations
  const deleteComment = useCommentControllerDelete({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comment'] })
        toast({ title: 'Success', description: 'Comment deleted successfully' })
      },
      onError: () => {
        toast({ title: 'Error', description: 'Failed to delete comment', variant: 'destructive' })
      }
    }
  })

  const resetForm = () => {
    setTitle('')
    setContent('')
    setExcerpt('')
    setEditingPost(null)
  }

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content || !excerpt) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      })
      return
    }

    if (editingPost) {
      updatePost.mutate({
        blogPostId: editingPost,
        data: { title, content, excerpt }
      })
    } else {
      createPost.mutate({
        data: { title, content, excerpt, author_id: user?.id }
      })
    }
  }

  const handleEditPost = (post: ResponseBlogPostDTO) => {
    setEditingPost(post.id)
    setTitle(post.title)
    setContent(post.content)
    setExcerpt(post.excerpt)
  }

  const handleDeletePost = (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost.mutate({ blogPostId: postId })
    }
  }

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment.mutate({ commentId })
    }
  }

  return (
    <BlogLayout>
      <div className="blog-container py-8">
        <h1 className="blog-title mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="posts">
          <TabsList className="mb-8">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-serif font-bold text-2xl">Manage Posts</h2>
                <Button
                  className="bg-blog-primary hover:bg-blog-primary/90 text-white"
                  onClick={() => navigate('/create-post')}>
                  <PlusCircle className="mr-2 h-4 w-4" /> New Post
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Title</th>
                      <th className="text-left p-4 font-medium">Author</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingPosts ? (
                      <tr>
                        <td colSpan={4} className="p-4 text-center">
                          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                        </td>
                      </tr>
                    ) : posts?.data?.map((post) => (
                      <tr key={post.id} className="border-t border-border">
                        <td className="p-4">{post.title}</td>
                        <td className="p-4">{post.author?.name || 'Unknown'}</td>
                        <td className="p-4">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive border-destructive/30 hover:bg-destructive/10"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create">
            <Card className="p-6">
              <h2 className="font-serif font-bold text-2xl mb-6">Create New Post</h2>

              <form onSubmit={handleCreatePost} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter post title"
                    />
                  </div>

                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                      Excerpt
                    </label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief summary of your post"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-1">
                      Content
                    </label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your post content..."
                      rows={12}
                    />
                  </div>

                  <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium mb-1">
                      Cover Image
                    </label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your image here, or click to browse
                      </p>
                      <Input id="coverImage" type="file" className="hidden" />
                      <Button variant="outline" size="sm" type="button">
                        Select Image
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button">
                    Save as Draft
                  </Button>
                  <Button type="submit" className="bg-blog-primary hover:bg-blog-primary/90 text-white">
                    Publish Post
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="comments">
            <h2 className="font-serif font-bold text-2xl mb-6">Manage Comments</h2>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Content</th>
                    <th className="text-left p-4 font-medium">Post</th>
                    <th className="text-left p-4 font-medium">Author</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingComments ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">
                        <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                      </td>
                    </tr>
                  ) : comments?.data?.map((comment) => (
                    <tr key={comment.id} className="border-t border-border">
                      <td className="p-4">{comment.content}</td>
                      <td className="p-4">Unknown</td>
                      <td className="p-4">{comment.account?.name || 'Unknown'}</td>
                      <td className="p-4">{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive border-destructive/30 hover:bg-destructive/10"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BlogLayout>
  )
}

export default AdminPage
