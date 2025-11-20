export interface MealAnalysis {
  _id: string;
  mealId: string;
  timestamp: number;
  actualGlucoseResponse: GlucoseResponse;
  predictedResponse?: PredictedResponse;
  accuracyMetrics?: AccuracyMetrics;
  insights?: string;
  recommendations?: string;
}

export interface GlucoseResponse {
  peakGlucose: number;
  timeToPeak: number; // minutes
  areaUnderCurve?: number;
  returnToBaseline?: number; // minutes
}

export interface PredictedResponse {
  expectedPeak: number;
  expectedTimeToPeak: number;
}

export interface AccuracyMetrics {
  predictionError: number; // mg/dL difference
  timingError: number; // minutes difference
}
