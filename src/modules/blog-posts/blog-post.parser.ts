import { ResponseBlogPostDTO } from '@blog-posts/blog-post.dto'
import { BlogPostWithRelations } from '@blog-posts/blog-post.type'

export function parseBlogPost(blogPost: BlogPostWithRelations): ResponseBlogPostDTO {
  if (!blogPost) return null

  return {
    ...blogPost,
    id: Number(blogPost.id),

    created_at: blogPost.created_at,
    updated_at: blogPost.updated_at,
    deleted_at: blogPost.deleted_at
  }
}

export function parseBlogPostList(blogPosts: { data: BlogPostWithRelations[]; count: number }): ResponseBlogPostDTO[] {
  return blogPosts.data.map(parseBlogPost)
}
