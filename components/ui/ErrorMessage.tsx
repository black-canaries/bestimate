import { View, Text } from 'react-native';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <Text className="text-6xl mb-4">⚠️</Text>
      <Text className="text-gray-900 font-semibold text-lg mb-2">Something went wrong</Text>
      <Text className="text-gray-600 text-center mb-4">{message}</Text>
      {onRetry && (
        <Text onPress={onRetry} className="text-primary-500 font-semibold">
          Tap to retry
        </Text>
      )}
    </View>
  );
}
