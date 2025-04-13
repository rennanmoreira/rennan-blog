import { ResponseCommentDTO } from '@comments/comment.dto'
import { CommentWithRelations } from '@comments/comment.type'
import { parseAccount } from '../accounts/account.parser'
import { parseBlogPost } from '../blog-posts/blog-post.parser'

export function parseComment(comment: CommentWithRelations): ResponseCommentDTO {
  if (!comment) return null

  return {
    ...comment,
    id: Number(comment.id),
    post_id: Number(comment.post_id),
    account: parseAccount(comment.account),
    post: parseBlogPost(comment.post),
    account_id: comment.account_id,
    created_at: comment.created_at,
    updated_at: comment.updated_at,
    deleted_at: comment.deleted_at
  }
}

export function parseCommentList(comments: { data: CommentWithRelations[]; count: number }): ResponseCommentDTO[] {
  return comments.data.map(parseComment)
}
