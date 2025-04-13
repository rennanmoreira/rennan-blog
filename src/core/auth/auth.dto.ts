import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  IsStrongPassword,
  IsBoolean
} from 'class-validator'
import { Role } from 'src/enums/role.enum'
import { ResponseAccountDTO } from '@accounts/account.dto'
import { Match } from 'src/decorators/match.decorator'

export interface JwtAccessTokenPayload {
  uid: string
  email: string
  is_admin: boolean
  token_version?: number
}

export interface JwtRefreshTokenPayload {
  uid: string
  email: string
  is_admin: boolean
  token_version?: number
}
export class AuthLoginDto {
  @IsEmail({}, { message: 'E-mail ou senha inválidos' })
  @MinLength(3, { message: 'E-mail ou senha inválidos' })
  email: string

  @MinLength(6, { message: 'E-mail ou senha inválidos' })
  // @IsStrongPassword({minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0}, { message: 'E-mail ou senha inválidos'})
  password: string
}

export class EmailDTO {
  @ApiProperty({
    example: 'user@test.com',
    description: 'Email of the account',
    type: String
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'E-mail inválido' })
  @MinLength(3, { message: 'E-mail inválido' })
  email: string
}

export class LoginDTO extends EmailDTO {
  @ApiProperty({
    example: '123456',
    description: 'Password of the account',
    type: String
  })
  @IsString()
  @MinLength(6, { message: 'E-mail ou senha inválidos' })
  password: string
}

export class LoginWithLinkDTO extends EmailDTO {
  @ApiPropertyOptional({
    example: 'https://api.rennan.com.br',
    description: 'Base url to redirect login',
    type: String
  })
  @IsOptional()
  @IsString()
  base_url?: string
}

export class RegisterDTO {
  @ApiProperty({
    example: 'user@test.com',
    description: 'Email of the account',
    type: String
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'O campo e-mail precisa ter pelo menos 3 caracteres' })
  @IsEmail({}, { message: 'O campo e-mail está inválido' })
  email: string

  @ApiProperty({
    example: '123456',
    description: 'Password of the account',
    type: String
  })
  @IsNotEmpty()
  @MinLength(6, { message: 'Senha precisa ter no mínimo 6 caracteres' })
  @IsStrongPassword(
    { minLength: 6, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 },
    { message: 'Senha precisa ter no mínimo 6 caracteres' }
  )
  password: string

  @ApiProperty({
    example: '123456',
    description: 'Password confirmation',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  password_confirmation: string

  @ApiProperty({
    example: 'User Test',
    description: 'Display name of the account',
    type: String
  })
  @IsString()
  @IsNotEmpty({ message: `Campo 'name' não pode ser vazio` })
  @MinLength(6, { message: 'name precisa ter no mínimo 6 caracteres' })
  name: string
}

export class ChangePasswordDTO {
  @ApiProperty({
    example: 1,
    description: 'Id of the account',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  account_id: string

  @ApiProperty({
    example: 'password',
    description: 'Current password of the account',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({
    example: 'newpassword',
    description: 'New password of the account',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  new_password: string

  @ApiProperty({
    example: 'newpassword',
    description: 'New password confirmation',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @Match('new_password', { message: 'New passwords do not match' })
  new_password_confirmation: string
}

export class ResetPasswordDTO {
  @ApiProperty({
    example: 1,
    description: 'Id of the account',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  account_id: string

  @ApiProperty({
    example: 'password',
    description: 'New password of the account',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  password: string

  @ApiProperty({
    example: 'password',
    description: 'New password confirmation',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @Match('password')
  password_confirmation: string

  @ApiProperty({
    example: 'token',
    description: 'Token received in the email',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  token: string
}

export class ResponseAuthMeDTO extends ResponseAccountDTO {
  @ApiProperty({
    example: 1,
    description: 'Id of the account',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  id: string

  @ApiProperty({
    example: 'user@test.com',
    description: 'Email of the account',
    type: String
  })
  @IsEmail()
  email: string

  @ApiPropertyOptional({
    example: Role.USER,
    description: 'Role of the account',
    type: String,
    enum: Role
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role

  @ApiPropertyOptional({
    example: 'refresh_token',
    description: 'Refresh token of the account',
    type: String
  })
  @IsOptional()
  @IsString()
  refresh_token?: string
}
