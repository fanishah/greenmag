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

  async create(createPostDto: CreatePostDto, req: any) {
    const { id } = req.user;
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
    if (!createPostDto.author) {
      createPostDto.author = id;
    }

    await this.PostsModel.create(createPostDto);
    return {
      statusCode: 201,
      message: 'مطلب با موفقیت منتشر شد.',
      error: '',
      data: '',
    };
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
    const FindPost = await this.PostsModel.findOne({ slug: slug });

    if (!FindPost) {
      return {
        statusCode: 204,
        message: '',
        error: 'مطلبی یافت نشد',
        data: '',
      };
    }

    const { data }: any = await this.usersService.findById(FindPost.author);
    FindPost.author = data.display_name;
    
    return {
      statusCode: 200,
      message: '',
      error: '',
      data: FindPost,
    };
  }

  async findOneInCategory(id: string) {
    const FindPost = await this.PostsModel.find({ category: id });

    if (!FindPost) {
      return false;
    }

    return FindPost;
  }

  async update(slug: string, updatePostDto: UpdatePostDto) {
    try {
      const FindPost = await this.PostsModel.updateOne(
        { slug: slug },
        { ...updatePostDto },
      );

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
