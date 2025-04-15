import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { debounce } from '@/lib/utils'
import { useBlogStore } from '@/stores/blogStore'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { posts, isLoading, searchQuery, setSearchQuery, searchBlogPosts } = useBlogStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])
  // Create memoized debounced search function
  const debouncedSearchFn = useMemo(
    () =>
      debounce(async (query: string) => {
        await searchBlogPosts(query)
      }, 400),
    [searchBlogPosts]
  )

  // Load initial results when modal opens
  useEffect(() => {
    if (isOpen && posts.length === 0) {
      searchBlogPosts()
    }
  }, [isOpen, posts.length, searchBlogPosts])

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      setSearchQuery(query)
      debouncedSearchFn(query)
    },
    [debouncedSearchFn, setSearchQuery]
  )

  // Navigate to post and close modal
  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`)
    onClose()
  }

  // Highlight matching text
  const highlightMatchingText = (text: string, query: string) => {
    if (!query.trim()) return text

    const parts = text.split(new RegExp(`(${query})`, 'gi'))

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <strong key={i} className="bg-yellow-100 dark:bg-yellow-900">
          {part}
        </strong>
      ) : (
        part
      )
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search posts..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {isLoading && (
              <Loader2 className="absolute right-9 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>

        {posts.length > 0 && (
          <div className="max-h-[70vh] overflow-y-auto border-t">
            <div className="p-2">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-3 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => handlePostClick(post.id)}>
                  <h3 className="font-medium text-base mb-1">{highlightMatchingText(post.title, searchQuery)}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {highlightMatchingText(post?.excerpt || post?.content?.substring(0, 120), searchQuery)}
                  </p>
                  <div className="text-xs text-muted-foreground mt-1">
                    By {highlightMatchingText(post?.author?.name, searchQuery)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {posts.length === 0 &&
          (isLoading ? (
            <div className="flex items-center justify-center pt-1 pb-8">
              <Loader2 className="animate-spin" />
            </div>
          ) : searchQuery ? (
            <div className="pt-1 pb-8 text-center text-muted-foreground">No results found for "{searchQuery}"</div>
          ) : (
            <div className="pt-1 pb-8 text-center text-muted-foreground">No results found</div>
          ))}
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal
