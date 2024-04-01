import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { Startup } from '../screens';
import { useTheme as customTheme } from '../hooks';
import MainNavigator from './Main';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from '../../@types/navigation';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode } = customTheme();
  // const { colors } = NavigationTheme;

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <SafeAreaView
      style={[Layout.fill, { backgroundColor: DarkTheme.colors.background }]}
    >
      {/* Intentionally passing dark theme to this  */}
      <PaperProvider theme={darkMode ? MD3DarkTheme : MD3DarkTheme}>
        <NavigationContainer theme={DarkTheme} ref={navigationRef}>
          <StatusBar barStyle={'light-content'} />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Startup" component={Startup} />
            <Stack.Screen name="Main" component={MainNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
