import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // اکشن های مختلف برای دسته ها در بخش مدیریت
  @Post('edit')
  @UseGuards(AuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: Request) {
    return this.categoryService.create(createCategoryDto, req);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('edit/:slug')
  findOne(@Param('slug') slug: string) {
    return this.categoryService.findOne(slug);
  }

  @Patch('edit/:slug')
  @UseGuards(AuthGuard)
  update(
    @Param('slug') slug: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: Request,
  ) {
    return this.categoryService.update(slug, updateCategoryDto, req);
  }

  @Delete('edit/:slug')
  @UseGuards(AuthGuard)
  remove(@Param('slug') slug: string, @Req() req: Request) {
    return this.categoryService.remove(slug, req);
  }

  // اکشن های مختلف برای دسته ها در بخش کاربران
  @Get(':slug')
  findOneCtergoryPost(@Param('slug') slug: string) {
    return this.categoryService.findOneCtergoryPost(slug);
  }
}
