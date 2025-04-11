import { Test, TestingModule } from '@nestjs/testing'
import { BlogPostRepository } from '@blog-posts/blog-post.repository'
import { PrismaService } from '@prisma/prisma.service'
import { NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

describe('BlogPostRepository', () => {
  let blogPostRepository: BlogPostRepository
  let prisma: PrismaService

  const mockPrismaService = {
    blogPosts: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostRepository, { provide: PrismaService, useValue: mockPrismaService }]
    }).compile()

    blogPostRepository = module.get<BlogPostRepository>(BlogPostRepository)
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new blogPost', async () => {
      const blogPostData: Prisma.BlogPostCreateInput = {
        name: 'New BlogPost'
      }
      const createdBlogPost = { id: 1, ...blogPostData }

      ;(prisma.blogPosts.create as jest.Mock).mockResolvedValue(createdBlogPost)

      const result = await blogPostRepository.create(blogPostData)
      expect(result).toEqual(createdBlogPost)
      expect(prisma.blogPosts.create).toHaveBeenCalledWith({ data: blogPostData })
    })
  })

  describe('update', () => {
    it('should update a blogPost by ID', async () => {
      const blogPostData: Prisma.BlogPostUpdateInput = { name: 'Updated BlogPost' }
      const updatedBlogPost = { id: 1, ...blogPostData }

      ;(prisma.blogPosts.update as jest.Mock).mockResolvedValue(updatedBlogPost)

      const result = await blogPostRepository.update(1, blogPostData)
      expect(result).toEqual(updatedBlogPost)
      expect(prisma.blogPosts.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: blogPostData
      })
    })

    it('should throw NotFoundException if blogPost is not found', async () => {
      ;(prisma.blogPosts.update as jest.Mock).mockRejectedValue(new NotFoundException('BlogPost not found'))

      await expect(blogPostRepository.update(1, {})).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', () => {
    it('should delete a blogPost by ID', async () => {
      const deletedBlogPost = { id: 1, name: 'BlogPost to delete' }

      ;(prisma.blogPosts.delete as jest.Mock).mockResolvedValue(deletedBlogPost)

      const result = await blogPostRepository.delete(1)
      expect(result).toEqual(deletedBlogPost)
      expect(prisma.blogPosts.delete).toHaveBeenCalledWith({ where: { id: 1 } })
    })

    it('should throw NotFoundException if blogPost is not found', async () => {
      ;(prisma.blogPosts.delete as jest.Mock).mockRejectedValue(new NotFoundException('BlogPost not found'))

      await expect(blogPostRepository.delete(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('findMany', () => {
    it('should return a list of blogPosts', async () => {
      const blogPosts = [
        { id: 1, name: 'BlogPost 1' },
        { id: 2, name: 'BlogPost 2' }
      ]
      const filter: Prisma.BlogPostFindManyArgs = { where: {} }

      ;(prisma.blogPosts.findMany as jest.Mock).mockResolvedValue(blogPosts)

      const result = await blogPostRepository.findMany(filter)
      expect(result).toEqual(blogPosts)
      expect(prisma.blogPosts.findMany).toHaveBeenCalledWith(filter)
    })
  })

  describe('getById', () => {
    it('should return a blogPost by ID', async () => {
      const blogPost = { id: 1, name: 'BlogPost 1' }

      ;(prisma.blogPosts.findUnique as jest.Mock).mockResolvedValue(blogPost)

      const result = await blogPostRepository.getById(1)
      expect(result).toEqual(blogPost)
      expect(prisma.blogPosts.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })
    })

    it('should return null if blogPost is not found', async () => {
      ;(prisma.blogPosts.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await blogPostRepository.getById(1)
      expect(result).toBeNull()
    })
  })

  describe('findUnique', () => {
    it('should return a unique blogPost based on data', async () => {
      const blogPost = { id: 1, name: 'Unique BlogPost' }

      const filter: Prisma.BlogPostFindUniqueArgs = {
        where: {
          id: 1
        }
      }

      ;(prisma.blogPosts.findUnique as jest.Mock).mockResolvedValue(blogPost)

      const result = await blogPostRepository.findUnique(filter)
      expect(result).toEqual(blogPost)
      expect(prisma.blogPosts.findUnique).toHaveBeenCalledWith(filter)
    })
  })
})
