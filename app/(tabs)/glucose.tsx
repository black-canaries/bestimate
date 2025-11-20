import { useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { GlucoseCard } from '../../components/glucose/GlucoseCard';
import { GlucoseForm } from '../../components/glucose/GlucoseForm';
import { GlucoseStats } from '../../components/glucose/GlucoseStats';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function GlucoseScreen() {
  const [showForm, setShowForm] = useState(false);
  const readings = useQuery(api.glucose.getGlucoseReadings, {});

  const handleReadingAdded = () => {
    setShowForm(false);
  };

  if (readings === undefined) {
    return <LoadingSpinner message="Loading glucose readings..." />;
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <Button title="+ Log Glucose" onPress={() => setShowForm(true)} />
      </View>

      {readings.length === 0 ? (
        <View className="flex-1 items-center justify-center p-8">
          <Text className="text-6xl mb-4">📊</Text>
          <Text className="text-gray-600 text-center">No glucose readings yet</Text>
          <Text className="text-gray-500 text-sm text-center mt-2">
            Tap the button above to log your first reading
          </Text>
        </View>
      ) : (
        <FlatList
          data={readings}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={<GlucoseStats />}
          renderItem={({ item }) => <GlucoseCard reading={item} />}
          contentContainerClassName="p-4"
        />
      )}

      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 pt-12">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xl font-bold">Log Glucose</Text>
            <TouchableOpacity onPress={() => setShowForm(false)}>
              <Text className="text-primary-500 font-semibold text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
          <GlucoseForm onSuccess={handleReadingAdded} />
        </View>
      </Modal>
    </View>
  );
}
