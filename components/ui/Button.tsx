import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-gray-500',
    danger: 'bg-red-500',
  };

  const sizeClasses = {
    small: 'py-2 px-3',
    medium: 'py-3 px-4',
    large: 'py-4 px-6',
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <TouchableOpacity
      className={`rounded-lg ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled || loading ? 'opacity-50' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={`text-white font-semibold text-center ${textSizeClasses[size]}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
