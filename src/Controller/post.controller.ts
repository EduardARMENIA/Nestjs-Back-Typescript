import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Param,
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { PostService } from '.././Service/post.service';
import { JwtService } from '@nestjs/jwt';
import { Posts } from '.././Schema/post.schema';
import { Comment } from '.././Schema/comment.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '.././utils/file-upload.utils';

@Controller('api')
export class PostController {
  constructor(
    private readonly PostService: PostService,
    private jwtService: JwtService,
  ) {}

  @Get('post')
  async Posts() {
    try {
      const post = await this.PostService.find().populate([
        { path: 'comments', model: 'Comment' },
      ]);
      return post;
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
    @Headers() headers,
  ) {
    const data = await this.jwtService.verifyAsync(headers.authorization);
    await this.PostService.create({
      profile: undefined,
      author: data['name'],
      img: file.filename,
      title: body.title,
      content: body.content,
      comments: undefined,
      likes: undefined,
    });
    return { message: 'success' };
  }

  @Get('/:id/post_image')
  seeUploadedFile(@Param('id') id, @Res() res) {
    return res.sendFile(id, { root: './files' });
  }

  @Post('/:id/post_delate')
  async DelatePost(@Param('id') id, @Res() res, @Headers() headers) {
    const data = await this.jwtService.verifyAsync(headers.authorization);
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
  ) {
    const data = await this.jwtService.verifyAsync(headers.authorization);
    const post = await this.PostService.findOne({ _id: id });
    if (data['name'] === post.author) {
      await this.PostService.update(post._id, { content: body.content });
      return { message: 'success' };
    } else {
      return { message: 'something went wrong' };
    }
  }

  @Post('/:id/title_change')
  async ChangeTitle(
    @Param('id') id,
    @Res() res,
    @Body() body: any,
    @Headers() headers,
  ) {
    const data = await this.jwtService.verifyAsync(headers.authorization);
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
}
