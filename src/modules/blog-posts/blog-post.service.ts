import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import {
  CreateBlogPostDTO,
  FilterBlogPostDTO,
  UpdateBlogPostDTO,
  ResponseBlogPostDTO,
  SortByBlogPostDTO,
  ResponseBlogPostListDTO
} from '@blog-posts/blog-post.dto'
import { parseBlogPost, parseBlogPostList } from '@blog-posts/blog-post.parser'
import { BlogPostRepository } from '@blog-posts/blog-post.repository'
import { createMetaData } from '@helpers/metadata.helper'

@Injectable()
export class BlogPostService {
  constructor(private blogPostRepository: BlogPostRepository) {}

  async create(data: CreateBlogPostDTO): Promise<ResponseBlogPostDTO> {
    try {
      const blogPost = await this.blogPostRepository.create({
        ...data,
        author: { connect: { id: data.author_id } }
      })

      return parseBlogPost(blogPost)
    } catch (error: Error | any) {
      if (error.code === 'P2002') {
        throw new ConflictException('BlogPost already exists')
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
    filters?: FilterBlogPostDTO
    sortBy?: SortByBlogPostDTO
  }): Promise<ResponseBlogPostListDTO> {
    try {
      const skip = (page - 1) * offset
      const where: Prisma.BlogPostWhereInput = this.buildFilters(filters)
      const orderBy: Prisma.BlogPostOrderByWithRelationInput[] = this.buildOrderBy(sortBy)

      const blogPosts = await this.blogPostRepository.findMany({
        skip,
        take: offset,
        where,
        orderBy
      })

      const parsedBlogPosts = parseBlogPostList(blogPosts)

      return {
        data: parsedBlogPosts,
        meta: createMetaData(blogPosts.count, page, offset)
      }
    } catch (error: Error | any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('BlogPost not found')
      }

      throw error
    }
  }

  async getById(id: bigint): Promise<ResponseBlogPostDTO> {
    try {
      const blogPost = await this.blogPostRepository.getById(id)

      return parseBlogPost(blogPost)
    } catch (error: Error | any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('BlogPost not found')
      }

      throw error
    }
  }

  async update(blog_post_id: bigint, data: UpdateBlogPostDTO): Promise<ResponseBlogPostDTO> {
    try {
      const blogPostUpdateData = this.buildUpdateData(data)

      const blogPost = await this.blogPostRepository.update(blog_post_id, blogPostUpdateData)

      return parseBlogPost(blogPost)
    } catch (error: Error | any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('BlogPost not found')
      }

      throw error
    }
  }

  async delete(blog_post_id: bigint): Promise<ResponseBlogPostDTO> {
    try {
      return await this.blogPostRepository.delete(blog_post_id)
    } catch (error: Error | any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('BlogPost not found')
      }

      if (error.code === 'P2020') {
        throw new InternalServerErrorException('BlogPost cannot be deleted')
      }

      throw error
    }
  }

  private buildUpdateData(data: UpdateBlogPostDTO): Prisma.BlogPostUpdateInput {
    const responsibleUpdateData = Object.fromEntries(
      Object.entries({
        ...data
      }).filter((value) => value !== undefined)
    )

    return {
      ...responsibleUpdateData
    }
  }

  private buildFilters(filters: FilterBlogPostDTO): Prisma.BlogPostWhereInput {
    const where: Prisma.BlogPostWhereInput = {}

    return where
  }

  private buildOrderBy(fields: SortByBlogPostDTO): Prisma.BlogPostOrderByWithRelationInput[] {
    const orderBy: Prisma.BlogPostOrderByWithRelationInput[] = []

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
