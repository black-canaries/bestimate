import { View, Text } from 'react-native';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface MealCardProps {
  meal: any;
}

export function MealCard({ meal }: MealCardProps) {
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
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  return (
    <Card className="mb-3">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">{meal.name}</Text>
          <Text className="text-sm text-gray-500">
            {formatDate(meal.timestamp)} at {formatTime(meal.timestamp)}
          </Text>
        </View>
        <Badge label={`${Math.round(meal.totalCarbs)}g carbs`} variant="info" />
      </View>

      <View className="border-t border-gray-200 pt-2 mt-2">
        <Text className="text-sm text-gray-600 mb-1">Foods:</Text>
        {meal.foods.map((food: any, index: number) => (
          <Text key={index} className="text-sm text-gray-700">
            • {food.foodName} ({food.portionSize}g)
          </Text>
        ))}
      </View>

      {meal.insulinTaken && (
        <View className="mt-2 pt-2 border-t border-gray-200">
          <Text className="text-sm text-gray-600">
            💉 Insulin: {meal.insulinTaken}u
          </Text>
        </View>
      )}
    </Card>
  );
}
