export interface Meal {
  _id: string;
  timestamp: number;
  name: string;
  description?: string;
  totalCarbs: number;
  estimatedGI?: number;
  foods: MealFood[];
  preBolusMinutes?: number;
  insulinTaken?: number;
  tags?: string[];
  notes?: string;
}

export interface MealFood {
  foodId: string;
  foodName: string;
  portionSize: number;
  portionUnit: string;
  carbs: number;
}

export interface CreateMealInput {
  timestamp: number;
  name: string;
  description?: string;
  foods: MealFood[];
  preBolusMinutes?: number;
  insulinTaken?: number;
  tags?: string[];
  notes?: string;
}
