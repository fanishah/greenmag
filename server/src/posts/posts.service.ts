import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from 'src/schemas/posts.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private PostsModel: Model<Posts>,
    private readonly usersService: UsersService,
  ) {}

  // ایجاد پست
  async create(createPostDto: CreatePostDto, req: any) {
    const { id } = req.user;

    // پیدا کردن پستی به اسلاگ دریافتی
    const FindPost = await this.PostsModel.findOne({
      slug: createPostDto.slug,
    });

    // شرط بودن پست به اسلاگ دریافتی
    if (FindPost) {
      return {
        statusCode: 400,
      };
    }

    // ثبت نویسنده پست
    createPostDto.author = id;

    await this.PostsModel.create(createPostDto);

    return {
      statusCode: 201,
      message: 'مطلب با موفقیت منتشر شد.',
    };
  }

  // دریافت همه پست ها
  async findAll() {
    const Posts = await this.PostsModel.find();
    return {
      statusCode: 200,
      data: Posts,
    };
  }

  // دریافت پست با اسلاگ دریافتی
  async findOne(slug: string) {
    // پیدا کردن پست
    const FindPost = await this.PostsModel.findOne({ slug });

    // شرط نبود پست
    if (!FindPost) {
      return {
        statusCode: 204,
        error: 'مطلبی یافت نشد',
      };
    }

    // دریفات اطلاعات نویسنده
    const { data }: any = await this.usersService.findById(FindPost.author);

    // تغییر آیدی نویسنده به نام نمایشی نویسنده
    FindPost.author = data.display_name;

    //افزایش بازدید پست
    FindPost.visit = +FindPost.visit + 1;

    return {
      statusCode: 200,
      data: FindPost,
    };
  }

  // دریافت پست های یک دسته
  async findOneInCategory(id: string) {
    // دریافت پست ها با آیدی دسته
    const FindPost = await this.PostsModel.find({ category: id });

    // شرط نبود پست
    if (!FindPost) {
      return false;
    }

    return FindPost;
  }

  // آپدیت پست
  async update(slug: string, updatePostDto: UpdatePostDto) {
    const FindPost = await this.PostsModel.updateOne(
      { slug: slug },
      updatePostDto,
    );

    // شرط نبود پست به اسلاگ دریافتی
    if (!FindPost.modifiedCount) {
      return {
        statusCode: 204,
        error: 'مطلبی یافت نشد',
      };
    }

    return {
      statusCode: 201,
      message: 'مطلب با موفقیت آپدیت شد',
    };
  }

  // حذف پست
  async remove(slug: string) {
    const findPost = await this.PostsModel.deleteOne({ slug });

    // شرط نبود پست
    if (!findPost.deletedCount) {
      return {
        statusCode: 204,
        error: 'مطلبی یافت نشد',
      };
    }

    return {
      statusCode: 201,
      message: 'مطلب با موفقیت حذف شد',
    };
  }
}
