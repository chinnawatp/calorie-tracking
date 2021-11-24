import { Test, TestingModule } from '@nestjs/testing';
import { FoodEntryGroupController } from './food-entry-group.controller';
import { FoodEntryGroupService } from './food-entry-group.service';

describe('FoodEntryGroupController', () => {
  let controller: FoodEntryGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodEntryGroupController],
      providers: [FoodEntryGroupService],
    }).compile();

    controller = module.get<FoodEntryGroupController>(FoodEntryGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
