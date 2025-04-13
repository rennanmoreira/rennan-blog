import React, { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { searchPosts } from '@/services/blogService'
import { debounce } from '@/lib/utils'
import { ResponseBlogPostDTO } from '@/api/model'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ResponseBlogPostDTO[]>([])
  const [isSearching, setIsSearching] = useState(false)
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

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      setSearchResults([])
    }
  }, [isOpen])

  // Debounced search function
  const debouncedSearch = debounce(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    try {
      const results = await searchPosts(query)
      setSearchResults(results)
    } catch (error) {
      console.error('Error searching posts:', error)
    } finally {
      setIsSearching(false)
    }
  }, 300)

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setIsSearching(true)
    debouncedSearch(query)
  }

  // Navigate to post and close modal
  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`)
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
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="max-h-[70vh] overflow-y-auto border-t">
            <div className="p-2">
              {searchResults.map((post) => (
                <div
                  key={post.id}
                  className="p-3 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => handlePostClick(post.id)}>
                  <h3 className="font-medium text-base mb-1">{highlightMatchingText(post.title, searchQuery)}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {highlightMatchingText(post.excerpt || post.content.substring(0, 120), searchQuery)}
                  </p>
                  <div className="text-xs text-muted-foreground mt-1">By {post.author.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchResults.length === 0 &&
          (isSearching ? (
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
