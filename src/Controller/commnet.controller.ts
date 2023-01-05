import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from '../Service/post.service';
import { CommentService } from '../Service/comment.service';
import { LikeService } from '../Service/like.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../decorator/header.decorator';
import { UserService } from '../Service/user.service';

@Controller('api')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postservice: PostService,
    private readonly userservice: UserService,
    private readonly likeservice: LikeService,
    private jwtService: JwtService,
  ) {}
  @Post('/:id/comment')
  async PostComment(@Param('id') id, @Body() content: any, @User() user) {
    try {
      const data = await this.jwtService.verifyAsync(user);
      const post = await this.postservice.findOne({ _id: id });
      console.log(post)
      const create = await this.commentService.create({
        author_id: data['id'],
        author: data['name'],
        content: content.content,
        post: post._id,
      });
      await this.postservice.update(post._id, {
        $push: { comments: create._id },
      });
      return create;
    } catch (error) {
      return 'error';
    }
  }


  @Post('/:id/like')
  async PostLike(@Param('id') id, @Body() content: any, @User() user) {
    try {      
      const data = await this.jwtService.verifyAsync(user);
      const post = await this.postservice.findOne({ _id: id });
      const lf = await this.postservice.findOne({_id: post._id, likes: data['id']});
      console.log(post._id)
      if (lf === null){
         console.log(data['name'])
         const create = await this.likeservice.create({
          username: data['name'],
          like: data['id'],
          post: post._id
         });
         await this.postservice.update(post._id, {$push: { likes: data['id'] }});
      }else {
         await this.postservice.update(post._id, {$pull: { likes: data['id'] }});
      }   
      const post1 = await this.postservice.findOne({ _id: id });
      return post1.likes.length
  
    } catch (error) {
      return 'error';
    }
  }



  @Get('/:id/comment')
  async PostId(@Param('id') id) {
    return await this.postservice
      .findOne({ _id: id })
      .populate([{ path: 'comments', model: 'Comment' }]);
  }

 @Get('/:id/like')
  async LikeCount(@Param('id') id) {
     const post1 = await this.postservice.findOne({ _id: id });
     return post1.likes.length
  }
}
