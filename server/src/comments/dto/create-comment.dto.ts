import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  fullname: string;

  @IsString()
  post_id: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  approved: boolean;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  ip: string;

  @IsString()
  @IsOptional()
  isadmin: string;

  @IsString()
  @IsOptional()
  parent: string;
}
