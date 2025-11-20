import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Log a new insulin dose
export const logInsulinDose = mutation({
  args: {
    timestamp: v.number(),
    units: v.number(),
    type: v.union(v.literal('bolus'), v.literal('basal'), v.literal('correction')),
    associatedMealId: v.optional(v.id('meals')),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const doseId = await ctx.db.insert('insulinDoses', args);
    return doseId;
  },
});

// Get insulin doses with date range filtering
export const getInsulinDoses = query({
  args: {
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query('insulinDoses').order('desc');

    if (args.startDate) {
      query = query.filter((q) => q.gte(q.field('timestamp'), args.startDate!));
    }

    if (args.endDate) {
      query = query.filter((q) => q.lte(q.field('timestamp'), args.endDate!));
    }

    const doses = await query.take(args.limit ?? 100);
    return doses;
  },
});

// Get total daily insulin
export const getTotalDailyInsulin = query({
  args: {
    date: v.number(), // Start of day timestamp
  },
  handler: async (ctx, args) => {
    const startOfDay = args.date;
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000;

    const doses = await ctx.db
      .query('insulinDoses')
      .filter((q) => q.gte(q.field('timestamp'), startOfDay))
      .filter((q) => q.lt(q.field('timestamp'), endOfDay))
      .collect();

    const totalUnits = doses.reduce((sum, dose) => sum + dose.units, 0);
    const bolusDoses = doses.filter((d) => d.type === 'bolus');
    const basalDoses = doses.filter((d) => d.type === 'basal');
    const correctionDoses = doses.filter((d) => d.type === 'correction');

    const bolusTotal = bolusDoses.reduce((sum, dose) => sum + dose.units, 0);
    const basalTotal = basalDoses.reduce((sum, dose) => sum + dose.units, 0);
    const correctionTotal = correctionDoses.reduce((sum, dose) => sum + dose.units, 0);

    return {
      total: totalUnits,
      bolus: bolusTotal,
      basal: basalTotal,
      correction: correctionTotal,
    };
  },
});

// Get insulin doses for a specific meal
export const getInsulinByMeal = query({
  args: {
    mealId: v.id('meals'),
  },
  handler: async (ctx, args) => {
    const doses = await ctx.db
      .query('insulinDoses')
      .filter((q) => q.eq(q.field('associatedMealId'), args.mealId))
      .collect();

    return doses;
  },
});
