export interface InsulinRecommendation {
  recommendedDose: number;
  recommendedPreBolus: number; // minutes before meal
  confidence: 'low' | 'medium' | 'high';
  reasoning: string;
  basedOnMeals: string[]; // IDs of similar historical meals
  adjustments: {
    baseCalculation: number;
    currentGlucoseAdjustment: number;
    timeOfDayAdjustment: number;
    patternAdjustment: number;
  };
}

export interface RecommendationRequest {
  plannedMeal: {
    foods: Array<{
      foodId: string;
      foodName: string;
      portionSize: number;
      portionUnit: string;
      carbs: number;
    }>;
    totalCarbs: number;
  };
  currentGlucose: number;
  timestamp: number;
}
