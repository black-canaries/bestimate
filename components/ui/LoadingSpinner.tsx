import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <ActivityIndicator size="large" color="#3B82F6" />
      {message && <Text className="text-gray-600 mt-4 text-center">{message}</Text>}
    </View>
  );
}
