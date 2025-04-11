import { Module } from '@nestjs/common'
import { CommentController } from '@comments/comment.controller'
import { CommentRepository } from '@comments/comment.repository'
import { CommentService } from '@comments/comment.service'

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService]
})
export class CommentModule {}
