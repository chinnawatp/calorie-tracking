import { Test, TestingModule } from '@nestjs/testing';
import { FoodEntryGroupService } from './food-entry-group.service';

describe('FoodEntryGroupService', () => {
  let service: FoodEntryGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodEntryGroupService],
    }).compile();

    service = module.get<FoodEntryGroupService>(FoodEntryGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
