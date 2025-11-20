import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from 'convex/react';
import { useRouter } from 'expo-router';
import { api } from '../../convex/_generated/api';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function HomeScreen() {
  const router = useRouter();

  // Get current glucose
  const currentGlucose = useQuery(api.glucose.getCurrentGlucose);

  // Get today's data
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfDay = today.getTime() + 24 * 60 * 60 * 1000;

  const todaysMeals = useQuery(api.meals.getMeals, {
    startDate: today.getTime(),
    endDate: endOfDay,
  });

  const dailyInsulin = useQuery(api.insulin.getTotalDailyInsulin, {
    date: today.getTime(),
  });

  const getGlucoseColor = (value: number) => {
    if (value < 70) return 'text-glucose-low';
    if (value > 180) return 'text-glucose-high';
    return 'text-glucose-normal';
  };

  const totalCarbs = todaysMeals?.reduce((sum, meal) => sum + meal.totalCarbs, 0) || 0;

  if (currentGlucose === undefined || todaysMeals === undefined || dailyInsulin === undefined) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 mb-4">Welcome to Bestimate</Text>

        {/* Current Glucose Card */}
        <Card className="mb-4">
          <Text className="text-sm text-gray-600 mb-2">Current Glucose</Text>
          {currentGlucose ? (
            <>
              <View className="flex-row items-baseline">
                <Text className={`text-5xl font-bold ${getGlucoseColor(currentGlucose.value)}`}>
                  {currentGlucose.value}
                </Text>
                <Text className="text-xl text-gray-600 ml-2">mg/dL</Text>
              </View>
              {currentGlucose.trend && (
                <Text className="text-sm text-gray-500 mt-2">
                  {currentGlucose.trend === 'rising'
                    ? '↑ Trending up'
                    : currentGlucose.trend === 'falling'
                      ? '↓ Trending down'
                      : '→ Stable'}
                </Text>
              )}
            </>
          ) : (
            <Text className="text-gray-500">No recent readings</Text>
          )}
        </Card>

        {/* Today's Summary */}
        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</Text>

          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Meals logged</Text>
            <Text className="font-semibold text-gray-900">{todaysMeals.length}</Text>
          </View>

          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Total carbs</Text>
            <Text className="font-semibold text-gray-900">{Math.round(totalCarbs)}g</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-600">Total insulin</Text>
            <Text className="font-semibold text-gray-900">{dailyInsulin.total}u</Text>
          </View>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</Text>

          <View className="space-y-3">
            <TouchableOpacity
              onPress={() => router.push('/meals')}
              className="bg-meal rounded-lg p-4">
              <Text className="text-white font-semibold text-center">Log Meal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/glucose')}
              className="bg-glucose-normal rounded-lg p-4 mt-3">
              <Text className="text-white font-semibold text-center">Log Glucose</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/insulin')}
              className="bg-insulin rounded-lg p-4 mt-3">
              <Text className="text-white font-semibold text-center">Log Insulin</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
