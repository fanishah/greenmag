import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsArray()
  category: string[];

  @IsBoolean()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  metatag_keywords: string;

  @IsString()
  @IsOptional()
  metatag_des: string;

  @IsBoolean()
  @IsOptional()
  comment_status: Boolean;

  @IsBoolean()
  @IsOptional()
  status: Boolean;

  @IsBoolean()
  @IsOptional()
  ispin: Boolean;

  @IsString()
  slug: string;

  @IsNumber()
  @IsOptional()
  visit: number;
}
