import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodEntryDto } from './create-food-entry.dto';

export class UpdateFoodEntryDto extends PartialType(CreateFoodEntryDto) {}
