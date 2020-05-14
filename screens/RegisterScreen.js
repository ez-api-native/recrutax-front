import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput, Button, Text, Title} from 'react-native-paper';
import {authIsLogged, token} from '~/lib/asyncStorage';
import axios from '~/lib/axios';

const RegisterScreen = ({navigation}) => {
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    authIsLogged(navigation);
  }, []);

  const register = async values => {
    const res = await axios
      .post('/users', values)
      .catch(error => setErrors(error));
    await AsyncStorage.setItem('JwtToken', res)
      .then(() => {
        if (token) {
          navigation.navigate('Home');
        }
      })
      .catch(error => setErrors(error));
  };

  const {
    values: {email, password},
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => register(values),
  });

  return (
    <View>
      <Title>Register</Title>
      <TextInput
        label="Email"
        name="email"
        value={email}
        onChangeText={handleChange('email')}
      />
      <TextInput
        label="Password"
        name="password"
        value={password}
        onChangeText={handleChange('password')}
        secureTextEntry
      />
      <Button onPress={handleSubmit}>Submit</Button>
      <Button onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Already have an account ? Sign Up Here</Text>
      </Button>
      {errors && <Text>{errors}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
  },
});

export default RegisterScreen;
