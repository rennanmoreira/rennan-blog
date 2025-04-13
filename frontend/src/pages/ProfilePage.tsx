import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogLayout from '@/components/BlogLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, User, Save } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/lib/auth-service'
import { ResponseAccountDTO } from '@/api/model'
import { accountControllerGetById, accountControllerUpdate } from '@/api/generated/account/account'

const ProfilePage = () => {
  const { user, isLoadingUser: authLoading } = useAuth()
  const [profile, setProfile] = useState<ResponseAccountDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/')
      return
    }

    const fetchProfile = async () => {
      if (!user) return

      try {
        const data = await accountControllerGetById(user.id)
        setProfile(data)
        setName(data.name || '')
      } catch (error) {
        console.error('Error fetching profile:', error)
        toast({
          title: 'Error',
          description: 'Failed to load profile data.',
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user, authLoading, navigate, toast])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setIsSaving(true)

    try {
      await accountControllerUpdate(user.id, {
        name
      })

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.'
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (authLoading || isLoading) {
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
        <h1 className="blog-title mb-8">My Profile</h1>

        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ''} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your display name"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-blog-primary hover:bg-blog-primary/90 text-white">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </BlogLayout>
  )
}

export default ProfilePage
