import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  username: string;

  @IsString()
  pass: string;

  @IsEmail()
  email: string;
  @IsNumber()
  @IsOptional()
  role: Number;

  @IsString()
  @IsOptional()
  nicename: string;

  @IsString()
  @IsOptional()
  display_name: string;

  @IsBoolean()
  @IsOptional()
  status: Boolean;
}
