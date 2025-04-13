import { AxiosError } from 'axios'
import { useToast } from './use-toast'
import type { ErrorType } from '../lib/axios'

export const useApiError = () => {
  const { toast } = useToast()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: AxiosError | Error | ErrorType<Error> | any) => {
    if (error?.statusCode && error?.message && error?.error) {
      toast({
        title: `${error.error} error`,
        description: `${error.message}`, //  (status: ${error.statusCode})
        variant: 'destructive'
      })
      throw new Error(error.message)
    }

    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive'
      })
      throw new Error(message)
    }

    if (error instanceof Error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      })
      throw error
    }

    const message = 'An unexpected error occurred'
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive'
    })
    throw new Error(message)
  }

  return {
    handleError
  }
}
