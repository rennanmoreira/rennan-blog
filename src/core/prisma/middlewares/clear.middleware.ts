import { Prisma, Account } from '@prisma/client'

export function clearMiddleware() {
  return async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<any>) => {
    if (params.action === 'findMany') {
      const result = await next(params)

      return result
    }

    return next(params)
  }
}
