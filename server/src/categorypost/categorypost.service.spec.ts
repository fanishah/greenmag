import { Test, TestingModule } from '@nestjs/testing';
import { CategorypostService } from './categorypost.service';

describe('CategorypostService', () => {
  let service: CategorypostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategorypostService],
    }).compile();

    service = module.get<CategorypostService>(CategorypostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
