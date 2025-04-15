import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger'
import {
  CreateBlogPostDTO,
  UpdateBlogPostDTO,
  ResponseBlogPostDTO,
  ResponseBlogPostListDTO,
  FilterBlogPostDTO,
  SortByBlogPostDTO
} from '@blog-posts/blog-post.dto'
import { BlogPostService } from '@blog-posts/blog-post.service'
import { Public } from 'src/decorators/public.decorator'
// import { Roles } from '@auth/decorators/roles.decorator';

@Controller('blog-posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post()
  @ApiBearerAuth('jwt-auth')
  @ApiResponse({
    status: 201,
    description: 'BlogPost created',
    type: ResponseBlogPostDTO
  })
  async create(@Body() data: CreateBlogPostDTO): Promise<ResponseBlogPostDTO> {
    return this.blogPostService.create(data)
  }

  @Get()
  @Public()
  @ApiResponse({
    status: 200,
    description: 'Get all blogPosts',
    type: ResponseBlogPostListDTO
  })
  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'offset', required: false, type: Number, default: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sort_by_created_at', required: false, type: String, default: 'desc' })
  @ApiQuery({ name: 'sort_by_updated_at', required: false, type: String, default: 'desc' })
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('offset', new ParseIntPipe({ optional: true })) offset = 10,
    @Query() filters: FilterBlogPostDTO,
    @Query() sortBy: SortByBlogPostDTO
  ): Promise<ResponseBlogPostListDTO> {
    return this.blogPostService.getAll({ page, offset, filters, sortBy })
  }

  @Get(':blog_post_id')
  @ApiBearerAuth('jwt-auth')
  @ApiResponse({
    status: 200,
    description: 'Get blogPost by id',
    type: ResponseBlogPostDTO
  })
  async getById(@Param('blog_post_id', ParseIntPipe) id: bigint): Promise<ResponseBlogPostDTO> {
    return this.blogPostService.getById(id)
  }

  @Put(':blog_post_id')
  @ApiBearerAuth('jwt-auth')
  @ApiResponse({
    status: 200,
    description: 'BlogPost updated',
    type: ResponseBlogPostDTO
  })
  async update(
    @Param('blog_post_id', ParseIntPipe) id: bigint,
    @Body() data: UpdateBlogPostDTO
  ): Promise<ResponseBlogPostDTO> {
    return this.blogPostService.update(id, data)
  }

  @Delete(':blog_post_id')
  @ApiBearerAuth('jwt-auth')
  @ApiResponse({
    status: 200,
    description: 'BlogPost soft deleted'
  })
  async delete(@Param('blog_post_id', ParseIntPipe) id: bigint): Promise<ResponseBlogPostDTO> {
    return this.blogPostService.delete(id)
  }
}
