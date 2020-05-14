import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {HelperText, Button, TextInput, Text, Title} from 'react-native-paper';
import AuthValidationSchema from '~/lib/validationSchema';
import {token, authIsLogged} from '~/lib/asyncStorage';
import axios from '~/lib/axios';

const LoginScreen = ({navigation}) => {
  const [errorsForm, setErrorsForm] = useState(null);

  useEffect(() => {
    authIsLogged(navigation);
  }, [navigation]);

  const login = async values => {
    const res = await axios
      .post('/authentication_token', values)
      .then(response => JSON.stringify(response.data.token))
      .catch(error => setErrorsForm(error));
    await AsyncStorage.setItem('JwtToken', res)
      .then(() => {
        if (token) {
          navigation.navigate('Home');
        }
      })
      .catch(error => setErrorsForm(error));
  };

  const {
    errors,
    values: {email, password},
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AuthValidationSchema,
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
      <HelperText type="error" visible={errors.email}>
        {errors.email}
      </HelperText>
      <TextInput
        label="Password"
        name="password"
        value={password}
        onChangeText={handleChange('password')}
        secureTextEntry
      />
      <HelperText type="error" visible={errors.password}>
        {errors.password}
      </HelperText>
      <Button onPress={handleSubmit}>Submit</Button>
      <Button onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>No account ? Sign Up Here</Text>
      </Button>
      {errorsForm && <Text>{errorsForm}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
  },
});

export default LoginScreen;
