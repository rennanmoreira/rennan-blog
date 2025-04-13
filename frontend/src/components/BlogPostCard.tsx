import React from 'react'
import { Link } from 'react-router-dom'
import { CalendarIcon, Clock, User, Edit } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { BlogPost } from '@/services/blogService'
import { useAuth } from '@/lib/auth-service'

interface BlogPostCardProps {
  post: BlogPost
  featured?: boolean
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, featured = false }) => {
  const { user } = useAuth()
  const timeAgo = formatDistanceToNow(new Date(post.published_at), { addSuffix: true })

  console.log('User:', user)
  const isAuthor = user?.id === post.author?.id

  if (featured) {
    return (
      <div className="blog-card mb-12 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {post.cover_image && (
            <div className="relative aspect-video rounded-md overflow-hidden">
              <img src={post.cover_image} alt={post.title} className="object-cover w-full h-full" />
            </div>
          )}
          <div className="flex flex-col justify-center">
            <h2 className="blog-title text-2xl md:text-3xl mb-3">
              <Link to={`/posts/${post.id}`} state={featured ? { fromHome: true } : { fromPosts: true }} className="hover:text-blog-primary transition-colors">
                {post.title}
              </Link>
            </h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>{timeAgo}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.read_time} min read</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            {/* {isAuthor && (
              <Link
                to={`/posts/${post.id}/edit`}
                className="text-blog-primary hover:text-blog-primary/80 font-medium text-sm mt-auto inline-flex items-center gap-1">
                <Edit className="h-4 w-4" />
                Edit Post
              </Link>
            )} */}
            <Link to={`/posts/${post.id}`} state={featured ? { fromHome: true } : { fromPosts: true }} className="text-blog-primary hover:text-blog-primary/80 font-medium text-sm">
              Read More →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className="blog-card mb-12">
      {post.cover_image && (
        <div className="relative aspect-video mb-4 rounded-md overflow-hidden">
          <img src={post.cover_image} alt={post.title} className="object-cover w-full h-full" />
        </div>
      )}
      <h3 className="font-serif font-bold text-xl mb-2">
        <Link to={`/posts/${post.id}`} state={{ fromPosts: true }} className="hover:text-blog-primary transition-colors">
          {post.title}
        </Link>
      </h3>
      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          <span>{post.author.name}</span>
        </div>
        {/* <div className="flex items-center gap-1">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>{timeAgo}</span>
        </div> */}
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{post.read_time} min read</span>
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-4 flex-grow">
        {post.excerpt || post.content.substring(0, 120) + '...'}
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={`/posts/${post.id}`}
          state={featured ? { fromHome: true } : { fromPosts: true }}
          className="text-blog-primary hover:text-blog-primary/80 font-medium text-sm mt-auto inline-flex items-center gap-1">
          Read More →
        </Link>
        {/* {isAuthor && (
          <Link
            to={`/posts/${post.id}/edit`}
            className="text-blog-primary hover:text-blog-primary/80 font-medium text-sm mt-auto inline-flex items-center gap-1">
            <Edit className="h-4 w-4" />
            Edit Post
          </Link>
        )} */}
      </div>
    </article>
  )
}

export default BlogPostCard
