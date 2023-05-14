import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategorypostService } from './categorypost.service';
import { CreateCategorypostDto } from './dto/create-categorypost.dto';
import { UpdateCategorypostDto } from './dto/update-categorypost.dto';

@Controller('categorypost')
export class CategorypostController {
  constructor(private readonly categorypostService: CategorypostService) {}

  @Post()
  create(@Body() createCategorypostDto: CreateCategorypostDto) {
    return this.categorypostService.create(createCategorypostDto);
  }

  @Get()
  findAll() {
    return this.categorypostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorypostService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategorypostDto: UpdateCategorypostDto) {
    return this.categorypostService.update(+id, updateCategorypostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorypostService.remove(+id);
  }
}
