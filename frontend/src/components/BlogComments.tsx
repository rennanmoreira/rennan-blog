import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { MessageSquare, User, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useCommentControllerCreate } from '@/api/generated/comment/comment'
import { ResponseCommentDTO } from '@/api/model'
import { useAuth } from '@/hooks/useAuth'
import { useQueryClient } from '@tanstack/react-query'

interface BlogCommentsProps {
  postId: string | number
  comments: ResponseCommentDTO[]
}

const BlogComments: React.FC<BlogCommentsProps> = ({ postId, comments }) => {
  const [newComment, setNewComment] = useState('')
  const createComment = useCommentControllerCreate({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Comment submitted',
          description: 'Your comment has been posted successfully.'
        })
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to submit your comment. Please try again.',
          variant: 'destructive'
        })
      }
    }
  })
  const queryClient = useQueryClient()
  const [postComments, setPostComments] = useState<ResponseCommentDTO[]>(comments)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    if (!user) {
      toast({
        title: 'Login required',
        description: 'Please login to comment on this post.',
        variant: 'destructive'
      })
      return
    }

    try {
      // Create a new comment
      await createComment.mutateAsync({
        data: {
          post_id: Number(postId),
          content: newComment,
          account_id: user.id || null
        }
      })

      setNewComment('')

      // Invalidate comments query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['comment'] })
    } catch (error) {
      console.error('Error submitting comment:', error)
      toast({
        title: 'Error',
        description: 'Failed to submit your comment. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="mt-12">
      <div className="border-t border-border pt-8">
        <h3 className="font-serif font-bold text-2xl mb-6 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments ({postComments.length})
        </h3>

        {/* Comment form */}
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="mb-4">
            <Textarea
              placeholder={user ? 'Write a comment...' : 'Login to comment...'}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[120px]"
              disabled={!user || createComment.isPending}
            />
          </div>
          <Button
            type="submit"
            className="bg-blog-primary hover:bg-blog-primary/90 text-white"
            disabled={!user || createComment.isPending}>
            {createComment.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              'Post Comment'
            )}
          </Button>
        </form>

        {/* Comments list */}
        {postComments.length > 0 ? (
          <div className="space-y-6">
            {postComments.map((comment, index) =>
              comment.id ? (
                <div key={comment.id} className="border-b border-border pb-6 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-muted rounded-full p-1">
                      {comment.account?.photo_url ? (
                        <img
                          src={comment.account.photo_url}
                          alt={comment.account.name}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <User className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{comment.account?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-foreground ml-11">{comment.content}</div>
                </div>
              ) : (
                <div key={`temp-${index}`} className="border-b border-border pb-6 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-muted rounded-full p-1">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-foreground ml-11">{newComment}</div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">Be the first to leave a comment!</div>
        )}
      </div>
    </div>
  )
}

export default BlogComments
