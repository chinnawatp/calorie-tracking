export interface User {
  firstName: string;
  lastName: string;
  calorieLimitPerDay: number;
  priceLimitPerDay: number;
}

export interface FoodEntry {
  id: number;
  menuName: string;
  price: number;
  calorie: number;
  takenAt: string;
}

export interface FoodEntryGroup {
  id: number;
  calorie: number;
  price: number;
  date: string;
  foodEntries: FoodEntry[];
}

export interface Pagination<T> {
  items: T[]
}