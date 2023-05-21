import { Module } from '@nestjs/common';
import { ToptenService } from './topten.service';
import { ToptenController } from './topten.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from 'src/schemas/posts.schema';
import { Comments, CommentsSchema } from 'src/schemas/comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Posts.name, schema: PostsSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
  ],
  controllers: [ToptenController],
  providers: [ToptenService],
})
export class ToptenModule {}
