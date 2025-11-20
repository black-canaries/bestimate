import { Stack } from 'expo-router';
import { ConvexProvider } from 'convex/react';
import { convex } from '../convex-client';
import '../global.css';

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ConvexProvider>
  );
}
