import { Test, TestingModule } from '@nestjs/testing'
import { BlogPostService } from '@blog-posts/blog-post.service'
import { ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common'
// import { IBlogPostRepository } from '@blogPosts/interfaces/repositories/blog-post.interface';
import { CreateBlogPostDTO, UpdateBlogPostDTO, FilterBlogPostDTO } from '@blogPosts/dtos/blog-post.dto'
import { Prisma, BlogPost } from '@prisma/client'

describe('BlogPostService', () => {
  let blogPostService: BlogPostService
  let blogPostRepository: jest.Mocked<IBlogPostRepository>

  const mockBlogPostRepository = {
    create: jest.fn(),
    findMany: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostService, { provide: IBlogPostRepository, useValue: mockBlogPostRepository }]
    }).compile()

    blogPostService = module.get<BlogPostService>(BlogPostService)
    blogPostRepository = module.get<IBlogPostRepository>(IBlogPostRepository) as jest.Mocked<IBlogPostRepository>
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new blogPost', async () => {
      const blogPostData: CreateBlogPostDTO = {
        name: 'New BlogPost'
      }

      const createdBlogPost: any = {
        id: 1,
        ...blogPostData
      }

      blogPostRepository.create.mockResolvedValue(createdBlogPost)

      const result = await blogPostService.create(blogPostData)
      expect(result).toEqual(createdBlogPost)
      expect(blogPostRepository.create).toHaveBeenCalledWith({
        name: blogPostData.name
      })
    })

    it('should throw a ConflictException if blogPost already exists', async () => {
      const blogPostData: CreateBlogPostDTO = {
        name: 'Existing BlogPost'
      }
      blogPostRepository.create.mockRejectedValue({ code: 'P2002' })

      await expect(blogPostService.create(blogPostData)).rejects.toThrow(ConflictException)
    })
  })

  describe('getAll', () => {
    it('should return a list of blogPosts', async () => {
      const blogPosts = [
        { id: 1, name: 'BlogPost 1' },
        { id: 2, name: 'BlogPost 2' }
      ]

      const filter: Prisma.BlogPostFindManyArgs = {
        skip: 0,
        take: 10,
        where: {},
        orderBy: { created_at: 'desc' }
      }

      blogPostRepository.findMany.mockResolvedValue(blogPosts as BlogPost[])

      const result = await blogPostService.getAll({
        page: 1,
        offset: 10,
        filters: {}
      })
      expect(result).toEqual(blogPosts)
      expect(blogPostRepository.findMany).toHaveBeenCalledWith(filter)
    })

    it('should apply filters correctly', async () => {
      const blogPosts = [{ id: 1, name: 'Filtered BlogPost' }]
      const filters: FilterBlogPostDTO = { name: 'Filtered' }
      const filterConfig = {
        skip: 0,
        take: 10,
        where: {
          name: { contains: 'Filtered' }
        },
        orderBy: { created_at: 'desc' }
      }

      blogPostRepository.findMany.mockResolvedValue(blogPosts as BlogPost[])

      const result = await blogPostService.getAll({
        page: 1,
        offset: 10,
        filters
      })

      expect(result).toEqual(blogPosts)
      expect(blogPostRepository.findMany).toHaveBeenCalledWith(filterConfig)
    })
  })

  describe('getById', () => {
    it('should return a blogPost by ID', async () => {
      const blogPost = { id: 1, name: 'BlogPost 1' }

      blogPostRepository.getById.mockResolvedValue(blogPost as BlogPost)

      const result = await blogPostService.getById(1)
      expect(result).toEqual(blogPost)
      expect(blogPostRepository.getById).toHaveBeenCalledWith(1)
    })

    it('should throw a NotFoundException if blogPost is not found', async () => {
      blogPostRepository.getById.mockResolvedValue(null)

      await expect(blogPostService.getById(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    it('should update a blogPost', async () => {
      const updateBlogPostDto: UpdateBlogPostDTO = {
        name: 'Updated BlogPost'
      }
      const updatedBlogPost = { id: 1, ...updateBlogPostDto }

      blogPostRepository.update.mockResolvedValue(updatedBlogPost as BlogPost)

      const result = await blogPostService.update(1, updateBlogPostDto)
      expect(result).toEqual(updatedBlogPost)
      expect(blogPostRepository.update).toHaveBeenCalledWith(1, updateBlogPostDto)
    })

    it('should throw a NotFoundException if blogPost not found', async () => {
      blogPostRepository.update.mockRejectedValue({ code: 'P2025' })

      await expect(blogPostService.update(1, {} as UpdateBlogPostDTO)).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', () => {
    it('should delete a blogPost', async () => {
      const blogPost = { id: 1, name: 'BlogPost to delete' }

      blogPostRepository.delete.mockResolvedValue(blogPost)

      const result = await blogPostService.delete(1)
      expect(result).toEqual(blogPost)
      expect(blogPostRepository.delete).toHaveBeenCalledWith(1)
    })

    it('should throw a NotFoundException if blogPost is not found', async () => {
      blogPostRepository.delete.mockRejectedValue({ code: 'P2025' })

      await expect(blogPostService.delete(1)).rejects.toThrow(NotFoundException)
    })

    it('should throw InternalServerErrorException if blogPost cannot be deleted', async () => {
      blogPostRepository.delete.mockRejectedValue({ code: 'P2020' })

      await expect(blogPostService.delete(1)).rejects.toThrow(InternalServerErrorException)
    })
  })
})
