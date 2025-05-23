import { ResponseAccountDTO } from '@accounts/account.dto'
import { AccountWithRelations } from '@accounts/account.type'

export function parseAccount(
  account: AccountWithRelations | ResponseAccountDTO,
  returnPassword = false
): ResponseAccountDTO {
  if (!account) return null

  if (!returnPassword) delete account.password
  delete account.refresh_token

  return {
    ...account,
    id: account.id,
    name: account.name,
    created_at: account.created_at,
    updated_at: account.updated_at,
    deleted_at: account.deleted_at
  }
}

export function parseAccountList(accounts: { data: AccountWithRelations[]; count: number }): ResponseAccountDTO[] {
  return accounts.data.map((i) => parseAccount(i))
}
