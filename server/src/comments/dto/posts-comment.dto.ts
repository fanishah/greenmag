import { IsBoolean } from 'class-validator';

export class PostsCommentDto {
  @IsBoolean()
  parent: Boolean;
}
