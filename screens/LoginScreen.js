import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, TextInput, Text, Title} from 'react-native-paper';
import {token, authIsLogged} from '~/lib/asyncStorage';
import axios from '~/lib/axios';

const LoginScreen = ({navigation}) => {
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    authIsLogged(navigation);
  }, []);

  const login = async values => {
    const res = await axios
      .post('/authentication_token', values)
      .then(response => JSON.stringify(response.data.token))
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
    onSubmit: values => login(values),
  });

  return (
    <View>
      <Title>Login</Title>
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
      <Button onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>No account ? Sign Up Here</Text>
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

export default LoginScreen;
