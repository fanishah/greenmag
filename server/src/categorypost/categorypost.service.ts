import { Injectable } from '@nestjs/common';
import { CreateCategorypostDto } from './dto/create-categorypost.dto';
import { UpdateCategorypostDto } from './dto/update-categorypost.dto';

@Injectable()
export class CategorypostService {
  create(createCategorypostDto: CreateCategorypostDto) {
    return 'This action adds a new categorypost';
  }

  findAll() {
    return `This action returns all categorypost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categorypost`;
  }

  update(id: number, updateCategorypostDto: UpdateCategorypostDto) {
    return `This action updates a #${id} categorypost`;
  }

  remove(id: number) {
    return `This action removes a #${id} categorypost`;
  }
}
