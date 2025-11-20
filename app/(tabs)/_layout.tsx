import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

// Simple icon component using emoji for now
function TabBarIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, string> = {
    home: '🏠',
    meals: '🍽️',
    glucose: '📊',
    insulin: '💉',
    insights: '💡',
  };

  return (
    <View>
      <Text style={{ fontSize: 24 }}>{icons[name] || '•'}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color }) => <TabBarIcon name="meals" color={color} />,
        }}
      />
      <Tabs.Screen
        name="glucose"
        options={{
          title: 'Glucose',
          tabBarIcon: ({ color }) => <TabBarIcon name="glucose" color={color} />,
        }}
      />
      <Tabs.Screen
        name="insulin"
        options={{
          title: 'Insulin',
          tabBarIcon: ({ color }) => <TabBarIcon name="insulin" color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color }) => <TabBarIcon name="insights" color={color} />,
        }}
      />
    </Tabs>
  );
}
