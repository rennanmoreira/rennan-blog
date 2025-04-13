import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'
import { useAuth } from '@/lib/auth-service'
import { toast } from './ui/use-toast'
import { LoginDTO, RegisterDTO } from '@/api/model'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useAuth()

  const handleLogin = async (data: LoginDTO) => {
    setIsLoading(true)
    try {
      await login({ data })
      onClose()
    } catch (error) {
      // Error is already handled by useApiError
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (data: RegisterDTO) => {
    setIsLoading(true)
    try {
      await register({ data })
      onClose()
    } catch (error) {
      // Error is already handled by useApiError
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{isLogin ? 'Login' : 'Create an account'}</DialogTitle>
          <DialogDescription className="text-center">
            {isLogin ? 'Welcome back! Please login to continue.' : 'Create an account to get started.'}
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="login"
          value={isLogin ? 'login' : 'register'}
          onValueChange={(value) => setIsLogin(value === 'login')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <span className="text-sm text-muted-foreground pr-2">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
