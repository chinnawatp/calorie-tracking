import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodEntryGroupDto } from './create-food-entry-group.dto';

export class UpdateFoodEntryGroupDto extends PartialType(CreateFoodEntryGroupDto) {}
