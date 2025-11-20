# Convex Backend Setup

## First Time Setup

1. Initialize Convex (this will create a Convex project):
   ```bash
   npx convex dev
   ```

   This will:
   - Create a `.env.local` file with your Convex deployment URL
   - Generate the `_generated` folder with TypeScript types
   - Start watching for changes

2. Seed the database with initial foods:
   - Open the Convex dashboard (URL will be shown in terminal)
   - Go to Functions
   - Run `seedData:seedFoods` mutation
   - This will populate the foods database with common foods

## Development

- Run `npx convex dev` to start the Convex development server
- The server will auto-update when you change functions
- Access the dashboard to test functions and view data

## Environment Variables

The `.env.local` file contains:
- `CONVEX_DEPLOYMENT`: Your Convex deployment URL

This file is gitignored and should not be committed.

## Database Schema

See `schema.ts` for the full database schema including:
- `meals`: Meal tracking with foods and insulin
- `foods`: Nutritional database
- `glucoseReadings`: Blood glucose measurements
- `insulinDoses`: Insulin administration logs
- `mealAnalyses`: AI analysis of meal outcomes
- `userSettings`: User preferences and diabetes parameters
