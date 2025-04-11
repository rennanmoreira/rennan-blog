import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { CommentWithRelations } from '@comments/comment.type'
import { FindManyWithCount } from '@types'

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CommentCreateInput): Promise<CommentWithRelations> {
    return await this.prisma.comment.create({ data })
  }

  async update(id: bigint, data: Prisma.CommentUpdateInput): Promise<CommentWithRelations> {
    return await this.prisma.comment.update({ where: { id }, data })
  }

  async delete(id: bigint): Promise<CommentWithRelations> {
    return await this.prisma.comment.delete({ where: { id } })
  }

  async findMany(filter: Prisma.CommentFindManyArgs): Promise<{ data: CommentWithRelations[]; count: number }> {
    return (await this.prisma.comment.findMany(filter)) as unknown as FindManyWithCount<CommentWithRelations>
  }

  async findUnique(filter: Prisma.CommentFindUniqueArgs): Promise<CommentWithRelations> {
    return await this.prisma.comment.findUnique(filter)
  }

  async getById(id: bigint): Promise<CommentWithRelations> {
    return await this.prisma.comment.findUnique({ where: { id } })
  }
}
