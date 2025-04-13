import { useQueryClient } from '@tanstack/react-query'
import {
  useAuthControllerLogin,
  useAuthControllerRegister,
  useAuthControllerLogout,
  useAuthControllerGetMe,
  getAuthControllerGetMeQueryKey
} from '@/api/generated/authentications/authentications'
import { create } from 'zustand'
import { useApiError } from '@/hooks/use-api-error'
import type { ResponseAccountDTO } from '@/api/model'

type AuthStore = {
  token: string | null
  setToken: (token: string | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
    set({ token })
  }
}))

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { token, setToken } = useAuthStore()
  const { handleError } = useApiError()

  const { data: user, isLoading: isLoadingUser } = useAuthControllerGetMe<ResponseAccountDTO>({
    query: {
      enabled: !!token,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5 // 5 minutes
    }
  })

  const { mutateAsync: loginMutation } = useAuthControllerLogin()
  const { mutateAsync: registerMutation } = useAuthControllerRegister()
  const { mutateAsync: logoutMutation } = useAuthControllerLogout()

  const login = async (data: Parameters<typeof loginMutation>[0]) => {
    try {
      const response: unknown = await loginMutation(data)
      const token = (response as { access_token: string })?.access_token
      setToken(token)
      await queryClient.invalidateQueries({ queryKey: getAuthControllerGetMeQueryKey() })
      return response
    } catch (error) {
      handleError(error)
    }
  }

  const register = async (data: Parameters<typeof registerMutation>[0]) => {
    try {
      const response: unknown = await registerMutation(data)
      const token = (response as { access_token: string })?.access_token
      setToken(token)
      await queryClient.invalidateQueries({ queryKey: getAuthControllerGetMeQueryKey() })
      return response
    } catch (error) {
      handleError(error)
    }
  }

  const logout = async () => {
    try {
      await logoutMutation()
      queryClient.setQueryData(getAuthControllerGetMeQueryKey(), null)
      setToken(null)
    } catch (error) {
      handleError(error)
    }
  }

  const refreshUserData = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: getAuthControllerGetMeQueryKey() })
    } catch (error) {
      console.error('Error refreshing user data:', error)
    }
  }

  return {
    login,
    register,
    logout,
    refreshUserData,
    user,
    isLoadingUser
  }
}
