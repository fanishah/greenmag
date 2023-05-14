import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  category_id: string;

  @IsString()
  @IsOptional()
  idsub: string;
}
