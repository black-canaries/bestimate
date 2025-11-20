import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InsightsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="mb-2 text-3xl font-bold text-gray-900">Insights</Text>
          <Text className="mb-6 text-gray-600">AI-powered patterns and recommendations</Text>

          {/* Personalized ICR */}
          <View className="mb-4 rounded-lg bg-white p-6 shadow-sm">
            <Text className="mb-2 text-lg font-semibold text-gray-900">Personalized ICR</Text>
            <Text className="mb-4 text-gray-500">
              Your insulin-to-carb ratio based on historical data
            </Text>
            <Text className="text-center text-gray-400">Not enough data yet</Text>
          </View>

          {/* Patterns */}
          <View className="mb-4 rounded-lg bg-white p-6 shadow-sm">
            <Text className="mb-2 text-lg font-semibold text-gray-900">Food Patterns</Text>
            <Text className="mb-4 text-gray-500">Foods that affect your glucose most</Text>
            <Text className="text-center text-gray-400">Not enough data yet</Text>
          </View>

          {/* Teaching Moments */}
          <View className="rounded-lg bg-white p-6 shadow-sm">
            <Text className="mb-2 text-lg font-semibold text-gray-900">Teaching Moments</Text>
            <Text className="mb-4 text-gray-500">Learn from your data</Text>
            <Text className="text-center text-gray-400">No insights available yet</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
