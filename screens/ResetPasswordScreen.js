import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, TextInput, Text, Title} from 'react-native-paper';
import {token, authIsLogged} from '~/lib/asyncStorage';
import axios from '~/lib/axios';

const ResetPasswordScreen = ({navigation}) => {
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
    values: {code, oldPassword, password, passwordRepeat},
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      code: '',
      oldPassword: '',
      password: '',
      passwordRepeat: '',
    },
    onSubmit: async values => {
      await axios.post('/check-reset-password-token', {
        token: values.code,
      });
      // Add reset password call
    },
  });

  return (
    <View>
      <Title>Reset your password</Title>
      <TextInput
        label="Code"
        value={code}
        onChangeText={handleChange('code')}
      />
      <TextInput
        label="Old Password"
        value={oldPassword}
        onChangeText={handleChange('oldPassword')}
        secureTextEntry
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={handleChange('password')}
        secureTextEntry
      />
      <TextInput
        label="Password Repeat"
        value={passwordRepeat}
        onChangeText={handleChange('passwordRepeat')}
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

export default ResetPasswordScreen;
