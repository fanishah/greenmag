import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from 'src/schemas/posts.schema';
import { Model } from 'mongoose';
import { Response } from 'express';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts.name) private PostsModel: Model<Posts>) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const FindPost = await this.PostsModel.findOne({
        slug: createPostDto.slug,
      });

      if (FindPost) {
        return {
          statusCode: 400,
          message: '',
          data: '',
        };
      }

      await this.PostsModel.create(createPostDto);
      return {
        statusCode: 201,
        message: 'مطلب با موفقیت منتشر شد.',
        error: '',
        data: '',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: '',
        error: 'خطا در سرور خط داد',
        data: '',
      };
    }
  }

  async findAll() {
    try {
      const AllPost = await this.PostsModel.find();
      return {
        statusCode: 200,
        message: '',
        error: '',
        data: AllPost,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: '',
        error: 'خطا در سرور خط داد',
        data: '',
      };
    }
  }

  async findOne(slug: string) {
    try {
      const FindPost = await this.PostsModel.findOne({ slug: slug });

      if (!FindPost) {
        return {
          statusCode: 204,
          message: '',
          error: 'مطلبی یافت نشد',
          data: '',
        };
      }

      return {
        statusCode: 200,
        message: '',
        error: '',
        data: FindPost,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: '',
        error: 'خطا در سرور خط داد',
        data: '',
      };
    }
  }

  async update(slug: string, updatePostDto: UpdatePostDto) {
    try {
      const FindPost = await this.PostsModel.updateOne(
        { slug: slug },
        { ...updatePostDto },
      );

      if (!updatePostDto) {
        return {
          statusCode: 204,
          message: '',
          error: '',
          data: '',
        };
      }

      if (!FindPost) {
        return {
          statusCode: 204,
          message: '',
          error: 'مطلبی یافت نشد',
          data: '',
        };
      }

      return {
        statusCode: 201,
        message: 'مطلب با موفقیت آپدیت شد',
        error: '',
        data: '',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: '',
        error: 'خطا در سرور خط داد',
        data: '',
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
