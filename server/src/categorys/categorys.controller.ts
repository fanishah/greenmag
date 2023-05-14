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

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorysService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categorysService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.categorysService.findOne(slug);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categorysService.update(slug, updateCategoryDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.categorysService.remove(slug);
  }
}
