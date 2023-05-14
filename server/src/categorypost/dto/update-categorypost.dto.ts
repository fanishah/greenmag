import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorypostDto } from './create-categorypost.dto';

export class UpdateCategorypostDto extends PartialType(CreateCategorypostDto) {}
