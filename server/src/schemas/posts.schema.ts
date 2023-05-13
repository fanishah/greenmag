import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as uid from 'uid2';

export type PostsDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true })
export class Posts {
  @Prop({ required: true })
  title: String;

  @Prop({ required: true })
  content: String;

  @Prop({ required: true })
  author: String;

  @Prop({ required: true, default: true })
  comment_status: Boolean;

  @Prop({ required: true, default: true })
  status: Boolean;

  @Prop({ required: true, default: false })
  ispin: Boolean;

  @Prop({ required: true })
  slug: String;

  @Prop({ required: true, default: uid(10).toLowerCase() })
  post_id: String;

  @Prop({ required: true, default: 0 })
  visit: Number;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
