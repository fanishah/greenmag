import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private UsersModel: Model<Users>) {}

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const findUser = await this.findOne(username);

    if (findUser.statusCode == 200) {
      return {
        statusCode: 409,
        message: 'کاربری با این نام کاربری موجود می باشد.',
        error: '',
        data: '',
      };
    }

    const createUser = await this.UsersModel.create({
      ...createUserDto,
      nicename: username,
      display_name: username,
    });

    return {
      statusCode: 201,
      message: 'کاربر جدید با موفقیت ایجاد شد.',
      data: '',
    };
  }

  async findAll() {
    const allUser = await this.UsersModel.find();

    return {
      statusCode: 200,
      message: '',
      data: allUser,
    };
  }

  async findOne(username: String) {
    const findUser = await this.UsersModel.findOne({ username });

    if (!findUser) {
      return {
        statusCode: 400,
        message: '',
        data: 'کاربری با این نام کاربری وجود ندارد',
      };
    }

    return {
      statusCode: 200,
      message: '',
      data: findUser,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
