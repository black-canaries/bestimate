import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <View
      className={`bg-white rounded-lg shadow-md p-4 border border-gray-200 ${className}`}
      {...props}>
      {children}
    </View>
  );
}
