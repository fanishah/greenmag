import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  category: string;

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

  @IsString()
  @IsOptional()
  post_id: number;

  @IsNumber()
  @IsOptional()
  visit: number;
}
