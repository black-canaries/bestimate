import { View, Text } from 'react-native';
import { Card } from '../ui/Card';

interface GlucoseCardProps {
  reading: any;
}

export function GlucoseCard({ reading }: GlucoseCardProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const getColorClass = (value: number) => {
    if (value < 70) return 'text-glucose-low';
    if (value > 180) return 'text-glucose-high';
    return 'text-glucose-normal';
  };

  const getBgColorClass = (value: number) => {
    if (value < 70) return 'bg-red-50 border-red-200';
    if (value > 180) return 'bg-yellow-50 border-yellow-200';
    return 'bg-green-50 border-green-200';
  };

  const getStatusText = (value: number) => {
    if (value < 70) return 'Low';
    if (value < 180) return 'In Range';
    return 'High';
  };

  return (
    <Card className={`mb-3 ${getBgColorClass(reading.value)}`}>
      <View className="flex-row justify-between items-start">
        <View>
          <View className="flex-row items-baseline">
            <Text className={`text-3xl font-bold ${getColorClass(reading.value)}`}>
              {reading.value}
            </Text>
            <Text className="text-lg text-gray-600 ml-2">mg/dL</Text>
          </View>
          <Text className="text-sm text-gray-600 mt-1">{getStatusText(reading.value)}</Text>
          <Text className="text-sm text-gray-500 mt-1">
            {formatDate(reading.timestamp)} at {formatTime(reading.timestamp)}
          </Text>
        </View>

        {reading.trend && (
          <View className="bg-white px-3 py-1 rounded-full">
            <Text className="text-sm text-gray-700">
              {reading.trend === 'rising' ? '↑' : reading.trend === 'falling' ? '↓' : '→'}
            </Text>
          </View>
        )}
      </View>

      {reading.notes && (
        <View className="mt-2 pt-2 border-t border-gray-300">
          <Text className="text-sm text-gray-700">{reading.notes}</Text>
        </View>
      )}
    </Card>
  );
}
