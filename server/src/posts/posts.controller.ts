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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
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

  @Patch(':slug')
  @UseGuards(AuthGuard)
  update(
    @Param('slug') slug: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    return this.postsService.update(slug, updatePostDto, req);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  remove(@Param('slug') slug: string, @Req() req: Request) {
    return this.postsService.remove(slug, req);
  }
}
