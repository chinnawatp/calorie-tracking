export interface User {
  firstName: string;
  lastName: string;
  calorieLimitPerDay: number;
  priceLimitPerDay: number;
  roles: Role[];
}

export interface Role {
  name: 'ADMIN';
}

export interface FoodEntry {
  id: number;
  menuName: string;
  price: number;
  calorie: number;
  takenAt: string;
  user: User;
}

export interface FoodEntryGroup {
  id: number;
  calorie: number;
  price: number;
  takenAt: string;
  foodEntries: FoodEntry[];
}

export interface Pagination<T> {
  items: T[],
  meta: {
    currentPage: number,
    itemCount: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,
  }
}