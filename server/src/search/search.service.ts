import { Injectable } from '@nestjs/common';
import { Posts } from 'src/schemas/posts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SearchService {
  constructor(@InjectModel(Posts.name) private PostsModel: Model<Posts>) {}

  // دریافت پست ها سرچ شده
  async search(Textsearch) {
    // دریافت پست ها
    const posts = await this.PostsModel.find({ status: true });

    // فیلتر کردن پست هایی که کلمه سرچ شده در عنوان یا درون پست هست
    const postFilter = posts.filter((word: any) => {
      return (
        word.title.includes(Textsearch) || word.content.includes(Textsearch)
      );
    });

    return {
      statusCode: 200,
      data: postFilter,
    };
  }
}
