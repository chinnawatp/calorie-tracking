import { Test, TestingModule } from '@nestjs/testing';
import { FoodEntryController } from './food-entry.controller';
import { FoodEntryService } from './food-entry.service';

describe('FoodEntryController', () => {
  let controller: FoodEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodEntryController],
      providers: [FoodEntryService],
    }).compile();

    controller = module.get<FoodEntryController>(FoodEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
