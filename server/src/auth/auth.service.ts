import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const findUser = await this.usersService.create(registerAuthDto);

    if (!findUser) {
      return {
        statusCode: 409,
        error: 'کاربری با این ایمیل یا نام کاربری قبلا ثبت نام کرده است',
      };
    }

    return {
      statusCode: 201,
      message: 'ثبت نام با موفقیت انجام شد.',
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { username, pass } = loginAuthDto;
    const findUser = await this.usersService.findByUsername(username);
    if (findUser.statusCode == 400) {
      return {
        statusCode: 401,
        error: 'نام کاربری کاربری یا رمز عبور اشتباه می باشد.',
      };
    }

    const { data }: any = findUser;
    const { id, email, display_name, status, role } = data;

    const isMatchPass = await compare(pass, data.pass);
    if (!isMatchPass) {
      return {
        statusCode: 401,
        error: 'نام کاربری کاربری یا رمز عبور اشتباه می باشد.',
      };
    }
    const accessToken = await this.jwtService.sign({
      id,
      username,
      email,
      role,
      status,
    });

    return {
      statusCode: 200,
      data: {
        accessToken,
        info: { username, email, role, display_name, status },
      },
    };
  }

  async logout() {
    return { logout: 'logout' };
  }
}
