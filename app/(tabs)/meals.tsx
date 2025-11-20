import { useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { MealCard } from '../../components/meal/MealCard';
import { MealForm } from '../../components/meal/MealForm';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function MealsScreen() {
  const [showMealForm, setShowMealForm] = useState(false);
  const meals = useQuery(api.meals.getMeals, {});

  const handleMealCreated = () => {
    setShowMealForm(false);
  };

  if (meals === undefined) {
    return <LoadingSpinner message="Loading meals..." />;
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <Button title="+ Log New Meal" onPress={() => setShowMealForm(true)} />
      </View>

      {meals.length === 0 ? (
        <View className="flex-1 items-center justify-center p-8">
          <Text className="text-6xl mb-4">🍽️</Text>
          <Text className="text-gray-600 text-center">No meals logged yet</Text>
          <Text className="text-gray-500 text-sm text-center mt-2">
            Tap the button above to log your first meal
          </Text>
        </View>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <MealCard meal={item} />}
          contentContainerClassName="p-4"
        />
      )}

      <Modal visible={showMealForm} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 pt-12">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xl font-bold">Log Meal</Text>
            <TouchableOpacity onPress={() => setShowMealForm(false)}>
              <Text className="text-primary-500 font-semibold text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
          <MealForm onSuccess={handleMealCreated} />
        </View>
      </Modal>
    </View>
  );
}
