import { Module } from '@nestjs/common'
import { BlogPostController } from '@blog-posts/blog-post.controller'
import { BlogPostRepository } from '@blog-posts/blog-post.repository'
import { BlogPostService } from '@blog-posts/blog-post.service'

@Module({
  imports: [],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
  exports: [BlogPostService]
})
export class BlogPostModule {}
