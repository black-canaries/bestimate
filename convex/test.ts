// This import will be available after running: npx convex dev
// eslint-disable-next-line import/no-unresolved
import { query } from './_generated/server';

export const hello = query({
  handler: async () => {
    return 'Hello from Convex!';
  },
});
