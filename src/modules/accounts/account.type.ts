import { Account } from '@prisma/client'

export type AccountWithRelations = Account & {
  refresh_token?: string
}
