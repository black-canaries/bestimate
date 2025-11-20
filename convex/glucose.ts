import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Add a new glucose reading
export const addGlucoseReading = mutation({
  args: {
    timestamp: v.number(),
    value: v.number(),
    trend: v.optional(v.union(v.literal('rising'), v.literal('falling'), v.literal('stable'))),
    source: v.union(v.literal('manual'), v.literal('sensor')),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const readingId = await ctx.db.insert('glucoseReadings', args);
    return readingId;
  },
});

// Get glucose readings with date range filtering
export const getGlucoseReadings = query({
  args: {
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query('glucoseReadings').order('desc');

    if (args.startDate) {
      query = query.filter((q) => q.gte(q.field('timestamp'), args.startDate!));
    }

    if (args.endDate) {
      query = query.filter((q) => q.lte(q.field('timestamp'), args.endDate!));
    }

    const readings = await query.take(args.limit ?? 100);
    return readings;
  },
});

// Get the most recent glucose reading
export const getCurrentGlucose = query({
  args: {},
  handler: async (ctx) => {
    const readings = await ctx.db
      .query('glucoseReadings')
      .order('desc')
      .take(1);

    return readings[0] ?? null;
  },
});

// Get glucose statistics for a date range
export const getGlucoseStatistics = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const readings = await ctx.db
      .query('glucoseReadings')
      .filter((q) => q.gte(q.field('timestamp'), args.startDate))
      .filter((q) => q.lte(q.field('timestamp'), args.endDate))
      .collect();

    if (readings.length === 0) {
      return null;
    }

    const values = readings.map((r) => r.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const average = sum / values.length;

    const min = Math.min(...values);
    const max = Math.max(...values);

    // Calculate time in range
    const low = values.filter((v) => v < 70).length;
    const normal = values.filter((v) => v >= 70 && v <= 180).length;
    const high = values.filter((v) => v > 180).length;

    const timeInRange = {
      low: (low / values.length) * 100,
      normal: (normal / values.length) * 100,
      high: (high / values.length) * 100,
    };

    // Calculate standard deviation
    const squaredDiffs = values.map((v) => Math.pow(v - average, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
    const standardDeviation = Math.sqrt(variance);

    // Estimate A1c from average glucose
    const estimatedA1c = (average + 46.7) / 28.7;

    return {
      average: Math.round(average),
      min,
      max,
      timeInRange,
      standardDeviation: Math.round(standardDeviation),
      estimatedA1c: Math.round(estimatedA1c * 10) / 10,
    };
  },
});
