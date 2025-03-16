import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import FieldsScreen from './fields';
import WorkScreen from './work';
import InsightsScreen from './insights';
import ProfileScreen from './profile';
import MeasureScreen from './measure';  // Import the Measure Screen

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff', paddingBottom: 10 },
        tabBarActiveTintColor: '#0066ff',
        tabBarInactiveTintColor: '#B0B0B0',
      }}
    >
      <Tab.Screen
        name="Measure"
        component={MeasureScreen}  
        options={{
          headerShown: false,  
          tabBarIcon: ({ color }) => <Ionicons name="location-outline" size={24} color={color} />,  
        }}
      />
      <Tab.Screen
        name="Fields"
        component={FieldsScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Work"
        component={WorkScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="briefcase-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="bar-chart-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
