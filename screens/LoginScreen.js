import {useFormik} from 'formik';
import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  Colors,
  HelperText,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthValidationSchema} from '~/lib/validationSchema';
import {authIsLogged} from '~/lib/asyncStorage';
import axios from '~/lib/axios';

const LoginScreen = ({navigation}) => {
  const [errorsForm, setErrorsForm] = useState(null);

  useEffect(() => {
    authIsLogged(navigation);
  }, []);

  const {
    errors,
    values: {email, password},
    handleSubmit,
    handleChange,
    setFieldError,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AuthValidationSchema,
    onSubmit: async values => {
      try {
        const res = await axios.post('/authentication_token', values);
        if (res.status === 200) {
          await AsyncStorage.setItem(
            'JwtToken',
            JSON.stringify(res.data.token),
          );
          navigation.navigate('Offer');
        }
      } catch (e) {
        setErrorsForm('Email or password incorrect');
      }
    },
  });

  const handleResetPassword = useCallback(async () => {
    if (email) {
      await axios.post('/reset-password', {
        email,
      });
      navigation.navigate('ResetPassword');
    } else {
      setFieldError('email', 'Please fill your email');
    }
  }, [email, navigation, setFieldError]);

  return (
    <View>
      <Title style={styles.title}>Login</Title>
      <TextInput
        label="Email"
        name="email"
        value={email}
        onChangeText={handleChange('email')}
        keyboardType="email-address"
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
      <Button mode="contained" onPress={handleSubmit}>
        Submit
      </Button>
      <Button compact color={Colors.black} onPress={handleResetPassword}>
        Reset password
      </Button>
      <Button
        compact
        color={Colors.black}
        onPress={() => navigation.navigate('Register')}>
        No account ? Sign Up Here
      </Button>
      {errorsForm && <Text>{errorsForm}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default LoginScreen;
