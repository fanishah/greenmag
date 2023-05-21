import { Injectable } from '@nestjs/common';
import { ToptenDto } from './dto/topten.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from 'src/schemas/posts.schema';
import { Model } from 'mongoose';
import { Comments } from 'src/schemas/comments.schema';

@Injectable()
export class ToptenService {
  constructor(
    @InjectModel(Posts.name) private PostsModel: Model<Posts>,
    @InjectModel(Comments.name) private CommentModel: Model<Comments>,
  ) {}

  // دریافت پربازدید ترین پست ها
  async toptenPost() {
    // دریافت پست ها
    const posts = await this.PostsModel.find();

    // مرتب کردن پست ها بر اساس بازدید
    const topten = posts.sort((a, b) => +b.visit - +a.visit);

    return {
      statusCode: 200,
      data: topten,
    };
  }
}
