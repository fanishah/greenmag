import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, trusted } from 'mongoose';

export type CommentsDocument = HydratedDocument<Comments>;

@Schema({ timestamps: true })
export class Comments {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  post_id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: false })
  approved: boolean;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true, default: false })
  isadmin: string;

  @Prop({ required: true, default: '0' })
  parent: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
