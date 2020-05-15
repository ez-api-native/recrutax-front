import AsyncStorage from '@react-native-community/async-storage';

export const token = async () =>
  await AsyncStorage.getItem('JwtToken').then(res => JSON.parse(res));

export const logout = async navigation => {
  await AsyncStorage.removeItem('JwtToken');
  navigation.navigate('Login');
};

export const authIsLogged = navigation => {
  token().then(res => {
    if (res) {
      navigation.navigate('Drawer');
    }
  });
};

export const authNotLogged = navigation => {
  token().then(res => {
    if (!res) {
      navigation.navigate('Login');
    }
  });
};
