import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request, Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterSetting, UploadedFileSetting } from './utils/multer.setting';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', MulterSetting))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(UploadedFileSetting)
    image: Express.Multer.File,
    @Req() req: Request,
  ) {
    // اضافه کردن نام عکس به ورودی کاربر
    createPostDto['image'] = image.filename;

    return this.postsService.create(createPostDto, req);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postsService.findOne(slug);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    return this.postsService.update(id, updatePostDto, req);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  remove(@Param('slug') slug: string, @Req() req: Request) {
    return this.postsService.remove(slug, req);
  }
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('image', MulterSetting))
  // uploadFile(
  //   @Body() createPostDto: any,
  //   @UploadedFile(UploadedFileSetting)
  //   image: Express.Multer.File,
  // ) {

  //   return { createPostDto };
  // }
}
