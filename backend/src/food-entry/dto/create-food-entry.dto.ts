import { IsNotEmpty } from 'class-validator';

export class CreateFoodEntryDto {
  @IsNotEmpty()
  menuName: string;

  @IsNotEmpty()
  calorie: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  takenAt: string;
}
