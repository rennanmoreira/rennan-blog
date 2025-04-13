import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Mail, Lock, User, AlertCircle } from 'lucide-react'
import { RegisterDTO } from '@/api/model'

const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    password_confirmation: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters')
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation']
  })

interface RegisterFormProps {
  onSubmit: (data: RegisterDTO) => Promise<void>
  isLoading: boolean
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterDTO>({
    resolver: zodResolver(registerSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="name" type="text" className="pl-9" placeholder="Enter your name" {...register('name')} />
        </div>
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="email" type="email" className="pl-9" placeholder="Enter your email" {...register('email')} />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            className="pl-9"
            placeholder="Enter your password"
            {...register('password')}
          />
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      <div className="space-y-2 pb-6">
        <Label htmlFor="password_confirmation">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password_confirmation"
            type="password"
            className="pl-9"
            placeholder="Confirm your password"
            {...register('password_confirmation')}
          />
        </div>
        {errors.password_confirmation && (
          <p className="text-sm text-destructive">{errors.password_confirmation.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Register'}
      </Button>
    </form>
  )
}

export default RegisterForm
