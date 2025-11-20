import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InsulinScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="mb-2 text-3xl font-bold text-gray-900">Insulin</Text>
          <Text className="mb-6 text-gray-600">Log and track insulin doses</Text>

          {/* Daily Total */}
          <View className="mb-4 rounded-lg bg-white p-6 shadow-sm">
            <Text className="mb-2 text-sm text-gray-500">Today&apos;s Total</Text>
            <Text className="text-4xl font-bold text-purple-600">0u</Text>
            <View className="mt-4 flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Bolus</Text>
                <Text className="text-lg font-semibold text-gray-900">0u</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Basal</Text>
                <Text className="text-lg font-semibold text-gray-900">0u</Text>
              </View>
            </View>
          </View>

          {/* Recent Doses */}
          <View className="rounded-lg bg-white p-6 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-900">Recent Doses</Text>
            <Text className="text-center text-gray-500">No doses logged yet</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
