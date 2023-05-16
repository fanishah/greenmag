import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { hash } from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private UsersModel: Model<Users>) {}

  // ایجاد کاربر جدید
  async create(createUserDto: CreateUserDto) {
    const { username, pass, email } = createUserDto;

    // دریافت کاربر از نام کاربری و ایمیل
    const findUsername = await this.findByUsername(username);
    const findEmail = await this.findByEmail(email);

    // شرط وجود کاربر
    if (findUsername.statusCode == 200 || findEmail.statusCode == 200) {
      return false;
    }

    // هش پسورد
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
  async findAll(req: any) {
    const { role } = req.user;

    // بررسی نقش کاربر
    if (role === 10) {
      return {
        statusCode: 403,
        error: 'شما به این بخش دسترسی ندارید',
      };
    }
    const allUser = await this.UsersModel.find();

    return {
      statusCode: 200,
      data: allUser,
    };
  }

  // دریافت کاربر بر اساس نام کاربری
  async findByUsername(username: string) {
    // دریافت کاربر
    const findUser = await this.UsersModel.findOne({
      username,
    });

    // کاربری وجود ندارد
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
    // دریافت کاربر
    const findUser = await this.UsersModel.findOne({
      email,
    });

    // کاربری وجود ندارد
    if (!findUser) {
      return {
        statusCode: 400,
        data: 'کاربری با این ایمیل وجود ندارد',
      };
    }

    return {
      statusCode: 200,
      data: findUser,
    };
  }

  // دریافت کاربر بر اساس نام آیدی
  async findById(id: string) {
    // دریافت یورز
    const findUser = await this.UsersModel.findOne({
      _id: id,
    });

    // کاربری وجود ندارد
    if (!findUser) {
      return {
        statusCode: 400,
        data: 'کاربری با این آیدی وجود ندارد',
      };
    }

    return {
      statusCode: 200,
      data: findUser,
    };
  }
  F;

  // بروزرسانی کاربر
  async update(username: string, updateUserDto: UpdateUserDto, req?: any) {
    const { role, username: userNameUser } = req.user;

    // بررسی نقش کاربر
    if (role === 10) {
      // اگر کاربر به عنوان نقش ممبر باشد نباید بهتواند نقش و وضعیت یوزر خودش
      // یا اطلاعات بقیه کاربران رو ویرایش کن
      username = userNameUser;
      updateUserDto.username = userNameUser;
      updateUserDto.role = role;
      updateUserDto.status = true;
    }

    const updateUser = await this.UsersModel.updateOne(
      { username },
      { ...updateUserDto },
    );

    // کاربری وجود ندارد
    if (!updateUser.modifiedCount || updateUser.acknowledged) {
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
  async remove(username: string, req?: any) {
    const { role } = req.user;

    // بررسی نقش کاربر
    if (role === 10) {
      return {
        statusCode: 403,
        error: 'شما به این بخش دسترسی ندارید',
      };
    }
    const deleteUser = await this.UsersModel.deleteOne({ username });

    // کاربری وجود ندارد
    if (!deleteUser.deletedCount) {
      return {
        statusCode: 400,
        error: 'کاربری با این نام کاربری وجود ندارد',
      };
    }

    return {
      statusCode: 200,
      message: 'کاربر با موفقیت حذف شد.',
    };
  }
}
