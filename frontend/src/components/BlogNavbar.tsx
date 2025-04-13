import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Search, BookOpen, Menu, X, BookMarked } from 'lucide-react'
import UserMenu from './UserMenu'
import AuthModal from './AuthModal'
import SearchModal from './SearchModal'

const BlogNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false)

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="blog-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-6 w-6" />
              <span className="font-serif font-bold text-xl text-foreground">Rennan Blog</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-blog-primary transition-colors">
              Home
            </Link>
            <Link to="/posts" className="text-foreground hover:text-blog-primary transition-colors">
              Posts
            </Link>
            <Link to="/about" className="text-foreground hover:text-blog-primary transition-colors">
              About
            </Link>
            {/* <Link to="/admin" className="text-foreground hover:text-blog-primary transition-colors">
              Admin
            </Link> */}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchModalOpen(true)} className="rounded-full">
              <Search className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Search</span>
            </Button>
            <div className="cursor-pointer mr-2">
              <UserMenu />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2 cursor-pointer">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchModalOpen(true)} className="rounded-full">
              <Search className="h-5 w-5 text-muted-foreground" />
            </Button>
            <button
              className="p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in cursor-pointer">
            <nav className="flex flex-col gap-4">
              <div className="flex justify-between">
                <Link
                  to="/"
                  className="px-2 py-1 text-foreground hover:text-blog-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link
                  to="/about"
                  className="px-2 py-1 text-foreground hover:text-blog-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link
                  to="/posts"
                  className="px-2 py-1 text-foreground hover:text-blog-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}>
                  All Posts
                </Link>
                <Link
                  to="/admin"
                  className="px-2 py-1 text-foreground hover:text-blog-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}>
                  Admin
                </Link>
              </div>
              <div className="mt-2 cursor-pointer">
                <UserMenu />
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </header>
  )
}

export default BlogNavbar
