import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const alreadyLogged = async () => {
    try {
      const res = await AsyncStorage.getItem('JwtToken');
      if (!res) {
        setToken(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    alreadyLogged();
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator
          initialRouteName={token ? 'Home' : 'Login'}
          headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={BottomTabNavigator} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
