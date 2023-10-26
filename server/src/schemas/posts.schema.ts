import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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
  category: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, default: null })
  metatag_keywords: string;

  @Prop({ required: true, default: null })
  metatag_des: string;

  @Prop({ required: true, default: true })
  comment_status: Boolean;

  @Prop({ required: true, default: true })
  status: Boolean;

  @Prop({ required: true, default: false })
  ispin: Boolean;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true, default: 0 })
  visit: Number;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
