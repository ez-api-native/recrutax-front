import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import {token} from './lib/asyncStorage';
import ApplyScreen from './screens/ApplyScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator
          initialRouteName={token() ? 'Home' : 'Login'}
          headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={BottomTabNavigator} />
          <Stack.Screen name="Apply" component={ApplyScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
