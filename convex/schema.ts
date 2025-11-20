import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // Meals table - stores meal information with foods and nutritional data
  meals: defineTable({
    timestamp: v.number(),
    name: v.string(),
    description: v.optional(v.string()),
    totalCarbs: v.number(),
    estimatedGI: v.optional(v.number()), // Glycemic Index
    foods: v.array(
      v.object({
        foodId: v.id('foods'),
        foodName: v.string(),
        portionSize: v.number(),
        portionUnit: v.string(),
        carbs: v.number(),
      })
    ),
    preBolusMinutes: v.optional(v.number()),
    insulinTaken: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
  }).index('by_timestamp', ['timestamp']),

  // Foods database - nutritional information for common foods
  foods: defineTable({
    name: v.string(),
    category: v.string(),
    carbsPer100g: v.number(),
    proteinPer100g: v.number(),
    fatPer100g: v.number(),
    glycemicIndex: v.optional(v.number()),
    glycemicLoad: v.optional(v.number()),
    commonServingSizes: v.array(
      v.object({
        name: v.string(),
        grams: v.number(),
      })
    ),
  }).index('by_category', ['category']),

  // Glucose readings - blood glucose measurements
  glucoseReadings: defineTable({
    timestamp: v.number(),
    value: v.number(), // mg/dL
    trend: v.optional(v.union(v.literal('rising'), v.literal('falling'), v.literal('stable'))),
    source: v.union(v.literal('manual'), v.literal('sensor')),
    notes: v.optional(v.string()),
  }).index('by_timestamp', ['timestamp']),

  // Insulin doses - tracking insulin administration
  insulinDoses: defineTable({
    timestamp: v.number(),
    units: v.number(),
    type: v.union(v.literal('bolus'), v.literal('basal'), v.literal('correction')),
    associatedMealId: v.optional(v.id('meals')),
    notes: v.optional(v.string()),
  }).index('by_timestamp', ['timestamp']),

  // Meal analyses - AI analysis of meal outcomes
  mealAnalyses: defineTable({
    mealId: v.id('meals'),
    timestamp: v.number(),
    actualGlucoseResponse: v.object({
      peakGlucose: v.number(),
      timeToPeak: v.number(),
      areaUnderCurve: v.optional(v.number()),
      returnToBaseline: v.optional(v.number()),
    }),
    predictedResponse: v.optional(
      v.object({
        expectedPeak: v.number(),
        expectedTimeToPeak: v.number(),
      })
    ),
    accuracyMetrics: v.optional(
      v.object({
        predictionError: v.number(),
        timingError: v.number(),
      })
    ),
    insights: v.optional(v.string()),
    recommendations: v.optional(v.string()),
  }).index('by_meal', ['mealId']),

  // User settings - personalized diabetes parameters
  userSettings: defineTable({
    userId: v.string(), // For future multi-user support
    defaultICR: v.number(), // Insulin-to-carb ratio (e.g., 1:10)
    icrByTimeOfDay: v.optional(
      v.object({
        breakfast: v.number(),
        lunch: v.number(),
        dinner: v.number(),
      })
    ),
    ISF: v.number(), // Insulin sensitivity factor (mg/dL per unit)
    targetGlucoseRange: v.object({
      min: v.number(),
      max: v.number(),
    }),
    preferredUnits: v.union(v.literal('mgdl'), v.literal('mmol')),
    updatedAt: v.number(),
  }).index('by_user', ['userId']),
});
