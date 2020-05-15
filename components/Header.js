import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Title} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Button
        icon={() => <MaterialCommunityIcons name="menu" size={36} />}
        onPress={() => navigation.openDrawer()}
        style={styles.icon}
      />
      <Title style={styles.text}>{title}</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },

  icon: {
    justifyContent: 'flex-start',
  },

  text: {
    marginLeft: 60,
    marginRight: 60,
  },
});

export default Header;
