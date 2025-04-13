import type { ResponseBlogPostDTO, ResponseCommentDTO } from '@/api/model'

import { getAllPosts, getPostById, searchPosts, createPost, updatePost, deletePost } from './blogPostService'

import { getCommentsByPostId, addComment } from './commentService'

// Re-export types
export type { ResponseBlogPostDTO as BlogPost, ResponseCommentDTO as Comment }

// Re-export functions
export { getAllPosts, getPostById, searchPosts, createPost, updatePost, deletePost, getCommentsByPostId, addComment }
