import { ResponseCommentDTO } from '@comments/comment.dto'
import { CommentWithRelations } from '@comments/comment.type'

export function parseComment(comment: CommentWithRelations): ResponseCommentDTO {
  if (!comment) return null

  return {
    ...comment,
    id: comment.id,

    created_at: comment.created_at,
    updated_at: comment.updated_at,
    deleted_at: comment.deleted_at
  }
}

export function parseCommentList(comments: { data: CommentWithRelations[]; count: number }): ResponseCommentDTO[] {
  return comments.data.map(parseComment)
}
