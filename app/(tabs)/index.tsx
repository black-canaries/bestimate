import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="mb-2 text-3xl font-bold text-gray-900">Dashboard</Text>
          <Text className="mb-6 text-gray-600">Your diabetes tracking overview</Text>

          {/* Current Glucose Card */}
          <View className="mb-4 rounded-lg bg-white p-6 shadow-sm">
            <Text className="mb-2 text-sm text-gray-500">Current Glucose</Text>
            <Text className="text-4xl font-bold text-green-600">--</Text>
            <Text className="mt-1 text-sm text-gray-500">mg/dL</Text>
          </View>

          {/* Today's Summary */}
          <View className="mb-4 rounded-lg bg-white p-6 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-900">Today&apos;s Summary</Text>
            <View className="mb-3 flex-row justify-between">
              <Text className="text-gray-600">Meals Logged</Text>
              <Text className="font-semibold text-gray-900">0</Text>
            </View>
            <View className="mb-3 flex-row justify-between">
              <Text className="text-gray-600">Total Carbs</Text>
              <Text className="font-semibold text-gray-900">0g</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Total Insulin</Text>
              <Text className="font-semibold text-gray-900">0u</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="rounded-lg bg-white p-6 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</Text>
            <View className="space-y-3">
              <View className="rounded-lg bg-blue-50 p-4">
                <Text className="font-semibold text-blue-700">Log Meal</Text>
              </View>
              <View className="mt-3 rounded-lg bg-green-50 p-4">
                <Text className="font-semibold text-green-700">Log Glucose</Text>
              </View>
              <View className="mt-3 rounded-lg bg-purple-50 p-4">
                <Text className="font-semibold text-purple-700">Log Insulin</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
