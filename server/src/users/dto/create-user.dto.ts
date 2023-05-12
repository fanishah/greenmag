import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: String;

  @IsString()
  pass: String;

  @IsEmail()
  email: String;

  @IsString()
  @IsOptional()
  nicename: String;

  @IsString()
  @IsOptional()
  display_name: String;

  @IsBoolean()
  @IsOptional()
  status: Boolean;
}
