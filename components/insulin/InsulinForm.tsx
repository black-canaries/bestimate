import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

type InsulinType = 'bolus' | 'basal' | 'correction';

export function InsulinForm({ onSuccess }: { onSuccess?: () => void }) {
  const [units, setUnits] = useState('');
  const [type, setType] = useState<InsulinType>('bolus');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const logDose = useMutation(api.insulin.logInsulinDose);

  const handleSubmit = async () => {
    const insulinUnits = parseFloat(units);

    if (!insulinUnits || insulinUnits <= 0 || insulinUnits > 100) {
      return;
    }

    setLoading(true);

    try {
      await logDose({
        timestamp: Date.now(),
        units: insulinUnits,
        type,
        notes: notes || undefined,
      });

      setUnits('');
      setNotes('');
      setType('bolus');
      onSuccess?.();
    } catch (error) {
      console.error('Error logging insulin dose:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Type</Text>
        <View className="flex-row gap-2">
          {(['bolus', 'basal', 'correction'] as InsulinType[]).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              className={`flex-1 py-3 rounded-lg border-2 ${
                type === t
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 bg-white'
              }`}>
              <Text
                className={`text-center font-semibold capitalize ${
                  type === t ? 'text-primary-700' : 'text-gray-700'
                }`}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Input
        label="Units"
        placeholder="5.5"
        keyboardType="decimal-pad"
        value={units}
        onChangeText={setUnits}
        helperText="Enter insulin dose in units"
      />

      <Input
        label="Notes (optional)"
        placeholder="e.g., With breakfast"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      <Button
        title="Log Insulin"
        onPress={handleSubmit}
        loading={loading}
        disabled={!units || loading}
      />
    </ScrollView>
  );
}
