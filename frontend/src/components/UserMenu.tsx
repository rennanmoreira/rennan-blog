import { useState } from 'react'
import { useAuth } from '@/lib/auth-service'
import { Button } from '@/components/ui/button'
import { LogIn, LogOut, User, Plus, Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import AuthModal from './AuthModal'
import { useNavigate } from 'react-router-dom'
import { ResponseAccountDTO } from '@/api/model'

const UserMenu = () => {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.'
      })
    } catch (error) {
      // Error is already handled by useApiError
    }
  }

  const getInitials = (user: ResponseAccountDTO | null) => {
    if (!user) return 'Login'

    // Try to get name from metadata or email
    const name = user.name || user.email?.split('@')[0] || ''

    if (!name) return '?'

    // Get first letter of each word
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2)
  }

  if (!user) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsAuthModalOpen(true)}>
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Button>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </>
    )
  }

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">{getInitials(user)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* {user.is_admin && ( */}
            <DropdownMenuItem onClick={() => navigate('/create-post')} className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </DropdownMenuItem>
            {/* )} */}
            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" size="icon" onClick={() => setIsAuthModalOpen(true)}>
          <LogIn className="h-5 w-5" />
        </Button>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}

export default UserMenu
