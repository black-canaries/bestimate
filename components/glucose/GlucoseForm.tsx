import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function GlucoseForm({ onSuccess }: { onSuccess?: () => void }) {
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const addReading = useMutation(api.glucose.addGlucoseReading);

  const handleSubmit = async () => {
    const glucoseValue = parseFloat(value);

    if (!glucoseValue || glucoseValue < 20 || glucoseValue > 600) {
      return;
    }

    setLoading(true);

    try {
      await addReading({
        timestamp: Date.now(),
        value: glucoseValue,
        source: 'manual',
        notes: notes || undefined,
      });

      setValue('');
      setNotes('');
      onSuccess?.();
    } catch (error) {
      console.error('Error adding glucose reading:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Input
        label="Glucose Reading (mg/dL)"
        placeholder="120"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
        helperText="Enter value between 20-600 mg/dL"
      />

      <Input
        label="Notes (optional)"
        placeholder="e.g., Before meal, After exercise"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      <Button
        title="Log Glucose"
        onPress={handleSubmit}
        loading={loading}
        disabled={!value || loading}
      />
    </ScrollView>
  );
}
