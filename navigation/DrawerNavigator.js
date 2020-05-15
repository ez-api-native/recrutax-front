import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import BottomTabNavigator from './BottomTabNavigator';
import LogoutScreen from '~/screens/LogoutScreen';

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
    <Drawer.Screen name="Home" component={BottomTabNavigator} />
    <Drawer.Screen name="Logout" component={LogoutScreen} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
