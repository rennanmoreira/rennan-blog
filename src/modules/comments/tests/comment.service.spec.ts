import { Test, TestingModule } from '@nestjs/testing'
import { CommentService } from '@comments/comment.service'
import { ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common'
// import { ICommentRepository } from '@comments/interfaces/repositories/comment.interface';
import { CreateCommentDTO, UpdateCommentDTO, FilterCommentDTO } from '@comments/dtos/comment.dto'
import { Prisma, Comment } from '@prisma/client'

describe('CommentService', () => {
  let commentService: CommentService
  let commentRepository: jest.Mocked<ICommentRepository>

  const mockCommentRepository = {
    create: jest.fn(),
    findMany: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService, { provide: ICommentRepository, useValue: mockCommentRepository }]
    }).compile()

    commentService = module.get<CommentService>(CommentService)
    commentRepository = module.get<ICommentRepository>(ICommentRepository) as jest.Mocked<ICommentRepository>
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new comment', async () => {
      const commentData: CreateCommentDTO = {
        name: 'New Comment'
      }

      const createdComment: any = {
        id: 1,
        ...commentData
      }

      commentRepository.create.mockResolvedValue(createdComment)

      const result = await commentService.create(commentData)
      expect(result).toEqual(createdComment)
      expect(commentRepository.create).toHaveBeenCalledWith({
        name: commentData.name
      })
    })

    it('should throw a ConflictException if comment already exists', async () => {
      const commentData: CreateCommentDTO = {
        name: 'Existing Comment'
      }
      commentRepository.create.mockRejectedValue({ code: 'P2002' })

      await expect(commentService.create(commentData)).rejects.toThrow(ConflictException)
    })
  })

  describe('getAll', () => {
    it('should return a list of comments', async () => {
      const comments = [
        { id: 1, name: 'Comment 1' },
        { id: 2, name: 'Comment 2' }
      ]

      const filter: Prisma.CommentFindManyArgs = {
        skip: 0,
        take: 10,
        where: {},
        orderBy: { created_at: 'desc' }
      }

      commentRepository.findMany.mockResolvedValue(comments as Comment[])

      const result = await commentService.getAll({
        page: 1,
        offset: 10,
        filters: {}
      })
      expect(result).toEqual(comments)
      expect(commentRepository.findMany).toHaveBeenCalledWith(filter)
    })

    it('should apply filters correctly', async () => {
      const comments = [{ id: 1, name: 'Filtered Comment' }]
      const filters: FilterCommentDTO = { name: 'Filtered' }
      const filterConfig = {
        skip: 0,
        take: 10,
        where: {
          name: { contains: 'Filtered' }
        },
        orderBy: { created_at: 'desc' }
      }

      commentRepository.findMany.mockResolvedValue(comments as Comment[])

      const result = await commentService.getAll({
        page: 1,
        offset: 10,
        filters
      })

      expect(result).toEqual(comments)
      expect(commentRepository.findMany).toHaveBeenCalledWith(filterConfig)
    })
  })

  describe('getById', () => {
    it('should return a comment by ID', async () => {
      const comment = { id: 1, name: 'Comment 1' }

      commentRepository.getById.mockResolvedValue(comment as Comment)

      const result = await commentService.getById(1)
      expect(result).toEqual(comment)
      expect(commentRepository.getById).toHaveBeenCalledWith(1)
    })

    it('should throw a NotFoundException if comment is not found', async () => {
      commentRepository.getById.mockResolvedValue(null)

      await expect(commentService.getById(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    it('should update a comment', async () => {
      const updateCommentDto: UpdateCommentDTO = {
        name: 'Updated Comment'
      }
      const updatedComment = { id: 1, ...updateCommentDto }

      commentRepository.update.mockResolvedValue(updatedComment as Comment)

      const result = await commentService.update(1, updateCommentDto)
      expect(result).toEqual(updatedComment)
      expect(commentRepository.update).toHaveBeenCalledWith(1, updateCommentDto)
    })

    it('should throw a NotFoundException if comment not found', async () => {
      commentRepository.update.mockRejectedValue({ code: 'P2025' })

      await expect(commentService.update(1, {} as UpdateCommentDTO)).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', () => {
    it('should delete a comment', async () => {
      const comment = { id: 1, name: 'Comment to delete' }

      commentRepository.delete.mockResolvedValue(comment)

      const result = await commentService.delete(1)
      expect(result).toEqual(comment)
      expect(commentRepository.delete).toHaveBeenCalledWith(1)
    })

    it('should throw a NotFoundException if comment is not found', async () => {
      commentRepository.delete.mockRejectedValue({ code: 'P2025' })

      await expect(commentService.delete(1)).rejects.toThrow(NotFoundException)
    })

    it('should throw InternalServerErrorException if comment cannot be deleted', async () => {
      commentRepository.delete.mockRejectedValue({ code: 'P2020' })

      await expect(commentService.delete(1)).rejects.toThrow(InternalServerErrorException)
    })
  })
})
