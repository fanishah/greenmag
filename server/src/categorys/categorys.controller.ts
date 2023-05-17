import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';

@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}
  
  // اکشن های مختلف برای دسته ها در بخش مدیریت
  @Post('edit')
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: Request) {
    return this.categorysService.create(createCategoryDto, req);
  }

  @Get()
  findAll() {
    return this.categorysService.findAll();
  }

  @Get('edit/:slug')
  findOne(@Param('slug') slug: string) {
    return this.categorysService.findOne(slug);
  }

  @Patch('edit/:slug')
  update(
    @Param('slug') slug: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: Request,
  ) {
    return this.categorysService.update(slug, updateCategoryDto, req);
  }

  @Delete('edit/:slug')
  remove(@Param('slug') slug: string, @Req() req: Request) {
    return this.categorysService.remove(slug, req);
  }

  // اکشن های مختلف برای دسته ها در بخش کاربران
  @Get(':slug')
  findOneCtergoryPost(@Param('slug') slug: string) {
    return this.categorysService.findOneCtergoryPost(slug);
  }
}
