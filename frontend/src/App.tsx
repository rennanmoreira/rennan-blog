import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import Index from './pages/Index'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import NotFound from './pages/NotFound'
import CreatePostPage from './pages/CreatePostPage'
import ProfilePage from './pages/ProfilePage'
import AllPostsPage from './pages/AllPostsPage'
import PostPage from './pages/PostPage'
import EditPostPage from './pages/EditPostPage'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <AuthProvider> */}
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit" element={<EditPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/posts" element={<AllPostsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    {/* </AuthProvider> */}
  </QueryClientProvider>
)

export default App
