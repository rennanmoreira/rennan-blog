import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
  ResponseAuthMeDTO,
  ChangePasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  JwtAccessTokenPayload,
  JwtRefreshTokenPayload
} from '@auth/auth.dto'
import { AccountService } from '@accounts/account.service'
import * as bcrypt from 'bcryptjs'
import { Account } from '@prisma/client'
import { AccountWithRelations } from '@accounts/account.type'
import { parseAccount } from 'src/modules/accounts/account.parser'
import { ResponseAccountDTO } from 'src/modules/accounts/account.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService
  ) {}

  async login(data: LoginDTO): Promise<ResponseAccountDTO & { access_token: string; refresh_token: string }> {
    const user = await this.validateUser(data.email, data.password)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const new_token_version = user.token_version + 1

    const access_token = this.generateAccessToken(user, new_token_version)
    const refresh_token = this.generateRefreshToken(user, new_token_version)

    await this.accountService.update(user.id, {
      refresh_token,
      token_version: new_token_version
    })

    delete user.refresh_token

    return { ...user, access_token, refresh_token }
  }

  async refreshToken(old_refresh_token: string): Promise<{ access_token: string; refresh_token: string }> {
    const payload = this.jwtService.decode(old_refresh_token) as JwtRefreshTokenPayload

    if (!payload) {
      throw new UnauthorizedException('Invalid token')
    }

    const user = await this.accountService.getById(payload.uid)
    if (!user || user.refresh_token !== old_refresh_token) {
      throw new UnauthorizedException('Invalid token')
    }

    const newAccessToken = this.generateAccessToken(user, user.token_version)
    const newRefreshToken = this.generateRefreshToken(user, user.token_version)

    await this.accountService.update(user.id, {
      refresh_token: newRefreshToken
    })

    return { access_token: newAccessToken, refresh_token: newRefreshToken }
  }

  async changePassword(data: ChangePasswordDTO): Promise<void> {
    const user = await this.accountService.getById(data.account_id)

    if (!user) {
      throw new UnauthorizedException('Invalid user')
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    const newPasswordHash = await bcrypt.hash(data.new_password, 10)
    await this.accountService.update(user.id, {
      password: newPasswordHash,
      refresh_token: null
    })
  }

  async register(data: RegisterDTO): Promise<ResponseAccountDTO & { access_token: string; refresh_token: string }> {
    delete data.password_confirmation
    data.password = await bcrypt.hash(data.password, 10)
    const user = await this.accountService.create(data)

    const new_token_version = user.token_version + 1

    const access_token = this.generateAccessToken(user, new_token_version)
    const refresh_token = this.generateRefreshToken(user, new_token_version)

    await this.accountService.update(user.id, {
      refresh_token,
      token_version: new_token_version
    })

    return { ...user, access_token, refresh_token }
  }

  async logout(refresh_token: string): Promise<void> {
    const payload = this.jwtService.decode(refresh_token) as JwtRefreshTokenPayload

    if (payload) {
      await this.accountService.update(payload.uid, {
        refresh_token: null,
        token_version: payload.token_version + 1
      })
    }
  }

  async getMe(account: ResponseAccountDTO): Promise<ResponseAccountDTO> {
    if (!account) {
      throw new UnauthorizedException('User not recognized')
    }

    return parseAccount(account)
  }

  async resetPassword(data: ResetPasswordDTO): Promise<void> {
    if (data.password !== data.password_confirmation) {
      throw new UnauthorizedException('Password confirmation does not match')
    }

    const payload = this.jwtService.decode(data.token) as JwtAccessTokenPayload

    if (!payload || payload.uid !== data.account_id) {
      throw new UnauthorizedException('Invalid or expired token')
    }

    const user = await this.accountService.getById(data.account_id)

    if (!user) {
      throw new UnauthorizedException('Invalid user')
    }

    const newPasswordHash = await bcrypt.hash(data.password, 10)
    await this.accountService.update(user.id, {
      password: newPasswordHash,
      refresh_token: null,
      token_version: user.token_version + 1
    })
  }

  async verifyIfEmailExists(email: string): Promise<boolean> {
    return this.accountService.verifyIfEmailExists(email)
  }

  private async validateUser(email: string, password: string): Promise<ResponseAccountDTO | null> {
    const user = await this.accountService.getByEmail(email, true)
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password
      return user
    }
    return null
  }

  private generateAccessToken(user: Partial<Account>, token_version: number): string {
    const payload: JwtAccessTokenPayload = {
      email: user.email,
      uid: user.id,
      is_admin: user.is_admin,
      token_version: token_version
    }

    return this.jwtService.sign(payload, { expiresIn: '24h' })
  }

  private generateRefreshToken(user: Partial<Account>, token_version: number): string {
    const payload: JwtRefreshTokenPayload = {
      email: user.email,
      uid: user.id,
      is_admin: user.is_admin,
      token_version: token_version
    }

    return this.jwtService.sign(payload, { expiresIn: '7d' })
  }
}
