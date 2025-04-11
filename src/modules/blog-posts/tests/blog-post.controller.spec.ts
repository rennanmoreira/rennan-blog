import { Test, TestingModule } from '@nestjs/testing'
import { BlogPostController } from '@blog-posts/blog-post.controller'
import { BlogPostService } from '@blog-posts/blog-post.service'
import { CreateBlogPostDTO, UpdateBlogPostDTO } from '@blog-posts/blog-post.dto'
import { NotFoundException } from '@nestjs/common'

describe('BlogPostController', () => {
  let blogPostController: BlogPostController
  let blogPostService: BlogPostService

  const mockBlogPostService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostController],
      providers: [
        {
          provide: BlogPostService,
          useValue: mockBlogPostService
        }
      ]
    }).compile()

    blogPostController = module.get<BlogPostController>(BlogPostController)
    blogPostService = module.get<BlogPostService>(BlogPostService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new blogPost', async () => {
      const blogPostData: CreateBlogPostDTO = {
        name: 'New BlogPost'
      }
      const createdBlogPost = { id: 1, ...blogPostData }

      mockBlogPostService.create.mockResolvedValue(createdBlogPost)

      const result = await blogPostController.create(blogPostData)
      expect(result).toEqual(createdBlogPost)
      expect(mockBlogPostService.create).toHaveBeenCalledWith(blogPostData)
    })
  })

  describe('getAll', () => {
    it('should return a list of blogPosts', async () => {
      const blogPosts = [
        { id: 1, name: 'BlogPost 1' },
        { id: 2, name: 'BlogPost 2' }
      ]

      mockBlogPostService.getAll.mockResolvedValue(blogPosts)

      const page = 1
      const offset = 10
      const filters = { name: 'BlogPost' }

      const result = await blogPostController.getAll(page, offset, filters)
      expect(result).toEqual(blogPosts)
      expect(mockBlogPostService.getAll).toHaveBeenCalled()
    })
  })

  describe('getById', () => {
    it('should return a blogPost by ID', async () => {
      const blogPost = { id: 1, name: 'BlogPost 1' }

      mockBlogPostService.getById.mockResolvedValue(blogPost)

      const result = await blogPostController.getById(1)
      expect(result).toEqual(blogPost)
      expect(mockBlogPostService.getById).toHaveBeenCalledWith(1)
    })

    it('should throw NotFoundException if blogPost is not found', async () => {
      mockBlogPostService.getById.mockRejectedValue(new NotFoundException('BlogPost not found'))

      await expect(blogPostController.getById(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    it('should update a blogPost by ID', async () => {
      const blogPostData: UpdateBlogPostDTO = { name: 'Updated BlogPost' }
      const updatedBlogPost = { id: 1, ...blogPostData }

      mockBlogPostService.update.mockResolvedValue(updatedBlogPost)

      const result = await blogPostController.update(1, blogPostData)
      expect(result).toEqual(updatedBlogPost)
      expect(mockBlogPostService.update).toHaveBeenCalledWith(1, blogPostData)
    })

    it('should throw NotFoundException if blogPost is not found during update', async () => {
      const blogPostData: UpdateBlogPostDTO = { name: 'Updated BlogPost' }

      mockBlogPostService.update.mockRejectedValue(new NotFoundException('BlogPost not found'))

      await expect(blogPostController.update(1, blogPostData)).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', () => {
    it('should delete a blogPost by ID', async () => {
      const deletedBlogPost = { id: 1, name: 'BlogPost to delete' }

      mockBlogPostService.delete.mockResolvedValue(deletedBlogPost)

      const result = await blogPostController.delete(1)
      expect(result).toEqual(deletedBlogPost)
      expect(mockBlogPostService.delete).toHaveBeenCalledWith(1)
    })

    it('should throw NotFoundException if blogPost is not found during delete', async () => {
      mockBlogPostService.delete.mockRejectedValue(new NotFoundException('BlogPost not found'))

      await expect(blogPostController.delete(1)).rejects.toThrow(NotFoundException)
    })
  })
})
