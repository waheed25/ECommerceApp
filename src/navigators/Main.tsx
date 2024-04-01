import React from 'react';
import { Products, Cart } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { MainParamsList } from '../../@types/navigation';

const Stack = createStackNavigator<MainParamsList>();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
