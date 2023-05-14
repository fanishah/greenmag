import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categorys, CategorysSchema } from 'src/schemas/categorys.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categorys.name, schema: CategorysSchema },
    ]),
  ],
  controllers: [CategorysController],
  providers: [CategorysService],
})
export class CategorysModule {}
