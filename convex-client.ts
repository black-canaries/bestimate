import { ConvexReactClient } from 'convex/react';

// Create the Convex client
// The deployment URL will be set via environment variables
// You'll get this URL when you run: npx convex dev
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL || 'https://your-deployment.convex.cloud';

export const convex = new ConvexReactClient(convexUrl);
