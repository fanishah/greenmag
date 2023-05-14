import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categorys } from 'src/schemas/categorys.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategorysService {
  constructor(
    @InjectModel(Categorys.name) private CategorysModel: Model<Categorys>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const fineCategory = await this.CategorysModel.findOne({
      slug: createCategoryDto.slug,
    });

    if (fineCategory) {
      return {
        statusCode: 400,
        error: 'این نشانی دسته قبلا ثبت شده است.',
      };
    }
    await this.CategorysModel.create(createCategoryDto);
    return {
      statusCode: 201,
      message: 'دسته با موفقیت ثبت شد.',
      error: '',
      data: '',
    };
  }

  async findAll() {
    const findAll = await this.CategorysModel.find();
    return {
      statusCode: 200,
      data: findAll,
    };
  }

  async findOne(slug: string) {
    const findCategory = await this.CategorysModel.find({ slug });

    if (!findCategory) {
      return {
        statusCode: 204,
        error: 'دسته ای یافت نشد.',
      };
    }

    let findSubCategoey = await this.CategorysModel.find({
      idsub: findCategory[0].id,
    });

    return {
      statusCode: 200,
      data: [...findCategory, ...findSubCategoey],
    };
  }

  async update(slug: string, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await this.CategorysModel.updateOne(
      { slug },
      updateCategoryDto,
    );

    if (!updateCategory.modifiedCount) {
      return {
        statusCode: 204,
        error: 'دسته ای یافت نشد.',
      };
    }

    return {
      statusCode: 201,
      message: 'دسته با موفقیت بروزرسانی شد.',
    };
  }

  async remove(slug: string) {
    const deleteCategory = await this.CategorysModel.deleteOne({ slug });
    if (!deleteCategory.deletedCount) {
      return {
        statusCode: 204,
        error: 'دسته ای یافت نشد.',
      };
    }

    return {
      statusCode: 201,
      message: 'دسته با موفقیت حذف شد.',
    };
  }
}
