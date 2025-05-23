import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ResponseMetaDTO } from '@utils/dtos/pagination.dto'
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'
import { ResponseAccountDTO } from '../accounts/account.dto'
import { ResponseBlogPostDTO } from '../blog-posts/blog-post.dto'

export class CreateCommentDTO {
  @ApiProperty({
    example: 'Post id example',
    type: Number,
    description: 'Post id of the Comment'
  })
  @IsNumber()
  post_id: number

  @ApiProperty({
    example: 'Content example',
    type: String,
    description: 'Content of the Comment'
  })
  @IsString()
  content: string

  @ApiProperty({
    example: 'Account id example',
    type: String,
    description: 'Account id of the Comment'
  })
  @IsString()
  account_id: string
}

export class UpdateCommentDTO {
  @ApiPropertyOptional({
    example: 'Post id example',
    type: BigInt,
    description: 'Post id of the Comment'
  })
  @IsOptional()
  @IsNumber()
  post_id?: bigint

  @ApiPropertyOptional({
    example: 'Content example',
    type: String,
    description: 'Content of the Comment'
  })
  @IsOptional()
  @IsString()
  content?: string

  @ApiPropertyOptional({
    example: 'Account id example',
    type: String,
    description: 'Account id of the Comment'
  })
  @IsOptional()
  @IsString()
  account_id?: string
}

export class FilterCommentDTO {
  @ApiPropertyOptional({
    type: Number,
    description: 'Post id of the Comment'
  })
  @IsOptional()
  @IsNumber()
  post_id?: number

  @ApiPropertyOptional({
    type: String,
    description: 'Content of the Comment'
  })
  @IsOptional()
  @IsString()
  content?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Account id of the Comment'
  })
  @IsOptional()
  @IsString()
  account_id?: string
}

export class SortByCommentDTO {
  @ApiPropertyOptional({
    example: 'desc',
    description: 'Sort by Comment created_at',
    type: String
  })
  @IsOptional()
  @IsString()
  sort_by_created_at?: string

  @ApiPropertyOptional({
    example: 'desc',
    description: 'Sort by Comment updated_at',
    type: String,
    default: 'desc'
  })
  @IsOptional()
  @IsString()
  sort_by_updated_at?: string = 'desc'
}

export class ResponseCommentDTO extends CreateCommentDTO {
  @ApiProperty({
    example: 1,
    description: 'Comment id',
    type: Number
  })
  @IsNumber()
  id: number

  @ApiPropertyOptional({
    type: ResponseAccountDTO,
    description: 'Author of the Comment'
  })
  @IsOptional()
  account?: ResponseAccountDTO

  @ApiPropertyOptional({
    type: ResponseBlogPostDTO,
    description: 'Post of the Comment'
  })
  @IsOptional()
  post?: ResponseBlogPostDTO

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

export class ResponseCommentListDTO {
  @ApiProperty({
    description: 'List of Comment',
    type: [ResponseCommentDTO]
  })
  data: ResponseCommentDTO[]

  @ApiProperty({
    title: 'Meta',
    description: 'Meta information',
    type: ResponseMetaDTO
  })
  meta: ResponseMetaDTO
}
