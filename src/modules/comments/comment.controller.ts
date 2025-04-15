import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger'
import {
  CreateCommentDTO,
  UpdateCommentDTO,
  ResponseCommentDTO,
  ResponseCommentListDTO,
  FilterCommentDTO,
  SortByCommentDTO
} from '@comments/comment.dto'
import { CommentService } from '@comments/comment.service'
// import { Roles } from '@auth/decorators/roles.decorator';

@Controller('comments')
@ApiBearerAuth('jwt-auth')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Comment created',
    type: ResponseCommentDTO
  })
  async create(@Body() data: CreateCommentDTO): Promise<ResponseCommentDTO> {
    return this.commentService.create(data)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all comments',
    type: ResponseCommentListDTO
  })
  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'offset', required: false, type: Number, default: 10 })
  @ApiQuery({ name: 'post_id', required: false, type: Number })
  @ApiQuery({ name: 'sort_by_created_at', required: false, type: String, default: 'desc' })
  @ApiQuery({ name: 'sort_by_updated_at', required: false, type: String, default: 'desc' })
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('offset', new ParseIntPipe({ optional: true })) offset = 10,
    @Query() filters: FilterCommentDTO,
    @Query() sortBy: SortByCommentDTO
  ): Promise<ResponseCommentListDTO> {
    return this.commentService.getAll({ page, offset, filters, sortBy })
  }

  @Get(':comment_id')
  @ApiResponse({
    status: 200,
    description: 'Get comment by id',
    type: ResponseCommentDTO
  })
  async getById(@Param('comment_id', ParseIntPipe) id: bigint): Promise<ResponseCommentDTO> {
    return this.commentService.getById(id)
  }

  @Put(':comment_id')
  @ApiResponse({
    status: 200,
    description: 'Comment updated',
    type: ResponseCommentDTO
  })
  async update(
    @Param('comment_id', ParseIntPipe) id: bigint,
    @Body() data: UpdateCommentDTO
  ): Promise<ResponseCommentDTO> {
    return this.commentService.update(id, data)
  }

  @Delete(':comment_id')
  @ApiResponse({
    status: 200,
    description: 'Comment soft deleted'
  })
  async delete(@Param('comment_id', ParseIntPipe) id: bigint): Promise<ResponseCommentDTO> {
    return this.commentService.delete(id)
  }
}
