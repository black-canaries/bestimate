import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className = '', ...props }: InputProps) {
  return (
    <View className="mb-4">
      {label && <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>}

      <TextInput
        className={`border rounded-lg px-4 py-3 text-base ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />

      {error && <Text className="text-sm text-red-500 mt-1">{error}</Text>}

      {helperText && !error && <Text className="text-sm text-gray-500 mt-1">{helperText}</Text>}
    </View>
  );
}
