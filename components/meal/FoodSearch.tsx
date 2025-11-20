import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface FoodSearchProps {
  onSelectFood: (food: any) => void;
}

export function FoodSearch({ onSelectFood }: FoodSearchProps) {
  const [search, setSearch] = useState('');
  const foods = useQuery(api.foods.getFoods, { search: search || undefined });

  if (foods === undefined) {
    return <LoadingSpinner message="Loading foods..." />;
  }

  return (
    <View className="flex-1">
      <Input
        label="Search Foods"
        placeholder="Search for a food..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={foods}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectFood(item)}>
            <Card className="mb-2">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 text-base">{item.name}</Text>
                  <Text className="text-sm text-gray-500 capitalize">{item.category}</Text>
                </View>
                <View className="ml-4">
                  <Text className="text-sm text-gray-600">
                    {item.carbsPer100g}g carbs/100g
                  </Text>
                  {item.glycemicIndex && (
                    <Text className="text-xs text-gray-500">GI: {item.glycemicIndex}</Text>
                  )}
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="p-8 items-center">
            <Text className="text-gray-500">No foods found</Text>
          </View>
        }
      />
    </View>
  );
}
