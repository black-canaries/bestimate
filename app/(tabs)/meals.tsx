import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MealsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="mb-2 text-3xl font-bold text-gray-900">Meals</Text>
          <Text className="mb-6 text-gray-600">Track your meals and carbs</Text>

          <View className="rounded-lg bg-white p-6 shadow-sm">
            <Text className="text-center text-gray-500">No meals logged yet</Text>
            <Text className="mt-2 text-center text-gray-400">
              Tap the + button to add your first meal
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
