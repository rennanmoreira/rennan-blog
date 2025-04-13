import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BlogLayout from '@/components/BlogLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, User, Save, ArrowLeft, Upload } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useBlogPostControllerGetById, useBlogPostControllerUpdate } from '@/api/generated/blog-post/blog-post'
import { useAuth } from '@/lib/auth-service'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const postId = id ? parseInt(id) : 0
  const { user } = useAuth()
  const { toast } = useToast()

  const { data: post, isLoading: isLoadingPost } = useBlogPostControllerGetById(postId)
  const updatePost = useBlogPostControllerUpdate()

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [newCoverImage, setNewCoverImage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setExcerpt(post.excerpt || '')
      setContent(post.content)
      setCoverImage(post.cover_image || '')
      setNewCoverImage(post.cover_image || '')
    }
  }, [post])

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!post) return

    setIsSaving(true)

    try {
      await updatePost.mutateAsync({
        blogPostId: post.id,
        data: {
          title,
          excerpt,
          content,
          cover_image: newCoverImage
        }
      })

      toast({
        title: 'Post updated',
        description: 'Your post has been updated successfully.'
      })

      navigate(`/posts/${post.id}`)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update post. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoadingPost) {
    return (
      <BlogLayout>
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </BlogLayout>
    )
  }

  if (!post) {
    return (
      <BlogLayout>
        <div className="blog-container py-16 text-center">
          <h1 className="blog-title mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/admin')} className="bg-blog-primary hover:bg-blog-primary/90 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to manage
          </Button>
        </div>
      </BlogLayout>
    )
  }

  return (
    <BlogLayout>
      <div className="blog-container py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin')}
          className="mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to manage
        </Button>

        <Card className="p-6">
          <CardHeader>
            <Label htmlFor="author">Author</Label>
            <div className="flex items-center gap-2 bg-muted/50 rounded-md p-2">
              {post.author?.photo_url ? (
                <img src={post.author.photo_url} alt={post.author.name} className="h-8 w-8 rounded-full" />
              ) : (
                <User className="h-8 w-8 text-muted-foreground" />
              )}
              <span className="font-medium">{post.author?.name}</span>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSavePost} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Input
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief summary of your post"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content..."
                    rows={12}
                    className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div>
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    {coverImage ? (
                      <>
                        <img src={coverImage} alt="Cover" className="w-full h-48 object-cover rounded-lg mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">Current image URL: {coverImage}</p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground mb-2">Enter the URL of your cover image</p>
                    )}
                    <Input
                      id="coverImage"
                      type="url"
                      value={newCoverImage}
                      onChange={(e) => setNewCoverImage(e.target.value)}
                      placeholder="Enter image URL"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" onClick={() => navigate('/admin')}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-blog-primary hover:bg-blog-primary/90 text-white">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </BlogLayout>
  )
}

export default EditPostPage
