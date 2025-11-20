import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

function TabBarIcon({ name, color }: { name: string; color: string }) {
  return (
    <View className="items-center justify-center">
      <Text style={{ color, fontSize: 24 }}>{name}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10b981',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="🏠" color={color} />,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color }) => <TabBarIcon name="🍽️" color={color} />,
        }}
      />
      <Tabs.Screen
        name="glucose"
        options={{
          title: 'Glucose',
          tabBarIcon: ({ color }) => <TabBarIcon name="📊" color={color} />,
        }}
      />
      <Tabs.Screen
        name="insulin"
        options={{
          title: 'Insulin',
          tabBarIcon: ({ color }) => <TabBarIcon name="💉" color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color }) => <TabBarIcon name="💡" color={color} />,
        }}
      />
    </Tabs>
  );
}
