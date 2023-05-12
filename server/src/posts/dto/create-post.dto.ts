import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: String;

  @IsString()
  content: String;

  @IsString()
  author: String;

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
  slug: String;

  @IsString()
  @IsOptional()
  post_id: Number;

  @IsNumber()
  @IsOptional()
  visit: Number;
}
