import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useAuthStore } from './auth-service'

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:3000'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().setToken(null)
    }
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const api = async <T>(config: AxiosRequestConfig) => {
  try {
    const response = await axiosInstance(config)
    return response.data as T
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message
    }
    throw error
  }
}

export type ErrorType<Error> = AxiosError<Error>
export type BodyType<BodyData> = BodyData
