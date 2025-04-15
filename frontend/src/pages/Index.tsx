import React, { useEffect, useState } from 'react'
import BlogLayout from '@/components/BlogLayout'
import BlogPostCard from '@/components/BlogPostCard'
import { Button } from '@/components/ui/button'
import { Loader2, ChevronRight, PlusCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth-service'
import { searchPosts } from '@/services/blogService'
import { BlogPost } from '@/services/blogService'
import LoginPromptModal from '@/components/LoginPromptModal'

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await searchPosts()
        setPosts(allPosts)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Get the featured post (first post) and remaining posts
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  if (isLoading) {
    return (
      <BlogLayout>
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </BlogLayout>
    )
  }

  return (
    <BlogLayout>
      <div className="blog-container py-8">
        <section className="mb-16">
          <h1 className="blog-title text-center mb-3">Cleanest blog concept</h1>
          <p className="blog-subtitle text-center max-w-2xl mx-auto">
            A simple blogging platform focused on clean design and excellent reading experience.
          </p>
        </section>

        {posts.length === 0 ? (
          <section className="text-center py-16">
            <h2 className="text-2xl font-serif mb-4">No posts yet</h2>
            <p className="text-muted-foreground mb-8">Be the first to create a post!</p>
            {user && (
              <Button
                onClick={() => navigate('/create-post')}
                className="bg-blog-primary hover:bg-blog-primary/90 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Post
              </Button>
            )}
          </section>
        ) : (
          <>
            <section className="mb-16">
              <h2 className="font-serif font-bold text-2xl mb-6 border-b pb-4">Featured Post</h2>
              <BlogPostCard post={featuredPost} featured />
            </section>

            <section>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4">
                <h2 className="font-serif font-bold text-2xl">Recent Posts</h2>
                <div className="flex  gap-4">
                  <Button
                    onClick={() => {
                      if (user) {
                        navigate('/create-post')
                      } else {
                        setShowLoginPrompt(true)
                      }
                    }}
                    className="bg-blog-primary hover:bg-blog-primary/90 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Post
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate('/posts')}
                    className="text-blog-primary border-blog-primary/30 hover:bg-blog-primary/5">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      <LoginPromptModal open={showLoginPrompt} onOpenChange={setShowLoginPrompt} />
    </BlogLayout>
  )
}

export default Index
