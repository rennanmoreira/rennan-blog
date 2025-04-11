import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import {
  CreateCommentDTO,
  FilterCommentDTO,
  UpdateCommentDTO,
  ResponseCommentDTO,
  SortByCommentDTO,
  ResponseCommentListDTO
} from '@comments/comment.dto'
import { parseComment, parseCommentList } from '@comments/comment.parser'
import { CommentRepository } from '@comments/comment.repository'
import { createMetaData } from '@helpers/metadata.helper'

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async create(data: CreateCommentDTO): Promise<ResponseCommentDTO> {
    try {
      const comment = await this.commentRepository.create({
        ...data,
        post: { connect: { id: data.post_id } },
        account: { connect: { id: data.account_id } }
      })

      return parseComment(comment)
    } catch (error: Error | any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Comment already exists')
      }
      throw error
    }
  }

  async getAll({
    page = 1,
    offset = 10,
    filters = {},
    sortBy = {}
  }: {
    page?: number
    offset?: number
    filters?: FilterCommentDTO
    sortBy?: SortByCommentDTO
  }): Promise<ResponseCommentListDTO> {
    try {
      const skip = (page - 1) * offset
      const where: Prisma.CommentWhereInput = this.buildFilters(filters)
      const orderBy: Prisma.CommentOrderByWithRelationInput[] = this.buildOrderBy(sortBy)

      const comments = await this.commentRepository.findMany({
        skip,
        take: offset,
        where,
        orderBy
      })

      const parsedComments = parseCommentList(comments)

      return {
        data: parsedComments,
        meta: createMetaData(comments.count, page, offset)
      }
    } catch (error: Error | any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Comment not found')
      }

      throw error
    }
  }

  async getById(id: bigint): Promise<ResponseCommentDTO> {
    try {
      const comment = await this.commentRepository.getById(id)

      return parseComment(comment)
    } catch (error: Error | any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Comment not found')
      }

      throw error
    }
  }

  async update(comment_id: bigint, data: UpdateCommentDTO): Promise<ResponseCommentDTO> {
    try {
      const commentUpdateData = this.buildUpdateData(data)

      const comment = await this.commentRepository.update(comment_id, commentUpdateData)

      return parseComment(comment)
    } catch (error: Error | any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Comment not found')
      }

      throw error
    }
  }

  async delete(comment_id: bigint): Promise<ResponseCommentDTO> {
    try {
      return await this.commentRepository.delete(comment_id)
    } catch (error: Error | any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Comment not found')
      }

      if (error.code === 'P2020') {
        throw new InternalServerErrorException('Comment cannot be deleted')
      }

      throw error
    }
  }

  private buildUpdateData(data: UpdateCommentDTO): Prisma.CommentUpdateInput {
    const responsibleUpdateData = Object.fromEntries(
      Object.entries({
        ...data
      }).filter((value) => value !== undefined)
    )

    return {
      ...responsibleUpdateData
    }
  }

  private buildFilters(filters: FilterCommentDTO): Prisma.CommentWhereInput {
    const where: Prisma.CommentWhereInput = {}

    return where
  }

  private buildOrderBy(fields: SortByCommentDTO): Prisma.CommentOrderByWithRelationInput[] {
    const orderBy: Prisma.CommentOrderByWithRelationInput[] = []

    const created_at =
      fields.sort_by_created_at === 'asc'
        ? fields.sort_by_created_at
        : fields.sort_by_created_at === 'desc'
          ? fields.sort_by_created_at
          : undefined
    if (created_at) {
      orderBy.push({ created_at })
    }

    const updated_at =
      fields.sort_by_updated_at === 'asc'
        ? fields.sort_by_updated_at
        : fields.sort_by_updated_at === 'desc'
          ? fields.sort_by_updated_at
          : undefined
    if (updated_at) {
      orderBy.push({ updated_at })
    }

    return orderBy
  }
}
