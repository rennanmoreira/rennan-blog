import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogLayout from '@/components/BlogLayout'
import BlogPostCard from '@/components/BlogPostCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Loader2, PlusCircle } from 'lucide-react'
import type { ResponseBlogPostDTO } from '@/api/model'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import LoginPromptModal from '@/components/LoginPromptModal'
import { useAuth } from '@/lib/auth-service'
import { useBlogStore } from '@/stores/blogStore'

// Temporary mock categories until we add them to the database
const CATEGORIES = [
  { id: 'technology', name: 'Technology' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'travel', name: 'Travel' },
  { id: 'food', name: 'Food & Cooking' },
  { id: 'health', name: 'Health & Fitness' },
  { id: 'business', name: 'Business' }
]

const AllPostsPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { posts, isLoading, searchQuery, setSearchQuery, searchBlogPosts } = useBlogStore()
  const [sortBy, setSortBy] = useState('newest')
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const sortedPosts = useMemo(() => {
    const sorted = [...posts]
    switch (sortBy) {
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      case 'updated':
        return sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
  }, [posts, sortBy]
  )

  // Handle search input
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      setSearchQuery(query)
      searchBlogPosts(query)
    },
    [setSearchQuery, searchBlogPosts]
  )

  // Initial load
  React.useEffect(() => {
    searchBlogPosts()
  }, [searchBlogPosts])

  useEffect(() => {
    if (!searchQuery) {
      searchBlogPosts()
    }
  }, [searchQuery, searchBlogPosts])

  return (
    <BlogLayout>
      <div className="blog-container py-8">
        <div className="mb-8">
          <h1 className="blog-title text-center mb-3">All Posts</h1>
          <p className="blog-subtitle text-center max-w-2xl mx-auto">Browse and discover all our articles</p>
          <div className="flex justify-center mt-6"></div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  if (user) {
                    navigate('/create-post')
                  } else {
                    setShowLoginPrompt(true)
                  }
                }}
                size="sm"
                className="bg-blog-primary hover:bg-blog-primary/90 text-white">
                <PlusCircle className="h-4 w-4 " />
                Post
              </Button>

              {/* <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 sm:my-0 my-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button> */}

              <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="updated">Last Updated</SelectItem>
                </SelectContent>
              </Select>

              {/* {(searchQuery || selectedCategories.length > 0 || sortBy !== 'newest') && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )} */}
            </div>
          </div>

          {/* {showFilters && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CATEGORIES.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )} */}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            {searchQuery ? <>No results found for "{searchQuery}"</> : <>No posts found</>}
          </div>
        )}
      </div>

      <LoginPromptModal open={showLoginPrompt} onOpenChange={setShowLoginPrompt} />
    </BlogLayout>
  )
}

export default AllPostsPage
