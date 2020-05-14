import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {logout} from '~/lib/asyncStorage';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Title style={styles.text}>{title}</Title>
      <Button onPress={() => logout(navigation)}>
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
