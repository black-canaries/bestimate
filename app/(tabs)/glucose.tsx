import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GlucoseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="mb-2 text-3xl font-bold text-gray-900">Glucose</Text>
          <Text className="mb-6 text-gray-600">Track your blood glucose levels</Text>

          {/* Current Reading */}
          <View className="mb-4 rounded-lg bg-white p-6 shadow-sm">
            <Text className="mb-2 text-sm text-gray-500">Current Reading</Text>
            <Text className="text-5xl font-bold text-gray-400">--</Text>
            <Text className="mt-1 text-gray-500">mg/dL</Text>
          </View>

          {/* Statistics */}
          <View className="rounded-lg bg-white p-6 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-900">Statistics</Text>
            <View className="mb-3 flex-row justify-between">
              <Text className="text-gray-600">Average</Text>
              <Text className="font-semibold text-gray-900">--</Text>
            </View>
            <View className="mb-3 flex-row justify-between">
              <Text className="text-gray-600">Time in Range</Text>
              <Text className="font-semibold text-gray-900">--%</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Std Deviation</Text>
              <Text className="font-semibold text-gray-900">--</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
