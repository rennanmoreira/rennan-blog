/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * Rennan API
 * The Rennan API
 * OpenAPI spec version: 1.0.0
 */
import { useQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'

import type {
  AccountEventControllerGetAllParams,
  ResponseAccountEventDTO,
  ResponseAccountEventListDTO
} from '../../model'

import { api } from '../../../lib/axios'
import type { ErrorType } from '../../../lib/axios'

export const accountEventControllerGetAll = (params?: AccountEventControllerGetAllParams, signal?: AbortSignal) => {
  return api<ResponseAccountEventListDTO>({ url: `/account-events`, method: 'GET', params, signal })
}

export const getAccountEventControllerGetAllQueryKey = (params?: AccountEventControllerGetAllParams) => {
  return [`/account-events`, ...(params ? [params] : [])] as const
}

export const getAccountEventControllerGetAllQueryOptions = <
  TData = Awaited<ReturnType<typeof accountEventControllerGetAll>>,
  TError = ErrorType<unknown>
>(
  params?: AccountEventControllerGetAllParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountEventControllerGetAll>>, TError, TData>>
  }
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getAccountEventControllerGetAllQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof accountEventControllerGetAll>>> = ({ signal }) =>
    accountEventControllerGetAll(params, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof accountEventControllerGetAll>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type AccountEventControllerGetAllQueryResult = NonNullable<
  Awaited<ReturnType<typeof accountEventControllerGetAll>>
>
export type AccountEventControllerGetAllQueryError = ErrorType<unknown>

export function useAccountEventControllerGetAll<
  TData = Awaited<ReturnType<typeof accountEventControllerGetAll>>,
  TError = ErrorType<unknown>
>(
  params: undefined | AccountEventControllerGetAllParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountEventControllerGetAll>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof accountEventControllerGetAll>>,
          TError,
          Awaited<ReturnType<typeof accountEventControllerGetAll>>
        >,
        'initialData'
      >
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useAccountEventControllerGetAll<
  TData = Awaited<ReturnType<typeof accountEventControllerGetAll>>,
  TError = ErrorType<unknown>
>(
  params?: AccountEventControllerGetAllParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountEventControllerGetAll>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof accountEventControllerGetAll>>,
          TError,
          Awaited<ReturnType<typeof accountEventControllerGetAll>>
        >,
        'initialData'
      >
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useAccountEventControllerGetAll<
  TData = Awaited<ReturnType<typeof accountEventControllerGetAll>>,
  TError = ErrorType<unknown>
>(
  params?: AccountEventControllerGetAllParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountEventControllerGetAll>>, TError, TData>>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useAccountEventControllerGetAll<
  TData = Awaited<ReturnType<typeof accountEventControllerGetAll>>,
  TError = ErrorType<unknown>
>(
  params?: AccountEventControllerGetAllParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountEventControllerGetAll>>, TError, TData>>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getAccountEventControllerGetAllQueryOptions(params, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

export const accountEventControllerGetById = (accountEventId: number, signal?: AbortSignal) => {
  return api<ResponseAccountEventDTO>({ url: `/account-events/${accountEventId}`, method: 'GET', signal })
}

export const getAccountEventControllerGetByIdQueryKey = (accountEventId: number) => {
  return [`/account-events/${accountEventId}`] as const
}

export const getAccountEventControllerGetByIdQueryOptions = <
  TData = Awaited<ReturnType<typeof accountEventControllerGetById>>,
  TError = ErrorType<unknown>
>(
  accountEventId: number,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountEventControllerGetById>>, TError, TData>>
  }
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getAccountEventControllerGetByIdQueryKey(accountEventId)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof accountEventControllerGetById>>> = ({ signal }) =>
    accountEventControllerGetById(accountEventId, signal)

  return { queryKey, queryFn, enabled: !!accountEventId, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof accountEventControllerGetById>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type AccountEventControllerGetByIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof accountEventControllerGetById>>
>
export type AccountEventControllerGetByIdQueryError = ErrorType<unknown>

export function useAccountEventControllerGetById<
  TData = Awaited<ReturnType<typeof accountEventControllerGetById>>,
  TError = ErrorType<unknown>
>(
  accountEventId: number,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountEventControllerGetById>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof accountEventControllerGetById>>,
          TError,
          Awaited<ReturnType<typeof accountEventControllerGetById>>
        >,
        'initialData'
      >
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useAccountEventControllerGetById<
  TData = Awaited<ReturnType<typeof accountEventControllerGetById>>,
  TError = ErrorType<unknown>
>(
  accountEventId: number,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountEventControllerGetById>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof accountEventControllerGetById>>,
          TError,
          Awaited<ReturnType<typeof accountEventControllerGetById>>
        >,
        'initialData'
      >
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useAccountEventControllerGetById<
  TData = Awaited<ReturnType<typeof accountEventControllerGetById>>,
  TError = ErrorType<unknown>
>(
  accountEventId: number,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountEventControllerGetById>>, TError, TData>>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useAccountEventControllerGetById<
  TData = Awaited<ReturnType<typeof accountEventControllerGetById>>,
  TError = ErrorType<unknown>
>(
  accountEventId: number,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountEventControllerGetById>>, TError, TData>>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getAccountEventControllerGetByIdQueryOptions(accountEventId, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}
