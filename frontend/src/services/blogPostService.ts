import {
  blogPostControllerCreate,
  blogPostControllerDelete,
  blogPostControllerGetAll,
  blogPostControllerGetById,
  blogPostControllerUpdate
} from '@/api/generated/blog-post/blog-post'
import type { CreateBlogPostDTO, ResponseBlogPostDTO, UpdateBlogPostDTO } from '@/api/model'

export async function getAllPosts(): Promise<ResponseBlogPostDTO[]> {
  try {
    const response = await blogPostControllerGetAll()
    return response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export async function getPostById(id: string | number): Promise<ResponseBlogPostDTO | null> {
  const postId = typeof id === 'string' ? parseInt(id, 10) : id

  try {
    const response = await blogPostControllerGetById(postId)
    return response
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function createPost(post: CreateBlogPostDTO): Promise<ResponseBlogPostDTO> {
  try {
    const response = await blogPostControllerCreate(post)
    return response
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export async function updatePost(id: number, post: UpdateBlogPostDTO): Promise<ResponseBlogPostDTO> {
  try {
    const response = await blogPostControllerUpdate(id, post)
    return response
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

export async function deletePost(id: number): Promise<void> {
  try {
    await blogPostControllerDelete(id)
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}

export async function searchPosts(query: string): Promise<ResponseBlogPostDTO[]> {
  if (!query.trim()) return []

  try {
    const response = await blogPostControllerGetAll()
    return response.data.filter(
      (post) =>
        post?.title?.toLowerCase().includes(query.toLowerCase()) ||
        post?.content?.toLowerCase().includes(query.toLowerCase()) ||
        post?.author?.name?.toLowerCase().includes(query.toLowerCase()) ||
        post?.excerpt?.toLowerCase().includes(query.toLowerCase())
    )
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}
