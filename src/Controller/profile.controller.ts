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
import { UserService } from '../Service/user.service';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { User } from '../decorator/header.decorator';
import { PostService } from '../Service/post.service';
import { CommentService } from '../Service/comment.service';


@Controller('api')
export class ProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
    private jwtService: JwtService,
    private readonly PostService: PostService
  ) {}

  @Post('/profile_image')
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
    @User() user,
  ) {
    const data = await this.jwtService.verifyAsync(user);
    await this.userService.update(data['id'], {
      img: file.filename,
    });
    const userfind = await this.PostService.updateByName({author: data['name']}, {
      profile_img: file.filename
    });
    const comfind = await this.commentService.updateByName({author: data['name']}, {
      author_img: file.filename
    });
    return { message: 'success' };
  }

  @Get('/:id/profile_image')
  seeUploadedFiles(@Param('id') id, @Res() res) {
    return res.sendFile(id, { root: './files' });
  }

  @Get('/:id/user')
  async UserById(@Param('id') id) {
    const user = await this.userService.findOne({ _id: id });
    return [user];
  }
}
