import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private UsersModel: Model<Users>) {}

  // ایجاد کاربر جدید
  async create(createUserDto: CreateUserDto, req?: any) {
    const { username, pass, email } = createUserDto;

    const findUsername = await this.findByUsername(username);
    const findEmail = await this.findByEmail(email);

    if (findUsername.statusCode == 200 || findEmail.statusCode == 200) {
      return false;
    }

    const hashPass = await hash(pass, 10);

    await this.UsersModel.create({
      ...createUserDto,
      pass: hashPass,
      nicename: username,
      display_name: username,
    });

    return true;
  }

  // دریافت تمام کاربران
  async findAll() {
    const allUser = await this.UsersModel.find();

    return {
      statusCode: 200,
      message: '',
      data: allUser,
    };
  }

  // دریافت کاربر بر اساس نام کاربری
  async findByUsername(username: string) {
    const findUser = await this.UsersModel.findOne({
      username,
    });

    if (!findUser) {
      return {
        statusCode: 400,
        data: 'کاربری با این نام کاربری وجود ندارد',
      };
    }

    return {
      statusCode: 200,
      message: '',
      data: findUser,
    };
  }

  // دریافت کاربر بر اساس نام ایمیل
  async findByEmail(email: string) {
    const findUser = await this.UsersModel.findOne({
      email,
    });

    if (!findUser) {
      return {
        statusCode: 400,
        data: 'کاربری با این ایمیل وجود ندارد',
      };
    }

    return {
      statusCode: 200,
      message: '',
      data: findUser,
    };
  }

  // بروزرسانی کاربر
  async update(username: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.UsersModel.updateOne(
      { username },
      { ...updateUserDto },
    );

    if (!updateUser) {
      return {
        statusCode: 400,
        error: 'کاربری با این نام کاربری وجود ندارد',
      };
    }
    return {
      statusCode: 201,
      message: 'کاربر با موفقیت بروزرسانی شد.',
    };
  }

  // حذف کاربر
  async remove(username: string) {
    await this.UsersModel.deleteOne({ username });
    return {
      statusCode: 200,
      message: 'کاربر با موفقیت حذف شد.',
    };
  }
}
