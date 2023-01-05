import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UseGuards
} from '@nestjs/common';
import { PostService } from '../Service/post.service';
import { JwtService } from '@nestjs/jwt';
import { Posts } from '../Schema/post.schema';
import { Comment } from '../Schema/comment.schema';
import { Like } from '../Schema/like.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { User } from '../decorator/header.decorator';
import { AuthGuard } from '../guard/auth.guard';


@Controller('api')
export class PostController {
  constructor(
    private readonly PostService: PostService,
    private jwtService: JwtService,
  ) {}

  @Get('post')
  async Posts() {
    try {
      return await this.PostService.find().populate([
        { path: 'comments', model: 'Comment'},
      ]);
    } catch (error) {
      return 'error';
    }
  }

  @Post('post')
  async CreatePost(@Body() title: Posts) {
    await this.PostService.create(title);

    return { message: 'success' };
  }

  @Post('post_image')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    @Body() body: any,
    @UploadedFile() file,
    @User() user
  ) {
    const data = await this.jwtService.verifyAsync(user);
    await this.PostService.create({
      author_id: data['id'],
      author: data['name'],
      img: file.filename,
      title: body.title,
      content: body.content,
      comments: undefined,
      likes: undefined
    });
    return { message: 'success' };
  }

  @Get('/:id/post_image')
  seeUploadedFile(@Param('id') id, @Res() res) {
    return res.sendFile(id, { root: './files' });
  }

  @Post('/:id/post_delate')
  @UseGuards(AuthGuard)
  async DelatePost(@Param('id') id, @Res() res, @Headers() headers, @User() user) {
    const data = await this.jwtService.verifyAsync(user);
    const post = await this.PostService.findOne({ _id: id });
    if (data['name'] === post.author) {
      await this.PostService.delate({ _id: post._id });
      return { message: 'success' };
    } else {
      return { message: 'something went wrong' };
    }
  }

  @Post('/:id/description_change')
  async ChangeDescription(
    @Param('id') id,
    @Res() res,
    @Body() body: any,
    @Headers() headers,
    @User() user
  ) {
    const data = await this.jwtService.verifyAsync(user);
    const post = await this.PostService.findOne({ _id: id });
    if (data['name'] === post.author) {
      await this.PostService.update(post._id, { content: body.content });
      return { message: 'success' };
    } else {
      return { message: 'something went wrong' };
    }
  }

  @Post('/:id/title_change')
  @UseGuards(AuthGuard)
  async ChangeTitle(
    @Param('id') id,
    @Res() res,
    @Body() body: any,
    @Headers() headers,
    @User() user
  ) {
    const data = await this.jwtService.verifyAsync(user);
    const post = await this.PostService.findOne({ _id: id });
    if (data['name'] === post.author) {
      await this.PostService.update(post._id, { title: body.title });
      return { message: 'success' };
    } else {
      return { message: 'something went wrong' };
    }
  }
  @Get('/:name/porfile_post')
  async PorfilePosts(@Param('name') name) {
    const post = await this.PostService.finds({ author: name }).populate([
      { path: 'comments', model: 'Comment' },
    ]);
    return post;
  }


  @Get('/:data/search')
  async  searchPosts(@Param('data') data) {
    return await this.PostService.finds({$or:[{title:{'$regex':data}},{content:{'$regex':data}},{author:{'$regex':data}}]}).populate([
      { path: 'comments', model: 'Comment' },
    ]);
  }

}
