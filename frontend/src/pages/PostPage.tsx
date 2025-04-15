import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import BlogLayout from '@/components/BlogLayout'
import BlogComments from '@/components/BlogComments'
import { CalendarIcon, Clock, User, ArrowLeft, Loader2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import { renderMarkdown } from '@/utils/markdown'
import { useBlogPostControllerGetById } from '@/api/generated/blog-post/blog-post'
import { useCommentControllerGetAll } from '@/api/generated/comment/comment'
import { useAuth } from '@/lib/auth-service'

const PostPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const postId = id ? parseInt(id) : 0
  const { user } = useAuth()

  const { data: post, isLoading: isLoadingPost } = useBlogPostControllerGetById(postId)
  const { data: comments, isLoading: isLoadingComments } = useCommentControllerGetAll(
    {
      post_id: postId
    },
    {
      query: {
        queryKey: ['comment', 'getAll', { post_id: postId }]
      }
    }
  )

  const isLoading = isLoadingPost || isLoadingComments
  useEffect(() => {
    const hash = window.location.hash
    if (hash && !isLoadingComments && comments) {
      const element = document.getElementById(hash.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [isLoadingComments, comments, post])

  if (isLoading) {
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
          <Button onClick={() => navigate('/')} className="bg-blog-primary hover:bg-blog-primary/90 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </BlogLayout>
    )
  }

  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
  const htmlContent = renderMarkdown(post.content)
  const isAuthor = user?.id === post.author?.id
  const fromPosts = location.state?.fromPosts
  const fromHome = location.state?.fromHome

  const getBackButtonText = () => {
    if (fromHome) return 'Back to home'
    if (fromPosts) return 'Back to posts'
    return 'Back to manage'
  }

  const getBackPath = () => {
    if (fromHome) return '/'
    if (fromPosts) return '/posts'
    return '/admin'
  }

  return (
    <BlogLayout>
      <article className="blog-container py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(getBackPath())}
            className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> {getBackButtonText()}
          </Button>
        </div>

        <header className="mb-8">
          <h1 className="blog-title mb-4">{post.title}</h1>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {post?.author?.photo_url ? (
                  <img src={post.author.photo_url} alt={post.author.name} className="h-6 w-6 rounded-full" />
                ) : (
                  <User className="h-5 w-5" />
                )}
                <span>{post?.author?.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{timeAgo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.read_time} min read</span>
                </div>
              </div>
            </div>

            {isAuthor && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/posts/${post.id}/edit`)}
                  className="text-blog-primary hover:text-blog-primary/90">
                  <Edit /> Edit Post
                </Button>
              </div>
            )}
          </div>

          {post.cover_image && (
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img src={post.cover_image} alt={post.title} className="object-cover w-full h-full" />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        <BlogComments postId={post.id} comments={comments?.data || []} />
      </article>
    </BlogLayout>
  )
}

export default PostPage
