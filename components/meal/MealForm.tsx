import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { FoodSearch } from './FoodSearch';

interface SelectedFood {
  foodId: string;
  foodName: string;
  carbsPer100g: number;
  portionSize: number;
  portionUnit: string;
  carbs: number;
}

export function MealForm({ onSuccess }: { onSuccess?: () => void }) {
  const [mealName, setMealName] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [currentFood, setCurrentFood] = useState<any>(null);
  const [portionSize, setPortionSize] = useState('');

  const createMeal = useMutation(api.meals.createMeal);

  const handleSelectFood = (food: any) => {
    setCurrentFood(food);
    setShowFoodSearch(false);
  };

  const handleAddFood = () => {
    if (!currentFood || !portionSize) return;

    const portion = parseFloat(portionSize);
    const carbs = (currentFood.carbsPer100g * portion) / 100;

    const newFood: SelectedFood = {
      foodId: currentFood._id,
      foodName: currentFood.name,
      carbsPer100g: currentFood.carbsPer100g,
      portionSize: portion,
      portionUnit: 'g',
      carbs: Math.round(carbs * 10) / 10,
    };

    setSelectedFoods([...selectedFoods, newFood]);
    setCurrentFood(null);
    setPortionSize('');
  };

  const removeFood = (index: number) => {
    setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
  };

  const totalCarbs = selectedFoods.reduce((sum, food) => sum + food.carbs, 0);

  const handleSubmit = async () => {
    if (!mealName || selectedFoods.length === 0) return;

    try {
      await createMeal({
        timestamp: Date.now(),
        name: mealName,
        foods: selectedFoods,
      });

      // Reset form
      setMealName('');
      setSelectedFoods([]);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating meal:', error);
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Input
        label="Meal Name"
        placeholder="e.g., Breakfast, Lunch, Snack"
        value={mealName}
        onChangeText={setMealName}
      />

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Foods</Text>

        {selectedFoods.map((food, index) => (
          <Card key={index} className="mb-2">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="font-semibold text-gray-900">{food.foodName}</Text>
                <Text className="text-sm text-gray-600">
                  {food.portionSize}g - {food.carbs}g carbs
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeFood(index)}>
                <Text className="text-red-500 font-semibold">Remove</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        {currentFood && (
          <Card className="mb-2 bg-blue-50">
            <Text className="font-semibold text-gray-900 mb-2">{currentFood.name}</Text>
            <Input
              label="Portion Size (grams)"
              placeholder="100"
              keyboardType="numeric"
              value={portionSize}
              onChangeText={setPortionSize}
            />
            <Button title="Add to Meal" onPress={handleAddFood} size="small" />
          </Card>
        )}

        <Button
          title="+ Add Food"
          variant="secondary"
          onPress={() => setShowFoodSearch(true)}
        />
      </View>

      {selectedFoods.length > 0 && (
        <Card className="mb-4 bg-primary-50">
          <Text className="text-lg font-semibold text-gray-900">
            Total Carbs: {Math.round(totalCarbs * 10) / 10}g
          </Text>
        </Card>
      )}

      <Button
        title="Log Meal"
        onPress={handleSubmit}
        disabled={!mealName || selectedFoods.length === 0}
      />

      <Modal visible={showFoodSearch} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 p-4 pt-12">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Search Foods</Text>
            <TouchableOpacity onPress={() => setShowFoodSearch(false)}>
              <Text className="text-primary-500 font-semibold text-lg">Close</Text>
            </TouchableOpacity>
          </View>
          <FoodSearch onSelectFood={handleSelectFood} />
        </View>
      </Modal>
    </ScrollView>
  );
}
