import { View, Text } from 'react-native';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface InsulinCardProps {
  dose: any;
}

export function InsulinCard({ dose }: InsulinCardProps) {
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

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'bolus':
        return 'info';
      case 'basal':
        return 'default';
      case 'correction':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card className="mb-3">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <View className="flex-row items-baseline mb-1">
            <Text className="text-2xl font-bold text-insulin">{dose.units}</Text>
            <Text className="text-lg text-gray-600 ml-1">units</Text>
          </View>
          <Badge label={dose.type} variant={getTypeVariant(dose.type)} className="mb-2" />
          <Text className="text-sm text-gray-500">
            {formatDate(dose.timestamp)} at {formatTime(dose.timestamp)}
          </Text>
        </View>
      </View>

      {dose.notes && (
        <View className="mt-2 pt-2 border-t border-gray-200">
          <Text className="text-sm text-gray-700">{dose.notes}</Text>
        </View>
      )}
    </Card>
  );
}
