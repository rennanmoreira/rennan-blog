import { AuthGuard } from '@auth/auth.guard'
import { UnauthorizedException } from '@nestjs/common'
import { ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { AccountService } from '@accounts/account.service'
import { Account } from '@prisma/client'
import { JwtAccessTokenPayload } from '../auth.dto'

describe('AuthGuard', () => {
  let authGuard: AuthGuard
  let jwtService: JwtService
  let AccountService: AccountService
  let reflector: Reflector

  const mockJwtService = {
    verifyAsync: jest.fn()
  }

  const mockAccountService = {
    getById: jest.fn()
  }

  const mockReflector = {
    getAllAndOverride: jest.fn()
  }

  const mockRequest: any = (token: string | null) => ({
    headers: {
      authorization: token ? `Bearer ${token}` : undefined
    }
  })

  const mockExecutionContext = (request: any) =>
    ({
      switchToHttp: () => ({
        getRequest: () => request
      }),
      getHandler: jest.fn(),
      getClass: jest.fn()
    }) as unknown as ExecutionContext

  beforeEach(async () => {
    jwtService = mockJwtService as any
    AccountService = mockAccountService as any
    reflector = mockReflector as any
    authGuard = new AuthGuard(jwtService, reflector, AccountService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should allow access to public routes', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(true)

    const context = mockExecutionContext(mockRequest(null))

    const result = await authGuard.canActivate(context)
    expect(result).toBe(true)
  })

  it('should throw UnauthorizedException if no token is provided', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false)

    const context = mockExecutionContext(mockRequest(null))

    await expect(authGuard.canActivate(context)).rejects.toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException if token is invalid', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false)

    const context = mockExecutionContext(mockRequest('invalid_token'))
    mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'))

    await expect(authGuard.canActivate(context)).rejects.toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException if user does not exist', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false)

    const validTokenPayload: JwtAccessTokenPayload = {
      uid: '1',
      email: 'test@example.com',
      is_admin: true,
      token_version: 1
    }

    mockJwtService.verifyAsync.mockResolvedValue(validTokenPayload)
    mockAccountService.getById.mockResolvedValue(null)

    const context = mockExecutionContext(mockRequest('valid_token'))

    await expect(authGuard.canActivate(context)).rejects.toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException if token_version does not match', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false)

    const validTokenPayload: JwtAccessTokenPayload = {
      uid: '1',
      email: 'test@example.com',
      is_admin: true,
      token_version: 1
    }

    const user = {
      id: 1,
      email: 'test@example.com',
      token_version: 2 // Different token_version
    }

    mockJwtService.verifyAsync.mockResolvedValue(validTokenPayload)
    mockAccountService.getById.mockResolvedValue(user)

    const context = mockExecutionContext(mockRequest('valid_token'))

    await expect(authGuard.canActivate(context)).rejects.toThrow(UnauthorizedException)
  })

  it('should set the user in the request if token is valid and user exists', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false)

    const userValidated: Account = {
      id: '1',
      name: 'John Doe',
      is_active: true,
      is_email_verified: true,
      is_moderator: false,
      first_name: 'John',
      last_name: 'Doe',
      lead_origin: null,
      photo_url: null,
      birth_date: null,
      email: 'contact@email.com',
      is_admin: true,
      password: 'password',
      token_version: 1,
      refresh_token: 'refresh_token',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date()
    }

    const user = {
      id: 1,
      email: 'test@example.com'
    }

    mockJwtService.verifyAsync.mockResolvedValue(userValidated)
    mockAccountService.getById.mockResolvedValue(user)

    const request = mockRequest('valid_token')
    const context = mockExecutionContext(request)

    const result = await authGuard.canActivate(context)
    expect(result).toBe(true)
    expect(request?.user).toEqual(userValidated)
  })
})
