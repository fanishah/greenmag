import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import * as uid from 'uid2';
import { Users } from './users.schema';

export type PostsDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true })
export class Posts {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, default: true })
  comment_status: Boolean;

  @Prop({ required: true, default: true })
  status: Boolean;

  @Prop({ required: true, default: false })
  ispin: Boolean;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true, default: uid(10).toLowerCase() })
  post_id: string;

  @Prop({ required: true, default: 0 })
  visit: Number;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
