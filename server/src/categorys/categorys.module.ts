import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categorys, CategorysSchema } from 'src/schemas/categorys.schema';
import { PostsService } from 'src/posts/posts.service';
import { Posts, PostsSchema } from 'src/schemas/posts.schema';
import { UsersService } from 'src/users/users.service';
import { Users, UsersSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categorys.name, schema: CategorysSchema },
      { name: Posts.name, schema: PostsSchema },
      { name: Users.name, schema: UsersSchema },
    ]),
  ],
  controllers: [CategorysController],
  providers: [CategorysService, PostsService, UsersService],
})
export class CategorysModule {}
