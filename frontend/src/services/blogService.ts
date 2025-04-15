import type { ResponseBlogPostDTO, ResponseCommentDTO } from '@/api/model'
import { blogPostControllerGetAll } from '@/api/generated/blog-post/blog-post'
import { getPostById, createPost, updatePost, deletePost } from './blogPostService'
import { getCommentsByPostId, addComment } from './commentService'

// Re-export types
export type { ResponseBlogPostDTO as BlogPost, ResponseCommentDTO as Comment }

export async function searchPosts(query?: string): Promise<ResponseBlogPostDTO[]> {
  try {
    const response = await blogPostControllerGetAll({
      search: query || undefined
    })
    return response.data
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

// Re-export functions
export { getPostById, createPost, updatePost, deletePost, getCommentsByPostId, addComment }
