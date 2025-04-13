import { Comment } from '@prisma/client'
import { AccountWithRelations } from '../accounts/account.type'
import { BlogPostWithRelations } from '../blog-posts/blog-post.type'

export type CommentWithRelations = Comment & {
  account?: AccountWithRelations
  post?: BlogPostWithRelations
}
