import { Test, TestingModule } from '@nestjs/testing';
import { FoodEntryService } from './food-entry.service';

describe('FoodEntryService', () => {
  let service: FoodEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodEntryService],
    }).compile();

    service = module.get<FoodEntryService>(FoodEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
