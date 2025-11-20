import { View, Text } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Card } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function GlucoseStats() {
  // Last 7 days
  const endDate = Date.now();
  const startDate = endDate - 7 * 24 * 60 * 60 * 1000;

  const stats = useQuery(api.glucose.getGlucoseStatistics, {
    startDate,
    endDate,
  });

  if (stats === undefined) {
    return <LoadingSpinner message="Calculating statistics..." />;
  }

  if (!stats) {
    return (
      <Card className="mb-4">
        <Text className="text-gray-600 text-center">
          Not enough data to calculate statistics
        </Text>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Text className="text-lg font-semibold text-gray-900 mb-4">7-Day Statistics</Text>

      <View className="space-y-3">
        <View className="flex-row justify-between py-2">
          <Text className="text-gray-600">Average</Text>
          <Text className="font-semibold text-gray-900">{stats.average} mg/dL</Text>
        </View>

        <View className="flex-row justify-between py-2 border-t border-gray-200">
          <Text className="text-gray-600">Range</Text>
          <Text className="font-semibold text-gray-900">
            {stats.min} - {stats.max} mg/dL
          </Text>
        </View>

        <View className="flex-row justify-between py-2 border-t border-gray-200">
          <Text className="text-gray-600">Time in Range</Text>
          <Text className="font-semibold text-glucose-normal">
            {Math.round(stats.timeInRange.normal)}%
          </Text>
        </View>

        <View className="flex-row justify-between py-2 border-t border-gray-200">
          <Text className="text-gray-600">Time Low</Text>
          <Text className="font-semibold text-glucose-low">
            {Math.round(stats.timeInRange.low)}%
          </Text>
        </View>

        <View className="flex-row justify-between py-2 border-t border-gray-200">
          <Text className="text-gray-600">Time High</Text>
          <Text className="font-semibold text-glucose-high">
            {Math.round(stats.timeInRange.high)}%
          </Text>
        </View>

        <View className="flex-row justify-between py-2 border-t border-gray-200">
          <Text className="text-gray-600">Estimated A1c</Text>
          <Text className="font-semibold text-gray-900">{stats.estimatedA1c}%</Text>
        </View>
      </View>
    </Card>
  );
}
