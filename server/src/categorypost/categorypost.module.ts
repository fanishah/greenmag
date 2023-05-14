import { Module } from '@nestjs/common';
import { CategorypostService } from './categorypost.service';
import { CategorypostController } from './categorypost.controller';

@Module({
  controllers: [CategorypostController],
  providers: [CategorypostService]
})
export class CategorypostModule {}
