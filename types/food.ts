export interface Food {
  _id: string;
  name: string;
  category: string;
  carbsPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  glycemicIndex?: number;
  glycemicLoad?: number;
  commonServingSizes: ServingSize[];
}

export interface ServingSize {
  name: string;
  grams: number;
}

export type FoodCategory =
  | 'fruits'
  | 'vegetables'
  | 'grains'
  | 'proteins'
  | 'dairy'
  | 'snacks'
  | 'beverages'
  | 'other';
