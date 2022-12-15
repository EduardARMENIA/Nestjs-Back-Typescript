import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PostService } from '.././Service/post.service';
import { CommentService } from '.././Service/comment.service';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly PostService: PostService,
    private jwtService: JwtService,
  ) {}
  @Post('/:id/comment')
  async PostComment(@Param('id') id, @Body() content: any) {
    try {
      const post = await this.PostService.findOne({ _id: id });
      const create = await this.commentService.create({
        content: content.content,
        post: post._id,
      });
      await this.PostService.update(post._id, {
        $push: { comments: create._id },
      });
      return create;
    } catch (error) {
      return 'error';
    }
  }

  @Get('/:id/comment')
  async PostId(@Param('id') id) {
    const posts = await this.PostService.findOne({ _id: id }).populate([
      { path: 'comments', model: 'Comment' },
    ]);
    return posts;
  }
}
