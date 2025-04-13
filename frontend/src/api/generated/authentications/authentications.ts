/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * Rennan API
 * The Rennan API
 * OpenAPI spec version: 1.0.0
 */
import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'

import type { ChangePasswordDTO, EmailDTO, ErrorResponse, LoginDTO, RegisterDTO, ResetPasswordDTO } from '../../model'

import { api } from '../../../lib/axios'
import type { ErrorType, BodyType } from '../../../lib/axios'

export const authControllerVerifyIfEmailExists = (emailDTO: BodyType<EmailDTO>, signal?: AbortSignal) => {
  return api<void>({
    url: `/auth/verify-email`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: emailDTO,
    signal
  })
}

export const getAuthControllerVerifyIfEmailExistsMutationOptions = <
  TError = ErrorType<ErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerVerifyIfEmailExists>>,
    TError,
    { data: BodyType<EmailDTO> },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerVerifyIfEmailExists>>,
  TError,
  { data: BodyType<EmailDTO> },
  TContext
> => {
  const mutationKey = ['authControllerVerifyIfEmailExists']
  const { mutation: mutationOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerVerifyIfEmailExists>>,
    { data: BodyType<EmailDTO> }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerVerifyIfEmailExists(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerVerifyIfEmailExistsMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerVerifyIfEmailExists>>
>
export type AuthControllerVerifyIfEmailExistsMutationBody = BodyType<EmailDTO>
export type AuthControllerVerifyIfEmailExistsMutationError = ErrorType<ErrorResponse>

export const useAuthControllerVerifyIfEmailExists = <TError = ErrorType<ErrorResponse>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof authControllerVerifyIfEmailExists>>,
      TError,
      { data: BodyType<EmailDTO> },
      TContext
    >
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof authControllerVerifyIfEmailExists>>,
  TError,
  { data: BodyType<EmailDTO> },
  TContext
> => {
  const mutationOptions = getAuthControllerVerifyIfEmailExistsMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
export const authControllerRegister = (registerDTO: BodyType<RegisterDTO>, signal?: AbortSignal) => {
  return api<void>({
    url: `/auth/register`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: registerDTO,
    signal
  })
}

export const getAuthControllerRegisterMutationOptions = <
  TError = ErrorType<ErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRegister>>,
    TError,
    { data: BodyType<RegisterDTO> },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerRegister>>,
  TError,
  { data: BodyType<RegisterDTO> },
  TContext
> => {
  const mutationKey = ['authControllerRegister']
  const { mutation: mutationOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerRegister>>,
    { data: BodyType<RegisterDTO> }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerRegister(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerRegister>>>
export type AuthControllerRegisterMutationBody = BodyType<RegisterDTO>
export type AuthControllerRegisterMutationError = ErrorType<ErrorResponse>

export const useAuthControllerRegister = <TError = ErrorType<ErrorResponse>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof authControllerRegister>>,
      TError,
      { data: BodyType<RegisterDTO> },
      TContext
    >
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof authControllerRegister>>,
  TError,
  { data: BodyType<RegisterDTO> },
  TContext
> => {
  const mutationOptions = getAuthControllerRegisterMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
export const authControllerLogin = (loginDTO: BodyType<LoginDTO>, signal?: AbortSignal) => {
  return api<void>({
    url: `/auth/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: loginDTO,
    signal
  })
}

export const getAuthControllerLoginMutationOptions = <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: BodyType<LoginDTO> },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLogin>>,
  TError,
  { data: BodyType<LoginDTO> },
  TContext
> => {
  const mutationKey = ['authControllerLogin']
  const { mutation: mutationOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerLogin>>, { data: BodyType<LoginDTO> }> = (
    props
  ) => {
    const { data } = props ?? {}

    return authControllerLogin(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerLoginMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerLogin>>>
export type AuthControllerLoginMutationBody = BodyType<LoginDTO>
export type AuthControllerLoginMutationError = ErrorType<ErrorResponse>

export const useAuthControllerLogin = <TError = ErrorType<ErrorResponse>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof authControllerLogin>>,
      TError,
      { data: BodyType<LoginDTO> },
      TContext
    >
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof authControllerLogin>>,
  TError,
  { data: BodyType<LoginDTO> },
  TContext
> => {
  const mutationOptions = getAuthControllerLoginMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
export const authControllerLogout = (signal?: AbortSignal) => {
  return api<void>({ url: `/auth/logout`, method: 'POST', signal })
}

export const getAuthControllerLogoutMutationOptions = <
  TError = ErrorType<ErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof authControllerLogout>>, TError, void, TContext>
}): UseMutationOptions<Awaited<ReturnType<typeof authControllerLogout>>, TError, void, TContext> => {
  const mutationKey = ['authControllerLogout']
  const { mutation: mutationOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerLogout>>, void> = () => {
    return authControllerLogout()
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerLogout>>>

export type AuthControllerLogoutMutationError = ErrorType<ErrorResponse>

export const useAuthControllerLogout = <TError = ErrorType<ErrorResponse>, TContext = unknown>(
  options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof authControllerLogout>>, TError, void, TContext> },
  queryClient?: QueryClient
): UseMutationResult<Awaited<ReturnType<typeof authControllerLogout>>, TError, void, TContext> => {
  const mutationOptions = getAuthControllerLogoutMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
export const authControllerGetMe = (signal?: AbortSignal) => {
  return api<void>({ url: `/auth/me`, method: 'GET', signal })
}

export const getAuthControllerGetMeQueryKey = () => {
  return [`/auth/me`] as const
}

export const getAuthControllerGetMeQueryOptions = <
  TData = Awaited<ReturnType<typeof authControllerGetMe>>,
  TError = ErrorType<ErrorResponse>
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>>
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getAuthControllerGetMeQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof authControllerGetMe>>> = ({ signal }) =>
    authControllerGetMe(signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof authControllerGetMe>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type AuthControllerGetMeQueryResult = NonNullable<Awaited<ReturnType<typeof authControllerGetMe>>>
export type AuthControllerGetMeQueryError = ErrorType<ErrorResponse>

export function useAuthControllerGetMe<
  TData = Awaited<ReturnType<typeof authControllerGetMe>>,
  TError = ErrorType<ErrorResponse>
>(
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof authControllerGetMe>>,
          TError,
          Awaited<ReturnType<typeof authControllerGetMe>>
        >,
        'initialData'
      >
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useAuthControllerGetMe<
  TData = Awaited<ReturnType<typeof authControllerGetMe>>,
  TError = ErrorType<ErrorResponse>
>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof authControllerGetMe>>,
          TError,
          Awaited<ReturnType<typeof authControllerGetMe>>
        >,
        'initialData'
      >
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useAuthControllerGetMe<
  TData = Awaited<ReturnType<typeof authControllerGetMe>>,
  TError = ErrorType<ErrorResponse>
>(
  options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>> },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useAuthControllerGetMe<
  TData = Awaited<ReturnType<typeof authControllerGetMe>>,
  TError = ErrorType<ErrorResponse>
>(
  options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>> },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getAuthControllerGetMeQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

export const authControllerRefresh = (signal?: AbortSignal) => {
  return api<void>({ url: `/auth/refresh-token`, method: 'POST', signal })
}

export const getAuthControllerRefreshMutationOptions = <
  TError = ErrorType<ErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof authControllerRefresh>>, TError, void, TContext>
}): UseMutationOptions<Awaited<ReturnType<typeof authControllerRefresh>>, TError, void, TContext> => {
  const mutationKey = ['authControllerRefresh']
  const { mutation: mutationOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerRefresh>>, void> = () => {
    return authControllerRefresh()
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerRefreshMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerRefresh>>>

export type AuthControllerRefreshMutationError = ErrorType<ErrorResponse>

export const useAuthControllerRefresh = <TError = ErrorType<ErrorResponse>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof authControllerRefresh>>, TError, void, TContext>
  },
  queryClient?: QueryClient
): UseMutationResult<Awaited<ReturnType<typeof authControllerRefresh>>, TError, void, TContext> => {
  const mutationOptions = getAuthControllerRefreshMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
export const authControllerResetPassword = (resetPasswordDTO: BodyType<ResetPasswordDTO>, signal?: AbortSignal) => {
  return api<void>({
    url: `/auth/reset-password`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: resetPasswordDTO,
    signal
  })
}

export const getAuthControllerResetPasswordMutationOptions = <
  TError = ErrorType<ErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerResetPassword>>,
    TError,
    { data: BodyType<ResetPasswordDTO> },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerResetPassword>>,
  TError,
  { data: BodyType<ResetPasswordDTO> },
  TContext
> => {
  const mutationKey = ['authControllerResetPassword']
  const { mutation: mutationOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerResetPassword>>,
    { data: BodyType<ResetPasswordDTO> }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerResetPassword(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerResetPasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerResetPassword>>
>
export type AuthControllerResetPasswordMutationBody = BodyType<ResetPasswordDTO>
export type AuthControllerResetPasswordMutationError = ErrorType<ErrorResponse>

export const useAuthControllerResetPassword = <TError = ErrorType<ErrorResponse>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof authControllerResetPassword>>,
      TError,
      { data: BodyType<ResetPasswordDTO> },
      TContext
    >
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof authControllerResetPassword>>,
  TError,
  { data: BodyType<ResetPasswordDTO> },
  TContext
> => {
  const mutationOptions = getAuthControllerResetPasswordMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
export const authControllerChangePassword = (changePasswordDTO: BodyType<ChangePasswordDTO>, signal?: AbortSignal) => {
  return api<void>({
    url: `/auth/change-password`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: changePasswordDTO,
    signal
  })
}

export const getAuthControllerChangePasswordMutationOptions = <
  TError = ErrorType<ErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerChangePassword>>,
    TError,
    { data: BodyType<ChangePasswordDTO> },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerChangePassword>>,
  TError,
  { data: BodyType<ChangePasswordDTO> },
  TContext
> => {
  const mutationKey = ['authControllerChangePassword']
  const { mutation: mutationOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerChangePassword>>,
    { data: BodyType<ChangePasswordDTO> }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerChangePassword(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerChangePasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerChangePassword>>
>
export type AuthControllerChangePasswordMutationBody = BodyType<ChangePasswordDTO>
export type AuthControllerChangePasswordMutationError = ErrorType<ErrorResponse>

export const useAuthControllerChangePassword = <TError = ErrorType<ErrorResponse>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof authControllerChangePassword>>,
      TError,
      { data: BodyType<ChangePasswordDTO> },
      TContext
    >
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof authControllerChangePassword>>,
  TError,
  { data: BodyType<ChangePasswordDTO> },
  TContext
> => {
  const mutationOptions = getAuthControllerChangePasswordMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
