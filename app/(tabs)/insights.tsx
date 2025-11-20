import { View, Text, ScrollView } from 'react-native';

export default function InsightsScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          AI Insights
        </Text>

        <View className="bg-gray-50 rounded-lg p-8 items-center justify-center">
          <Text className="text-6xl mb-4">💡</Text>
          <Text className="text-gray-600 text-center">
            Not enough data yet
          </Text>
          <Text className="text-gray-500 text-sm text-center mt-2">
            Log meals, glucose, and insulin to get personalized insights
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
