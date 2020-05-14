import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import {token} from './lib/asyncStorage';

const Stack = createStackNavigator();

export default function App() {
  const [tokenJwt, setTokenJwt] = useState(null);
  useEffect(() => {
    setTokenJwt(token);
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator
          initialRouteName={tokenJwt ? 'Home' : 'Login'}
          headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={BottomTabNavigator} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
