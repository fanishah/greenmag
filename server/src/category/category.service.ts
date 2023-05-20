import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/schemas/category.schema';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategorysModel: Model<Category>,
    private readonly postsService: PostsService,
  ) {}

  // اکشن های مختلف برای دسته ها در بخش مدیریت
  // ساخت دسته جدید
  async create(createCategoryDto: CreateCategoryDto, req?: any) {
    const { role } = req.user;

    // بررسی نقش کاربر
    if (role === 10) {
      return {
        statusCode: 403,
        error: 'شما به این بخش دسترسی ندارید',
      };
    }

    const fineCategory = await this.CategorysModel.findOne({
      slug: createCategoryDto.slug,
    });

    // شرط وجود داشتن دسته با اسلاگ کاربر
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

  // دریافت همه دسته ها
  async findAll() {
    const findAll = await this.CategorysModel.find();
    return {
      statusCode: 200,
      data: findAll,
    };
  }

  // دریافت دسته و زیردسته با اسلاگ
  async findOne(slug: string) {
    const findCategory = await this.CategorysModel.find({ slug });

    // دسته وجود ندارد
    if (findCategory.length < 1) {
      return {
        statusCode: 204,
        error: 'دسته ای یافت نشد.',
      };
    }

    // دریافت زیر شاخه دسته
    let findSubCategoey = await this.CategorysModel.find({
      idsub: findCategory[0].id,
    });

    return {
      statusCode: 200,
      data: [...findCategory, ...findSubCategoey],
    };
  }

  // بروزرسانی دسته
  async update(slug: string, updateCategoryDto: UpdateCategoryDto, req?: any) {
    const { role } = req.user;

    // بررسی نقش کاربر
    if (role === 10) {
      return {
        statusCode: 403,
        error: 'شما به این بخش دسترسی ندارید',
      };
    }

    const updateCategory = await this.CategorysModel.updateOne(
      { slug },
      updateCategoryDto,
    );

    // شرط نبود دسته
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

  // حذف دسته
  async remove(slug: string, req?: any) {
    const { role } = req.user;

    // بررسی نقش کاربر
    if (role === 10) {
      return {
        statusCode: 403,
        error: 'شما به این بخش دسترسی ندارید',
      };
    }

    const deleteCategory = await this.CategorysModel.deleteOne({ slug });

    // شرط نبود دسته
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

  // اکشن های مختلف برای دسته ها در بخش کاربران
  // دریافت تمام پست های یه دسته با اسلاگ
  async findOneCtergoryPost(slug) {
    // دریافت دسته همراه با زیرشاخه
    const { data: categoryData, statusCode } = await this.findOne(slug);

    if (statusCode == 204) {
      return {
        statusCode: 204,
        error: 'دسته ای یافت نشد.',
      };
    }

    let PostsCategory: any = []; // پست ها

    // دریافت تمام پست ها دسته و زیرشاخه
    for (let i = 0; i < categoryData.length; i++) {
      // دریافت پست
      const posts = await this.postsService.findOneInCategory(
        categoryData[i].id,
      );
      // شرط پیدا یا بودن پست در دسته مورد نظر
      if (posts) {
        PostsCategory.push(posts);
      }
    }
    return {
      statusCode: 200,
      data: PostsCategory,
    };
  }
}
