import { Body, Controller, Get, HttpCode, Post, Res, Req, Session, Version } from '@nestjs/common'
import { ChangePasswordDTO, EmailDTO, LoginDTO, RegisterDTO, ResetPasswordDTO } from './auth.dto'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ErrorResponse } from '@utils/dtos/error-response.dto'
import { ResponseAccountDTO } from '@accounts/account.dto'
import { Request, Response } from 'express'
import { Public } from 'src/decorators/public.decorator'

@ApiTags('Authentications')
@Controller({ path: 'auth' }) //, version: '1' })
@ApiResponse({
  status: 500,
  description: 'Internal Server Error',
  type: ErrorResponse
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Version('1')
  @Post('verify-email')
  @Public()
  async verifyIfEmailExists(
    @Res() response: Response,
    @Body() data: EmailDTO
  ): Promise<Response<any, Record<string, any>>> {
    return response.sendStatus((await this.authService.verifyIfEmailExists(data.email)) ? 200 : 204)
  }

  @Post('register')
  @HttpCode(201)
  @Public()
  async register(@Body() data: RegisterDTO): Promise<ResponseAccountDTO> {
    return this.authService.register(data)
  }

  @Post('login')
  @HttpCode(200)
  @Public()
  async login(@Body() data: LoginDTO): Promise<ResponseAccountDTO> {
    return this.authService.login(data)
  }

  @Post('logout')
  @ApiBearerAuth('jwt-auth')
  @HttpCode(200)
  async logout(@Body('refresh_token') refresh_token: string): Promise<void> {
    await this.authService.logout(refresh_token)
  }

  @Get('me')
  @ApiBearerAuth('jwt-auth')
  @HttpCode(200)
  async getMe(@Req() request: Request): Promise<ResponseAccountDTO> {
    return this.authService.getMe(request['user'])
  }

  @Post('refresh-token')
  @ApiBearerAuth('jwt-auth')
  @HttpCode(201)
  async refresh(@Body('refresh_token') refresh_token: string): Promise<{ access_token: string }> {
    return this.authService.refreshToken(refresh_token)
  }

  @Post('reset-password')
  @ApiBearerAuth('jwt-auth')
  @HttpCode(200)
  async resetPassword(@Body() data: ResetPasswordDTO): Promise<void> {
    await this.authService.resetPassword(data)
  }

  @Post('change-password')
  @ApiBearerAuth('jwt-auth')
  @HttpCode(200)
  async changePassword(@Body() data: ChangePasswordDTO): Promise<void> {
    await this.authService.changePassword(data)
  }
}
