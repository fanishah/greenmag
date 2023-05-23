import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Posts, PostsSchema } from '../schemas/posts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { Users, UsersSchema } from 'src/schemas/users.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Posts.name, schema: PostsSchema },
    ]),
    MulterModule.register({
      dest: './public',
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, UsersService],
  exports: [PostsService],
})
export class PostsModule {}
