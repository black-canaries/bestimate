import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Create a new meal
export const createMeal = mutation({
  args: {
    timestamp: v.number(),
    name: v.string(),
    description: v.optional(v.string()),
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
  },
  handler: async (ctx, args) => {
    // Calculate total carbs from foods
    const totalCarbs = args.foods.reduce((sum, food) => sum + food.carbs, 0);

    // Insert the meal
    const mealId = await ctx.db.insert('meals', {
      ...args,
      totalCarbs,
      estimatedGI: undefined, // TODO: Calculate based on foods
    });

    return mealId;
  },
});

// Get all meals with optional date range filtering
export const getMeals = query({
  args: {
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let mealsQuery = ctx.db.query('meals').order('desc');

    if (args.startDate) {
      mealsQuery = mealsQuery.filter((q) => q.gte(q.field('timestamp'), args.startDate!));
    }

    if (args.endDate) {
      mealsQuery = mealsQuery.filter((q) => q.lte(q.field('timestamp'), args.endDate!));
    }

    const meals = await mealsQuery.take(args.limit ?? 50);
    return meals;
  },
});

// Get a single meal by ID
export const getMealById = query({
  args: { id: v.id('meals') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update a meal
export const updateMeal = mutation({
  args: {
    id: v.id('meals'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    foods: v.optional(
      v.array(
        v.object({
          foodId: v.id('foods'),
          foodName: v.string(),
          portionSize: v.number(),
          portionUnit: v.string(),
          carbs: v.number(),
        })
      )
    ),
    preBolusMinutes: v.optional(v.number()),
    insulinTaken: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    // Recalculate total carbs if foods were updated
    if (updates.foods) {
      const totalCarbs = updates.foods.reduce((sum, food) => sum + food.carbs, 0);
      await ctx.db.patch(id, { ...updates, totalCarbs });
    } else {
      await ctx.db.patch(id, updates);
    }

    return id;
  },
});

// Delete a meal
export const deleteMeal = mutation({
  args: { id: v.id('meals') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Search meals by food name
export const searchMealsByFood = query({
  args: { foodName: v.string() },
  handler: async (ctx, args) => {
    const allMeals = await ctx.db.query('meals').collect();

    return allMeals.filter((meal) =>
      meal.foods.some((food) =>
        food.foodName.toLowerCase().includes(args.foodName.toLowerCase())
      )
    );
  },
});
