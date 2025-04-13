import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogLayout from '@/components/BlogLayout'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, ArrowLeft, Save, FileImage } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { createPost } from '@/services/blogService'
import { useAuth } from '@/lib/auth-service'

const CreatePostPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { user, isLoadingUser: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: 'Authentication required',
        description: 'Please login to create posts.',
        variant: 'destructive'
      })
      navigate('/')
    }
  }, [user, authLoading, navigate, toast])

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content || !excerpt) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      })
      return
    }

    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be logged in to create a post.',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)

    try {
      const post = await createPost({
        title,
        content,
        excerpt,
        cover_image: coverImage || undefined,
        author_id: user.id // Pass the user's UUID
      })

      toast({
        title: 'Post created',
        description: 'Your post has been created successfully!'
      })

      // Navigate to the new post
      navigate(`/posts/${post.id}`)
    } catch (error) {
      console.error('Error creating post:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to create post. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <BlogLayout>
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
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

        <h1 className="blog-title mb-8">Create New Post</h1>

        <Card className="p-6">
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
                  required
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
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content (Markdown supported)
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content..."
                  rows={12}
                  required
                />
              </div>

              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium mb-1">
                  Cover Image URL (optional)
                </label>
                <div className="flex gap-2">
                  <Input
                    id="coverImage"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-shrink-0"
                    onClick={() => window.open(coverImage, '_blank')}
                    disabled={!coverImage}>
                    <FileImage className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Enter a URL to an image hosted online</p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blog-primary hover:bg-blog-primary/90 text-white"
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Publish Post
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </BlogLayout>
  )
}

export default CreatePostPage
