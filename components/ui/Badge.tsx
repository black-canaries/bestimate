import { View, Text, ViewProps } from 'react-native';

interface BadgeProps extends ViewProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export function Badge({ label, variant = 'default', className = '', ...props }: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const [bgClass, textClass] = variantClasses[variant].split(' ');

  return (
    <View className={`${bgClass} rounded-full px-3 py-1 ${className}`} {...props}>
      <Text className={`${textClass} text-xs font-semibold`}>{label}</Text>
    </View>
  );
}
