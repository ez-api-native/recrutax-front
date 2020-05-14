import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '~/screens/HomeScreen';
import OfferScreen from '~/screens/offer/List';
import {authNotLogged} from '~/lib/asyncStorage';

const NavigatorTab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  useEffect(() => {
    authNotLogged(navigation);
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
