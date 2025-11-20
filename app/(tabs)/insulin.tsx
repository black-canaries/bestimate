import { useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { InsulinCard } from '../../components/insulin/InsulinCard';
import { InsulinForm } from '../../components/insulin/InsulinForm';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function InsulinScreen() {
  const [showForm, setShowForm] = useState(false);
  const doses = useQuery(api.insulin.getInsulinDoses, {});

  // Get today's total
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dailyTotal = useQuery(api.insulin.getTotalDailyInsulin, {
    date: today.getTime(),
  });

  const handleDoseAdded = () => {
    setShowForm(false);
  };

  if (doses === undefined) {
    return <LoadingSpinner message="Loading insulin doses..." />;
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <Button title="+ Log Insulin" onPress={() => setShowForm(true)} />
      </View>

      {doses.length === 0 ? (
        <View className="flex-1 items-center justify-center p-8">
          <Text className="text-6xl mb-4">💉</Text>
          <Text className="text-gray-600 text-center">No insulin doses logged yet</Text>
          <Text className="text-gray-500 text-sm text-center mt-2">
            Tap the button above to log your first dose
          </Text>
        </View>
      ) : (
        <FlatList
          data={doses}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={
            dailyTotal && (
              <Card className="mb-4 bg-insulin/10">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  Today's Total
                </Text>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Total</Text>
                  <Text className="font-semibold text-gray-900">{dailyTotal.total}u</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-sm text-gray-600">Bolus</Text>
                  <Text className="text-sm text-gray-700">{dailyTotal.bolus}u</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-sm text-gray-600">Basal</Text>
                  <Text className="text-sm text-gray-700">{dailyTotal.basal}u</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-sm text-gray-600">Correction</Text>
                  <Text className="text-sm text-gray-700">{dailyTotal.correction}u</Text>
                </View>
              </Card>
            )
          }
          renderItem={({ item }) => <InsulinCard dose={item} />}
          contentContainerClassName="p-4"
        />
      )}

      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 pt-12">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xl font-bold">Log Insulin</Text>
            <TouchableOpacity onPress={() => setShowForm(false)}>
              <Text className="text-primary-500 font-semibold text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
          <InsulinForm onSuccess={handleDoseAdded} />
        </View>
      </Modal>
    </View>
  );
}
