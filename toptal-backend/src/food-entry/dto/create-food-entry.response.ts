import { CreateFoodEntryDto } from './create-food-entry.dto';

export class CreateFoodEntryResponse extends CreateFoodEntryDto {
  warningMessage: string;
}
