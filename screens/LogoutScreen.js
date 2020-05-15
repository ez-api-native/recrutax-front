import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {logout} from '~/lib/asyncStorage';

const LogoutScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button onPress={() => logout(navigation)}>Logout</Button>
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
