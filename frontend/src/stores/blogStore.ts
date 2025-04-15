import { create } from 'zustand'
import type { ResponseBlogPostDTO } from '@/api/model'
import { searchPosts } from '@/services/blogService'

interface BlogStore {
  posts: ResponseBlogPostDTO[]
  isLoading: boolean
  searchQuery: string
  setPosts: (posts: ResponseBlogPostDTO[]) => void
  setLoading: (loading: boolean) => void
  setSearchQuery: (query: string) => void
  searchBlogPosts: (query?: string) => Promise<void>
}

export const useBlogStore = create<BlogStore>((set) => ({
  posts: [],
  isLoading: false,
  searchQuery: '',
  setPosts: (posts) => set({ posts }),
  setLoading: (loading) => set({ isLoading: loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  searchBlogPosts: async (query?: string) => {
    set({ isLoading: true })
    try {
      const results = await searchPosts(query)
      set({ posts: results })
    } catch (error) {
      console.error('Error searching posts:', error)
    } finally {
      set({ isLoading: false })
    }
  }
}))
