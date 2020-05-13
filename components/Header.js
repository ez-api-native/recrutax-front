import React from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, Title} from 'react-native-paper';

const Header = ({title}) => {
  const navigation = useNavigation();
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('JwtToken')
        .then(res => console.log(res))
        .catch(error => console.log(error));
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Title style={styles.text}>{title}</Title>
      <Button onPress={logout}>
        <Text style={styles.text}>Logout</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
  },
});

export default Header;
