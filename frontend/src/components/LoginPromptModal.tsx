import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import AuthModal from './AuthModal'

interface LoginPromptModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ open, onOpenChange }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const handleLogin = () => {
    onOpenChange(false)
    setIsAuthModalOpen(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>
            You need to be logged in to create a new post. Would you like to log in now?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleLogin}>Log In</Button>
        </DialogFooter>
      </DialogContent>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </Dialog>
  )
}

export default LoginPromptModal
