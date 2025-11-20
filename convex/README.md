# Convex Backend

This directory contains the Convex serverless backend functions.

## Structure

- `/agents` - AI agents for meal analysis, pattern recognition, and recommendations
- `/lib` - Utility functions and helpers
- `schema.ts` - Database schema definitions
- `*.ts` - API functions (queries, mutations, actions)

## Running Convex

1. First time setup: `npx convex dev` (will prompt for login and project setup)
2. Development: `npx convex dev` (keep running in a separate terminal)
3. The Convex dashboard will be available at the URL shown in the terminal

## Important Notes

- Convex functions are automatically deployed when you save files
- The `_generated` directory is auto-generated, do not edit
- Use queries for reads, mutations for writes, actions for AI/external API calls
