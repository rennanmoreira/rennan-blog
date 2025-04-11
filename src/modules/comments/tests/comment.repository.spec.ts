import { Test, TestingModule } from '@nestjs/testing'
import { CommentRepository } from '@comments/comment.repository'
import { PrismaService } from '@prisma/prisma.service'
import { NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

describe('CommentRepository', () => {
  let commentRepository: CommentRepository
  let prisma: PrismaService

  const mockPrismaService = {
    comments: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentRepository, { provide: PrismaService, useValue: mockPrismaService }]
    }).compile()

    commentRepository = module.get<CommentRepository>(CommentRepository)
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new comment', async () => {
      const commentData: Prisma.CommentCreateInput = {
        name: 'New Comment'
      }
      const createdComment = { id: 1, ...commentData }

      ;(prisma.comments.create as jest.Mock).mockResolvedValue(createdComment)

      const result = await commentRepository.create(commentData)
      expect(result).toEqual(createdComment)
      expect(prisma.comments.create).toHaveBeenCalledWith({ data: commentData })
    })
  })

  describe('update', () => {
    it('should update a comment by ID', async () => {
      const commentData: Prisma.CommentUpdateInput = { name: 'Updated Comment' }
      const updatedComment = { id: 1, ...commentData }

      ;(prisma.comments.update as jest.Mock).mockResolvedValue(updatedComment)

      const result = await commentRepository.update(1, commentData)
      expect(result).toEqual(updatedComment)
      expect(prisma.comments.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: commentData
      })
    })

    it('should throw NotFoundException if comment is not found', async () => {
      ;(prisma.comments.update as jest.Mock).mockRejectedValue(new NotFoundException('Comment not found'))

      await expect(commentRepository.update(1, {})).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', () => {
    it('should delete a comment by ID', async () => {
      const deletedComment = { id: 1, name: 'Comment to delete' }

      ;(prisma.comments.delete as jest.Mock).mockResolvedValue(deletedComment)

      const result = await commentRepository.delete(1)
      expect(result).toEqual(deletedComment)
      expect(prisma.comments.delete).toHaveBeenCalledWith({ where: { id: 1 } })
    })

    it('should throw NotFoundException if comment is not found', async () => {
      ;(prisma.comments.delete as jest.Mock).mockRejectedValue(new NotFoundException('Comment not found'))

      await expect(commentRepository.delete(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('findMany', () => {
    it('should return a list of comments', async () => {
      const comments = [
        { id: 1, name: 'Comment 1' },
        { id: 2, name: 'Comment 2' }
      ]
      const filter: Prisma.CommentFindManyArgs = { where: {} }

      ;(prisma.comments.findMany as jest.Mock).mockResolvedValue(comments)

      const result = await commentRepository.findMany(filter)
      expect(result).toEqual(comments)
      expect(prisma.comments.findMany).toHaveBeenCalledWith(filter)
    })
  })

  describe('getById', () => {
    it('should return a comment by ID', async () => {
      const comment = { id: 1, name: 'Comment 1' }

      ;(prisma.comments.findUnique as jest.Mock).mockResolvedValue(comment)

      const result = await commentRepository.getById(1)
      expect(result).toEqual(comment)
      expect(prisma.comments.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })
    })

    it('should return null if comment is not found', async () => {
      ;(prisma.comments.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await commentRepository.getById(1)
      expect(result).toBeNull()
    })
  })

  describe('findUnique', () => {
    it('should return a unique comment based on data', async () => {
      const comment = { id: 1, name: 'Unique Comment' }

      const filter: Prisma.CommentFindUniqueArgs = {
        where: {
          id: 1
        }
      }

      ;(prisma.comments.findUnique as jest.Mock).mockResolvedValue(comment)

      const result = await commentRepository.findUnique(filter)
      expect(result).toEqual(comment)
      expect(prisma.comments.findUnique).toHaveBeenCalledWith(filter)
    })
  })
})
