import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ResponseMetaDTO } from '@utils/dtos/pagination.dto'
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
  IsNumber
} from 'class-validator'
import { Match } from 'src/decorators/match.decorator'

export class CreateAccountDTO {
  @ApiProperty({
    example: 'Email example',
    type: String,
    description: 'Email of the Account'
  })
  @IsString()
  email: string

  @ApiProperty({
    example: '123456',
    description: 'Password of the account',
    type: String
  })
  @IsNotEmpty()
  @IsStrongPassword(
    { minLength: 6, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 },
    { message: 'Senha precisa ter no mínimo 6 caracteres' }
  )
  password: string

  @ApiPropertyOptional({
    example: 'password',
    description: 'Password confirmation',
    type: String
  })
  @IsOptional()
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  password_confirmation?: string

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
    description: 'Is email verified of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_email_verified?: boolean

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
    description: 'Is active of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
    description: 'Is admin of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_admin?: boolean

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
    description: 'Is moderator of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_moderator?: boolean

  @ApiProperty({
    example: 'Name example',
    type: String,
    description: 'Name of the Account'
  })
  @IsString()
  name: string

  @ApiPropertyOptional({
    example: 'First name example',
    type: String,
    description: 'First name of the Account'
  })
  @IsOptional()
  @IsString()
  first_name?: string

  @ApiPropertyOptional({
    example: 'Last name example',
    type: String,
    description: 'Last name of the Account'
  })
  @IsOptional()
  @IsString()
  last_name?: string

  @ApiPropertyOptional({
    example: 'Lead origin example',
    type: String,
    description: 'Lead origin of the Account'
  })
  @IsOptional()
  @IsString()
  lead_origin?: string

  @ApiPropertyOptional({
    example: 'Photo url example',
    type: String,
    description: 'Photo url of the Account'
  })
  @IsOptional()
  @IsString()
  photo_url?: string

  @ApiPropertyOptional({
    example: '2025-01-01T00:00:00.000Z',
    type: Date,
    description: 'Birth date of the Account'
  })
  @IsOptional()
  @IsDate()
  birth_date?: Date
}

export class UpdateAccountDTO {
  @ApiPropertyOptional({
    example: 'Email example',
    type: String,
    description: 'Email of the Account'
  })
  @IsOptional()
  @IsString()
  email?: string

  @ApiPropertyOptional({
    example: '123456',
    description: 'Password of the account',
    type: String
  })
  @IsOptional()
  @IsStrongPassword(
    { minLength: 6, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 },
    { message: 'Senha precisa ter no mínimo 6 caracteres' }
  )
  password?: string

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
    description: 'Is email verified of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_email_verified?: boolean

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
    description: 'Is active of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
    description: 'Is admin of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_admin?: boolean

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
    description: 'Is moderator of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_moderator?: boolean

  @ApiPropertyOptional({
    example: 'Name example',
    type: String,
    description: 'Name of the Account'
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({
    example: 'First name example',
    type: String,
    description: 'First name of the Account'
  })
  @IsOptional()
  @IsString()
  first_name?: string

  @ApiPropertyOptional({
    example: 'Last name example',
    type: String,
    description: 'Last name of the Account'
  })
  @IsOptional()
  @IsString()
  last_name?: string

  @ApiPropertyOptional({
    example: 'Lead origin example',
    type: String,
    description: 'Lead origin of the Account'
  })
  @IsOptional()
  @IsString()
  lead_origin?: string

  @ApiPropertyOptional({
    example: 'Photo url example',
    type: String,
    description: 'Photo url of the Account'
  })
  @IsOptional()
  @IsString()
  photo_url?: string

  @ApiPropertyOptional({
    example: '2025-01-01T00:00:00.000Z',
    type: Date,
    description: 'Birth date of the Account'
  })
  @IsOptional()
  @IsDate()
  birth_date?: Date

  @ApiPropertyOptional({
    example: 'Refresh token example',
    type: String,
    description: 'Refresh token of the Account'
  })
  @IsOptional()
  @IsString()
  refresh_token?: string

  @ApiPropertyOptional({
    example: 1,
    type: Number,
    description: 'Token version of the Account'
  })
  @IsOptional()
  @IsNumber()
  token_version?: number
}

export class FilterAccountDTO {
  @ApiPropertyOptional({
    type: String,
    description: 'Email of the Account'
  })
  @IsOptional()
  @IsString()
  email?: string

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is email verified of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_email_verified?: boolean

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is active of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is admin of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_admin?: boolean

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is moderator of the Account'
  })
  @IsOptional()
  @IsBoolean()
  is_moderator?: boolean

  @ApiPropertyOptional({
    type: String,
    description: 'Name of the Account'
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({
    type: String,
    description: 'First name of the Account'
  })
  @IsOptional()
  @IsString()
  first_name?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Last name of the Account'
  })
  @IsOptional()
  @IsString()
  last_name?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Lead origin of the Account'
  })
  @IsOptional()
  @IsString()
  lead_origin?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Photo url of the Account'
  })
  @IsOptional()
  @IsString()
  photo_url?: string

  @ApiPropertyOptional({
    type: Date,
    description: 'Birth date of the Account'
  })
  @IsOptional()
  @IsDate()
  birth_date?: Date
}

export class SortByAccountDTO {
  @ApiPropertyOptional({
    example: 'asc',
    description: 'Sort by Account name',
    type: String
  })
  @IsOptional()
  @IsString()
  sort_by_name?: string

  @ApiPropertyOptional({
    example: 'desc',
    description: 'Sort by Account created_at',
    type: String
  })
  @IsOptional()
  @IsString()
  sort_by_created_at?: string

  @ApiPropertyOptional({
    example: 'desc',
    description: 'Sort by Account updated_at',
    type: String,
    default: 'desc'
  })
  @IsOptional()
  @IsString()
  sort_by_updated_at?: string = 'desc'
}

export class ResponseAccountDTO extends CreateAccountDTO {
  @ApiProperty({
    example: 1,
    description: 'Account id',
    type: String
  })
  @IsString()
  id: string

  @ApiPropertyOptional({
    example: 'token',
    description: 'current auth token of the account',
    type: String
  })
  @IsOptional()
  @IsString()
  token?: string

  @ApiPropertyOptional({
    example: 'refresh_token',
    description: 'refresh token of the account',
    type: String
  })
  @IsOptional()
  @IsString()
  refresh_token?: string

  @ApiPropertyOptional({
    example: 1,
    description: 'token version of the account',
    type: Number
  })
  @IsOptional()
  @IsNumber()
  token_version?: number

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Date of creation',
    type: Date
  })
  @IsOptional()
  @IsDate()
  created_at?: Date

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Date of last update',
    type: Date
  })
  @IsOptional()
  @IsDate()
  updated_at?: Date

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Date of deletion',
    type: Date
  })
  @IsOptional()
  @IsDate()
  deleted_at?: Date
}

export class ResponseAccountListDTO {
  @ApiProperty({
    description: 'List of Account',
    type: [ResponseAccountDTO]
  })
  data: ResponseAccountDTO[]

  @ApiProperty({
    title: 'Meta',
    description: 'Meta information',
    type: ResponseMetaDTO
  })
  meta: ResponseMetaDTO
}
