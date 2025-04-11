import { Test, TestingModule } from '@nestjs/testing'
import { CommentController } from '@comments/comment.controller'
import { CommentService } from '@comments/comment.service'
import { CreateCommentDTO, UpdateCommentDTO } from '@comments/comment.dto'
import { NotFoundException } from '@nestjs/common'

describe('CommentController', () => {
  let commentController: CommentController
  let commentService: CommentService

  const mockCommentService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService
        }
      ]
    }).compile()

    commentController = module.get<CommentController>(CommentController)
    commentService = module.get<CommentService>(CommentService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new comment', async () => {
      const commentData: CreateCommentDTO = {
        name: 'New Comment'
      }
      const createdComment = { id: 1, ...commentData }

      mockCommentService.create.mockResolvedValue(createdComment)

      const result = await commentController.create(commentData)
      expect(result).toEqual(createdComment)
      expect(mockCommentService.create).toHaveBeenCalledWith(commentData)
    })
  })

  describe('getAll', () => {
    it('should return a list of comments', async () => {
      const comments = [
        { id: 1, name: 'Comment 1' },
        { id: 2, name: 'Comment 2' }
      ]

      mockCommentService.getAll.mockResolvedValue(comments)

      const page = 1
      const offset = 10
      const filters = { name: 'Comment' }

      const result = await commentController.getAll(page, offset, filters)
      expect(result).toEqual(comments)
      expect(mockCommentService.getAll).toHaveBeenCalled()
    })
  })

  describe('getById', () => {
    it('should return a comment by ID', async () => {
      const comment = { id: 1, name: 'Comment 1' }

      mockCommentService.getById.mockResolvedValue(comment)

      const result = await commentController.getById(1)
      expect(result).toEqual(comment)
      expect(mockCommentService.getById).toHaveBeenCalledWith(1)
    })

    it('should throw NotFoundException if comment is not found', async () => {
      mockCommentService.getById.mockRejectedValue(new NotFoundException('Comment not found'))

      await expect(commentController.getById(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    it('should update a comment by ID', async () => {
      const commentData: UpdateCommentDTO = { name: 'Updated Comment' }
      const updatedComment = { id: 1, ...commentData }

      mockCommentService.update.mockResolvedValue(updatedComment)

      const result = await commentController.update(1, commentData)
      expect(result).toEqual(updatedComment)
      expect(mockCommentService.update).toHaveBeenCalledWith(1, commentData)
    })

    it('should throw NotFoundException if comment is not found during update', async () => {
      const commentData: UpdateCommentDTO = { name: 'Updated Comment' }

      mockCommentService.update.mockRejectedValue(new NotFoundException('Comment not found'))

      await expect(commentController.update(1, commentData)).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', () => {
    it('should delete a comment by ID', async () => {
      const deletedComment = { id: 1, name: 'Comment to delete' }

      mockCommentService.delete.mockResolvedValue(deletedComment)

      const result = await commentController.delete(1)
      expect(result).toEqual(deletedComment)
      expect(mockCommentService.delete).toHaveBeenCalledWith(1)
    })

    it('should throw NotFoundException if comment is not found during delete', async () => {
      mockCommentService.delete.mockRejectedValue(new NotFoundException('Comment not found'))

      await expect(commentController.delete(1)).rejects.toThrow(NotFoundException)
    })
  })
})
