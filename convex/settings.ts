import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

const DEFAULT_USER_ID = 'default-user'; // For POC, single user

// Get user settings
export const getSettings = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db
      .query('userSettings')
      .filter((q) => q.eq(q.field('userId'), DEFAULT_USER_ID))
      .first();

    // Return default settings if none exist
    if (!settings) {
      return {
        userId: DEFAULT_USER_ID,
        defaultICR: 10, // 1:10 ratio
        ISF: 50, // 1 unit drops glucose by 50 mg/dL
        targetGlucoseRange: {
          min: 70,
          max: 180,
        },
        preferredUnits: 'mgdl' as const,
        updatedAt: Date.now(),
      };
    }

    return settings;
  },
});

// Update user settings
export const updateSettings = mutation({
  args: {
    defaultICR: v.optional(v.number()),
    icrByTimeOfDay: v.optional(
      v.object({
        breakfast: v.number(),
        lunch: v.number(),
        dinner: v.number(),
      })
    ),
    ISF: v.optional(v.number()),
    targetGlucoseRange: v.optional(
      v.object({
        min: v.number(),
        max: v.number(),
      })
    ),
    preferredUnits: v.optional(v.union(v.literal('mgdl'), v.literal('mmol'))),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('userSettings')
      .filter((q) => q.eq(q.field('userId'), DEFAULT_USER_ID))
      .first();

    const updates = {
      ...args,
      updatedAt: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, updates);
      return existing._id;
    } else {
      // Create new settings
      const settingsId = await ctx.db.insert('userSettings', {
        userId: DEFAULT_USER_ID,
        defaultICR: args.defaultICR ?? 10,
        icrByTimeOfDay: args.icrByTimeOfDay,
        ISF: args.ISF ?? 50,
        targetGlucoseRange: args.targetGlucoseRange ?? { min: 70, max: 180 },
        preferredUnits: args.preferredUnits ?? 'mgdl',
        updatedAt: Date.now(),
      });
      return settingsId;
    }
  },
});

// Get ICR for a specific time of day
export const getICRForTime = query({
  args: {
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const settings = await ctx.db
      .query('userSettings')
      .filter((q) => q.eq(q.field('userId'), DEFAULT_USER_ID))
      .first();

    if (!settings || !settings.icrByTimeOfDay) {
      return settings?.defaultICR ?? 10;
    }

    // Determine time of day (breakfast: 6-11, lunch: 11-17, dinner: 17-22, else default)
    const hour = new Date(args.timestamp).getHours();

    if (hour >= 6 && hour < 11) {
      return settings.icrByTimeOfDay.breakfast;
    } else if (hour >= 11 && hour < 17) {
      return settings.icrByTimeOfDay.lunch;
    } else if (hour >= 17 && hour < 22) {
      return settings.icrByTimeOfDay.dinner;
    } else {
      return settings.defaultICR;
    }
  },
});
