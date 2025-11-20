import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Get all foods with optional search
export const getFoods = query({
  args: {
    search: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let foods = await ctx.db.query('foods').collect();

    if (args.category) {
      foods = foods.filter((food) => food.category === args.category);
    }

    if (args.search) {
      const searchLower = args.search.toLowerCase();
      foods = foods.filter((food) => food.name.toLowerCase().includes(searchLower));
    }

    return foods;
  },
});

// Get a single food by ID
export const getFoodById = query({
  args: { id: v.id('foods') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get foods by category
export const getFoodsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const foods = await ctx.db
      .query('foods')
      .filter((q) => q.eq(q.field('category'), args.category))
      .collect();

    return foods;
  },
});

// Create a custom food
export const createFood = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const foodId = await ctx.db.insert('foods', args);
    return foodId;
  },
});

// Update a food
export const updateFood = mutation({
  args: {
    id: v.id('foods'),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    carbsPer100g: v.optional(v.number()),
    proteinPer100g: v.optional(v.number()),
    fatPer100g: v.optional(v.number()),
    glycemicIndex: v.optional(v.number()),
    glycemicLoad: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});
