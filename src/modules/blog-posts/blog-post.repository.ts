import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { BlogPostWithRelations } from '@blog-posts/blog-post.type'
import { FindManyWithCount } from '@types'

@Injectable()
export class BlogPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BlogPostCreateInput): Promise<BlogPostWithRelations> {
    return await this.prisma.blogPost.create({ data })
  }

  async update(id: bigint, data: Prisma.BlogPostUpdateInput): Promise<BlogPostWithRelations> {
    return await this.prisma.blogPost.update({ where: { id }, data })
  }

  async delete(id: bigint): Promise<BlogPostWithRelations> {
    return await this.prisma.blogPost.delete({ where: { id } })
  }

  async findMany(filter: Prisma.BlogPostFindManyArgs): Promise<{ data: BlogPostWithRelations[]; count: number }> {
    return (await this.prisma.blogPost.findMany({
      ...filter,
      include: { author: true }
    })) as unknown as FindManyWithCount<BlogPostWithRelations>
  }

  async findUnique(filter: Prisma.BlogPostFindUniqueArgs): Promise<BlogPostWithRelations> {
    return await this.prisma.blogPost.findUnique({ ...filter, include: { author: true } })
  }

  async getById(id: bigint): Promise<BlogPostWithRelations> {
    return await this.prisma.blogPost.findUnique({ where: { id }, include: { author: true } })
  }
}
