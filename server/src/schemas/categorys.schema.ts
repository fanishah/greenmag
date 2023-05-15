import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CategorysDocument = HydratedDocument<Categorys>;

@Schema({ timestamps: true })
export class Categorys {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true, default: 0 })
  idsub: string;
}

export const CategorysSchema = SchemaFactory.createForClass(Categorys);
