import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OfferScreen from '~/screens/offer/List';
import OfferCreateScreen from '~/screens/offer/Create';
import OfferViewScreen from '~/screens/offer/View';
import Form from '~/screens/submission/Form';
import Apply from '~/screens/submission/Apply';
import SubmissionList from '~/screens/submission/List';
import {authNotLogged} from '~/lib/asyncStorage';
import getRole from '~/lib/JWTDecoder';

const NavigatorTab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const [role, setRole] = useState('');

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRole();
      setRole(userRole);
    };
    authNotLogged(navigation);
    getUserRole();
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
        name="OfferView"
        component={OfferViewScreen}
        options={{
          title: 'OfferView',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              color={color}
              focused={focused}
              size={26}
              name="file-document-edit"
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
              name="plus-circle"
            />
          ),
        }}
      />
      {role === 'candidate' && (
        <NavigatorTab.Screen
          name="Submissions"
          component={SubmissionList}
          options={{
            title: 'My submissions',
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
      )}
      {role === 'candidate' && (
        <NavigatorTab.Screen
          name="ApplySearch"
          component={Apply}
          options={{
            title: 'Apply',
            tabBarIcon: ({color, focused}) => (
              <MaterialCommunityIcons
                color={color}
                focused={focused}
                size={26}
                name="comment-search"
              />
            ),
          }}
        />
      )}
      {role === 'candidate' && (
        <NavigatorTab.Screen
          name="ApplyForm"
          component={Form}
          options={{
            title: 'Apply',
            tabBarIcon: ({color, focused}) => (
              <MaterialCommunityIcons
                color={color}
                focused={focused}
                size={26}
                name="format-columns"
              />
            ),
          }}
        />
      )}
    </NavigatorTab.Navigator>
  );
};

export default BottomTabNavigator;
