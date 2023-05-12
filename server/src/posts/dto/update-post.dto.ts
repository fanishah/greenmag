import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title: String;

  @IsString()
  @IsOptional()
  content: String;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  slug: String;

  @IsString()
  @IsOptional()
  post_id: Number;

  @IsNumber()
  @IsOptional()
  visit: Number;
}