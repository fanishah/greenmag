import { IsBoolean } from 'class-validator';

export class ToptenDto {
  @IsBoolean()
  topten: Boolean;
}
