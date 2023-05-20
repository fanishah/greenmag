import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from 'src/posts/posts.service';
import { Posts, PostsSchema } from 'src/schemas/posts.schema';
import { UsersService } from 'src/users/users.service';
import { Users, UsersSchema } from 'src/schemas/users.schema';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Posts.name, schema: PostsSchema },
      { name: Users.name, schema: UsersSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, PostsService, UsersService],
})
export class CategoryModule {}
