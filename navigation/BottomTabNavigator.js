import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '~/screens/HomeScreen';
import OfferScreen from '~/screens/offer/List';

const NavigatorTab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  const alreadyLogged = async () => {
    try {
      const res = await AsyncStorage.getItem('JwtToken');
      if (!res) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    alreadyLogged();
  }, []);

  return (
    <NavigatorTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      activeColor="#1e8ae9"
      barStyle={{backgroundColor: 'white'}}>
      <NavigatorTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              color={color}
              focused={focused}
              size={26}
              style={{marginBottom: 3}}
              name="home"
            />
          ),
        }}
      />
      <NavigatorTab.Screen
        name="Offer"
        component={OfferScreen}
        options={{
          title: 'Offer',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              color={color}
              focused={focused}
              size={26}
              style={{marginBottom: 3}}
              name="library-books"
            />
          ),
        }}
      />
    </NavigatorTab.Navigator>
  );
};

export default BottomTabNavigator;
