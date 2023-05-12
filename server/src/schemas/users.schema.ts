import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  username: String;

  @Prop({ required: true })
  pass: String;

  @Prop({ required: true })
  email: String;

  @Prop({ required: true })
  nicename: String;

  @Prop({ required: true })
  display_name: String;

  @Prop({ required: true, default: true })
  status: Boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
