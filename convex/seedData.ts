import { mutation } from './_generated/server';

// Seed the foods database with common foods
export const seedFoods = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existingFoods = await ctx.db.query('foods').take(1);
    if (existingFoods.length > 0) {
      return { message: 'Database already seeded' };
    }

    const foods = [
      // Fruits
      {
        name: 'Apple',
        category: 'fruits',
        carbsPer100g: 14,
        proteinPer100g: 0.3,
        fatPer100g: 0.2,
        glycemicIndex: 36,
        commonServingSizes: [
          { name: 'Small (149g)', grams: 149 },
          { name: 'Medium (182g)', grams: 182 },
          { name: 'Large (223g)', grams: 223 },
        ],
      },
      {
        name: 'Banana',
        category: 'fruits',
        carbsPer100g: 23,
        proteinPer100g: 1.1,
        fatPer100g: 0.3,
        glycemicIndex: 51,
        commonServingSizes: [
          { name: 'Small (101g)', grams: 101 },
          { name: 'Medium (118g)', grams: 118 },
          { name: 'Large (136g)', grams: 136 },
        ],
      },
      {
        name: 'Orange',
        category: 'fruits',
        carbsPer100g: 12,
        proteinPer100g: 0.9,
        fatPer100g: 0.1,
        glycemicIndex: 43,
        commonServingSizes: [
          { name: 'Small (96g)', grams: 96 },
          { name: 'Medium (131g)', grams: 131 },
          { name: 'Large (184g)', grams: 184 },
        ],
      },

      // Grains
      {
        name: 'White Rice (cooked)',
        category: 'grains',
        carbsPer100g: 28,
        proteinPer100g: 2.7,
        fatPer100g: 0.3,
        glycemicIndex: 73,
        commonServingSizes: [
          { name: '1/2 cup (79g)', grams: 79 },
          { name: '1 cup (158g)', grams: 158 },
        ],
      },
      {
        name: 'Brown Rice (cooked)',
        category: 'grains',
        carbsPer100g: 23,
        proteinPer100g: 2.6,
        fatPer100g: 0.9,
        glycemicIndex: 68,
        commonServingSizes: [
          { name: '1/2 cup (98g)', grams: 98 },
          { name: '1 cup (195g)', grams: 195 },
        ],
      },
      {
        name: 'Whole Wheat Bread',
        category: 'grains',
        carbsPer100g: 43,
        proteinPer100g: 12,
        fatPer100g: 3.5,
        glycemicIndex: 74,
        commonServingSizes: [{ name: '1 slice (28g)', grams: 28 }],
      },
      {
        name: 'Pasta (cooked)',
        category: 'grains',
        carbsPer100g: 31,
        proteinPer100g: 5.8,
        fatPer100g: 0.9,
        glycemicIndex: 49,
        commonServingSizes: [
          { name: '1/2 cup (70g)', grams: 70 },
          { name: '1 cup (140g)', grams: 140 },
        ],
      },
      {
        name: 'Oatmeal (cooked)',
        category: 'grains',
        carbsPer100g: 12,
        proteinPer100g: 2.4,
        fatPer100g: 1.4,
        glycemicIndex: 55,
        commonServingSizes: [{ name: '1 cup (234g)', grams: 234 }],
      },

      // Vegetables
      {
        name: 'Broccoli',
        category: 'vegetables',
        carbsPer100g: 7,
        proteinPer100g: 2.8,
        fatPer100g: 0.4,
        glycemicIndex: 10,
        commonServingSizes: [
          { name: '1/2 cup chopped (44g)', grams: 44 },
          { name: '1 cup chopped (91g)', grams: 91 },
        ],
      },
      {
        name: 'Sweet Potato',
        category: 'vegetables',
        carbsPer100g: 20,
        proteinPer100g: 1.6,
        fatPer100g: 0.1,
        glycemicIndex: 63,
        commonServingSizes: [
          { name: 'Small (60g)', grams: 60 },
          { name: 'Medium (114g)', grams: 114 },
          { name: 'Large (180g)', grams: 180 },
        ],
      },
      {
        name: 'Potato (baked)',
        category: 'vegetables',
        carbsPer100g: 21,
        proteinPer100g: 2.5,
        fatPer100g: 0.2,
        glycemicIndex: 85,
        commonServingSizes: [
          { name: 'Small (138g)', grams: 138 },
          { name: 'Medium (173g)', grams: 173 },
          { name: 'Large (299g)', grams: 299 },
        ],
      },

      // Proteins
      {
        name: 'Chicken Breast',
        category: 'proteins',
        carbsPer100g: 0,
        proteinPer100g: 31,
        fatPer100g: 3.6,
        glycemicIndex: 0,
        commonServingSizes: [
          { name: '3 oz (85g)', grams: 85 },
          { name: '4 oz (113g)', grams: 113 },
        ],
      },
      {
        name: 'Salmon',
        category: 'proteins',
        carbsPer100g: 0,
        proteinPer100g: 20,
        fatPer100g: 13,
        glycemicIndex: 0,
        commonServingSizes: [
          { name: '3 oz (85g)', grams: 85 },
          { name: '4 oz (113g)', grams: 113 },
        ],
      },
      {
        name: 'Eggs',
        category: 'proteins',
        carbsPer100g: 1.1,
        proteinPer100g: 13,
        fatPer100g: 11,
        glycemicIndex: 0,
        commonServingSizes: [
          { name: '1 large egg (50g)', grams: 50 },
          { name: '2 large eggs (100g)', grams: 100 },
        ],
      },

      // Dairy
      {
        name: 'Whole Milk',
        category: 'dairy',
        carbsPer100g: 5,
        proteinPer100g: 3.4,
        fatPer100g: 3.3,
        glycemicIndex: 39,
        commonServingSizes: [
          { name: '1/2 cup (122g)', grams: 122 },
          { name: '1 cup (244g)', grams: 244 },
        ],
      },
      {
        name: 'Greek Yogurt (plain)',
        category: 'dairy',
        carbsPer100g: 3.6,
        proteinPer100g: 10,
        fatPer100g: 0.4,
        glycemicIndex: 11,
        commonServingSizes: [
          { name: '5.3 oz (150g)', grams: 150 },
          { name: '1 cup (200g)', grams: 200 },
        ],
      },
      {
        name: 'Cheddar Cheese',
        category: 'dairy',
        carbsPer100g: 1.3,
        proteinPer100g: 25,
        fatPer100g: 33,
        glycemicIndex: 0,
        commonServingSizes: [
          { name: '1 oz (28g)', grams: 28 },
          { name: '1 slice (28g)', grams: 28 },
        ],
      },

      // Snacks
      {
        name: 'Almonds',
        category: 'snacks',
        carbsPer100g: 22,
        proteinPer100g: 21,
        fatPer100g: 49,
        glycemicIndex: 0,
        commonServingSizes: [
          { name: '1 oz (28g)', grams: 28 },
          { name: '1/4 cup (35g)', grams: 35 },
        ],
      },
      {
        name: 'Peanut Butter',
        category: 'snacks',
        carbsPer100g: 20,
        proteinPer100g: 25,
        fatPer100g: 50,
        glycemicIndex: 14,
        commonServingSizes: [
          { name: '1 tbsp (16g)', grams: 16 },
          { name: '2 tbsp (32g)', grams: 32 },
        ],
      },
    ];

    // Insert all foods
    for (const food of foods) {
      await ctx.db.insert('foods', food);
    }

    return { message: `Successfully seeded ${foods.length} foods` };
  },
});
