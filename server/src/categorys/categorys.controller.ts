import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}
  // اکشن های مختلف برای دسته ها در بخش مدیریت
  @Post('edit')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorysService.create(createCategoryDto);
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
  ) {
    return this.categorysService.update(slug, updateCategoryDto);
  }
  @Delete('edit/:slug')
  remove(@Param('slug') slug: string) {
    return this.categorysService.remove(slug);
  }

  // اکشن های مختلف برای دسته ها در بخش کاربران
  @Get(':slug')
  findOneCtergoryPost(@Param('slug') slug: string) {
    return this.categorysService.findOneCtergoryPost(slug);
  }
}
