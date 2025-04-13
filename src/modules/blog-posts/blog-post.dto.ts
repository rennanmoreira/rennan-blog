import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ResponseMetaDTO } from '@utils/dtos/pagination.dto'
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'
import { ResponseAccountDTO } from '../accounts/account.dto'

export class CreateBlogPostDTO {
  @ApiProperty({
    example: 'Title example',
    type: String,
    description: 'Title of the BlogPost'
  })
  @IsString()
  title: string

  @ApiProperty({
    example: 'Content example',
    type: String,
    description: 'Content of the BlogPost'
  })
  @IsString()
  content: string

  @ApiProperty({
    example: 'Author id example',
    type: String,
    description: 'Author id of the BlogPost'
  })
  @IsString()
  author_id: string

  @ApiPropertyOptional({
    example: 'Excerpt example',
    type: String,
    description: 'Excerpt of the BlogPost'
  })
  @IsOptional()
  @IsString()
  excerpt?: string

  @ApiPropertyOptional({
    example: 'Cover image example',
    type: String,
    description: 'Cover image of the BlogPost'
  })
  @IsOptional()
  @IsString()
  cover_image?: string

  @ApiPropertyOptional({
    example: '2025-01-01T00:00:00.000Z',
    type: Date,
    description: 'Published at of the BlogPost'
  })
  @IsOptional()
  @IsDate()
  published_at?: Date

  @ApiPropertyOptional({
    example: 1,
    type: Number,
    description: 'Read time of the BlogPost'
  })
  @IsOptional()
  @IsNumber()
  read_time?: number
}

export class UpdateBlogPostDTO {
  @ApiPropertyOptional({
    example: 'Title example',
    type: String,
    description: 'Title of the BlogPost'
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    example: 'Content example',
    type: String,
    description: 'Content of the BlogPost'
  })
  @IsOptional()
  @IsString()
  content?: string

  @ApiPropertyOptional({
    example: 'Author id example',
    type: String,
    description: 'Author id of the BlogPost'
  })
  @IsOptional()
  @IsString()
  author_id?: string

  @ApiPropertyOptional({
    example: 'Excerpt example',
    type: String,
    description: 'Excerpt of the BlogPost'
  })
  @IsOptional()
  @IsString()
  excerpt?: string

  @ApiPropertyOptional({
    example: 'Cover image example',
    type: String,
    description: 'Cover image of the BlogPost'
  })
  @IsOptional()
  @IsString()
  cover_image?: string

  @ApiPropertyOptional({
    example: '2025-01-01T00:00:00.000Z',
    type: Date,
    description: 'Published at of the BlogPost'
  })
  @IsOptional()
  @IsDate()
  published_at?: Date

  @ApiPropertyOptional({
    example: 1,
    type: Number,
    description: 'Read time of the BlogPost'
  })
  @IsOptional()
  @IsNumber()
  read_time?: number
}

export class FilterBlogPostDTO {
  @ApiPropertyOptional({
    type: String,
    description: 'Title of the BlogPost'
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Content of the BlogPost'
  })
  @IsOptional()
  @IsString()
  content?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Author id of the BlogPost'
  })
  @IsOptional()
  @IsString()
  author_id?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Excerpt of the BlogPost'
  })
  @IsOptional()
  @IsString()
  excerpt?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Cover image of the BlogPost'
  })
  @IsOptional()
  @IsString()
  cover_image?: string

  @ApiPropertyOptional({
    type: Date,
    description: 'Published at of the BlogPost'
  })
  @IsOptional()
  @IsDate()
  published_at?: Date

  @ApiPropertyOptional({
    type: Number,
    description: 'Read time of the BlogPost'
  })
  @IsOptional()
  @IsNumber()
  read_time?: number
}

export class SortByBlogPostDTO {
  @ApiPropertyOptional({
    example: 'desc',
    description: 'Sort by BlogPost created_at',
    type: String
  })
  @IsOptional()
  @IsString()
  sort_by_created_at?: string

  @ApiPropertyOptional({
    example: 'desc',
    description: 'Sort by BlogPost updated_at',
    type: String,
    default: 'desc'
  })
  @IsOptional()
  @IsString()
  sort_by_updated_at?: string = 'desc'
}

export class ResponseBlogPostDTO extends CreateBlogPostDTO {
  @ApiProperty({
    example: 1,
    description: 'BlogPost id',
    type: Number
  })
  @IsNumber()
  id: number

  @ApiPropertyOptional({
    type: ResponseAccountDTO,
    description: 'Author of the Post'
  })
  @IsOptional()
  author?: ResponseAccountDTO

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

export class ResponseBlogPostListDTO {
  @ApiProperty({
    description: 'List of BlogPost',
    type: [ResponseBlogPostDTO]
  })
  data: ResponseBlogPostDTO[]

  @ApiProperty({
    title: 'Meta',
    description: 'Meta information',
    type: ResponseMetaDTO
  })
  meta: ResponseMetaDTO
}
