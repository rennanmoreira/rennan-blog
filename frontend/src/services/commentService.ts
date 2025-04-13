import { commentControllerCreate, commentControllerGetAll } from '@/api/generated/comment/comment'
import { ResponseCommentDTO } from '@/api/model'

export async function getCommentsByPostId(postId: string | number): Promise<ResponseCommentDTO[]> {
  const post_id = typeof postId === 'string' ? parseInt(postId, 10) : postId

  try {
    const response = await commentControllerGetAll({
      post_id,
      sort_by_created_at: 'desc'
    })

    return response.data
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

export async function addComment(comment: { blog_post_id: number; content: string; account_id: string }) {
  try {
    const response = await commentControllerCreate({
      account_id: comment.account_id,
      post_id: comment.blog_post_id,
      content: comment.content
    })

    return response
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to add comment')
  }
}
