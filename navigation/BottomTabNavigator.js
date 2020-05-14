import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OfferScreen from '~/screens/offer/List';
import OfferCreateScreen from '~/screens/offer/Create';
import OfferViewScreen from '~/screens/offer/View';
import {authNotLogged} from '~/lib/asyncStorage';

const NavigatorTab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    authNotLogged(navigation);
  }, [navigation]);

  return (
    <NavigatorTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      activeColor="#1e8ae9"
      barStyle={{backgroundColor: 'white'}}>
      <NavigatorTab.Screen
        name="Offer"
        component={OfferScreen}
        options={{
          title: 'My offers',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              color={color}
              focused={focused}
              size={26}
              name="format-list-bulleted"
            />
          ),
        }}
      />
      <NavigatorTab.Screen
        name="OfferCreate"
        component={OfferCreateScreen}
        options={{
          title: 'OfferCreate',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              color={color}
              focused={focused}
              size={26}
              name="format-color-text"
            />
          ),
        }}
      />
      <NavigatorTab.Screen
        name="OfferView"
        component={OfferViewScreen}
        options={{
          title: 'OfferView',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              color={color}
              focused={focused}
              size={26}
              name="library-books"
            />
          ),
        }}
      />
    </NavigatorTab.Navigator>
  );
};

export default BottomTabNavigator;
