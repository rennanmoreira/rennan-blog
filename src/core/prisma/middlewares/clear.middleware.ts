import { Prisma, Account } from '@prisma/client'

export function clearMiddleware() {
  return async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<any>) => {
    if (params.action === 'findMany') {
      const result = await next(params)

      if (params.model === 'Account' && Array.isArray(result)) {
        // result.forEach((account: Account) => {
        //   delete account.password
        //   delete account.refresh_token
        // })
      }
      return result
    }

    return next(params)
  }
}
