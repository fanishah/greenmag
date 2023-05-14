import { Test, TestingModule } from '@nestjs/testing';
import { CategorypostController } from './categorypost.controller';
import { CategorypostService } from './categorypost.service';

describe('CategorypostController', () => {
  let controller: CategorypostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategorypostController],
      providers: [CategorypostService],
    }).compile();

    controller = module.get<CategorypostController>(CategorypostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
