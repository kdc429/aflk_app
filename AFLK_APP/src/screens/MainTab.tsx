import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RegisterScreen } from "@screens/user/RegisterScreen";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if(route.name == 'Articles'){
            iconName = 'article'
          }else if(route.name == 'UserMenu'){
            iconName = 'person'
          }

          return <MaterialIcons name={iconName} color={color} size={size} />
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name='Register'
        component={RegisterScreen}
        options={{
          title: '샘플',
        }}
      />
    </Tab.Navigator>);
}
