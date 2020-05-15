import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {logout} from '~/lib/asyncStorage';

const LogoutScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button onPress={logout(navigation)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LogoutScreen;
