import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from 'src/schemas/comments.schema';
import { Model } from 'mongoose';
import { PostsCommentDto } from './dto/posts-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private CommentModel: Model<Comments>,
  ) {}

  // ثبت کامنت
  async create(createCommentDto: CreateCommentDto, ip: any) {
    // ایجاد کامنت
    const creactComment = await this.CommentModel.create({
      ...createCommentDto,
      ip,
    });

    return {
      statusCode: 201,
      message: 'کامنت با موفقیت ثبت شد.',
    };
  }

  // دریافت همه کامنت ها
  async findAll(req?: any) {
    const { role } = req.user;

    // بررسی نقش کاربر
    if (role === 10) {
      return {
        statusCode: 403,
        error: 'شما به این بخش دسترسی ندارید',
      };
    }

    // دریافت کامنت ها
    const FindCommnets = await this.CommentModel.find();

    return {
      statusCode: 201,
      data: FindCommnets,
    };
  }

  // دریافت کامنت
  async findOne(id: string) {
    const FindComment = await this.CommentModel.findOne({ id });

    // شرط نبود پست
    if (!FindComment) {
      return {
        statusCode: 204,
        error: 'کامنتی یافت نشد',
      };
    }

    return {
      statusCode: 200,
      data: FindComment,
    };
  }

  // آپدیت کامنت
  async update(id: string, updateCommentDto: UpdateCommentDto, req?: any) {
    try {
      const { role } = req.user;

      // بررسی نقش کاربر
      if (role === 10) {
        return {
          statusCode: 403,
          error: 'شما به این بخش دسترسی ندارید',
        };
      }

      // پیدا و آپدیت کامنت
      const updateComment = await this.CommentModel.updateOne(
        { id },
        updateCommentDto,
      );

      // در صورت نبود کامنت با آیدی دریافتی
      if (!updateComment.matchedCount) {
        return {
          statusCode: 204,
          error: 'کامنتی یافت نشد',
        };
      }

      return {
        statusCode: 201,
        message: 'کامنت با موفقیت آپدیت شد.',
      };
    } catch (error) {
      // در صورت نبود کامنت با آیدی دریافتی
      if (error) {
        console.log(error);
        return {
          statusCode: 204,
          error: 'کامنتی یافت نشد',
        };
      }
    }
  }

  // حذف کامنت
  async remove(id: string, req?: any) {
    try {
      const { role } = req.user;

      // بررسی نقش کاربر
      if (role === 10) {
        return {
          statusCode: 403,
          error: 'شما به این بخش دسترسی ندارید',
        };
      }

      // دریافت و حذف کامنت
      const deleteComment = await this.CommentModel.deleteOne({ _id: id });

      // در صورت نبود کامنت با آیدی دریافتی
      if (!deleteComment.deletedCount) {
        return {
          statusCode: 204,
          error: 'کامنتی یافت نشد',
        };
      }
      return {
        statusCode: 200,
        message: 'کامنت با موفقیت حذف شد.',
      };
    } catch (error) {
      // در صورت نبود کامنت با آیدی دریافتی
      if (error) {
        console.log(error);
        return {
          statusCode: 204,
          error: 'کامنتی یافت نشد',
        };
      }
    }
  }

  // دریافت کامنت های پست و پاسخ های هر کامنت
  async findOnePost(id: string, postsCommentDto: PostsCommentDto) {
    const { parent } = postsCommentDto;

    // شرط دربافت کامنت ها والد
    if (parent) {
      // دریافت کامنت های والد پست
      const findComment = await this.CommentModel.find({ post_id: id });

      // شرط نبود کامنت
      if (!findComment) {
        return {
          statusCode: 204,
          error: 'کامنتی یافت نشد',
        };
      }

      // فیلتر کامنت هایی که والد
      const filterComments = findComment.filter((e: any) => {
        e.parent == 0;
      });

      return {
        statusCode: 200,
        data: findComment,
      };
    }

    // دریافت کامنت های پاسخ کامنت های والد
    const findCommentParent = await this.CommentModel.find({ parent: id });

    // شرط نبود کامنت
    if (!findCommentParent) {
      return {
        statusCode: 204,
        error: 'کامنتی یافت نشد',
      };
    }

    return {
      statusCode: 200,
      data: findCommentParent,
    };
  }
}
