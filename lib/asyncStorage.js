import AsyncStorage from '@react-native-community/async-storage';

export const token = async () =>
  await AsyncStorage.getItem('JwtToken').then(res => JSON.parse(res));

export const logout = navigation => {
  AsyncStorage.removeItem('JwtToken');
  authNotLogged(navigation);
};

export const authIsLogged = navigation => {
  token().then(res => {
    if (res) {
      navigation.navigate('Home');
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
