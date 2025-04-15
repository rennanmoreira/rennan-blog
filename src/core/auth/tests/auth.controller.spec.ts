import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '@auth/auth.controller'
import { AuthService } from '@auth/auth.service'
import { AccountService } from 'src/modules/accounts/account.service'
import { JwtService } from '@nestjs/jwt'
import { AccountRepository } from 'src/modules/accounts/account.repository'
import { PrismaService } from 'src/core/prisma/prisma.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    })
      .useMocker((token) => {
        const results = ['test1', 'test2']
        if (token === AuthService) {
          return { findAll: jest.fn().mockResolvedValue(results) }
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
          const Mock = moduleMocker.generateFromMetadata(mockMetadata)
          return new Mock()
        }
      })
      .compile()

    authController = moduleRef.get(AuthController)
    authService = moduleRef.get(AuthService)
  })
})
