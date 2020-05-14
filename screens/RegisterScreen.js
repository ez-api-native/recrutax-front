import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput, Button, Text, Title, RadioButton, HelperText} from 'react-native-paper';
import AuthValidationSchema from '~/lib/validationSchema';
import {authIsLogged, token} from '~/lib/asyncStorage';
import axios from '~/lib/axios';

const RegisterScreen = ({navigation}) => {
  const [errorsForm, setErrorsForm] = useState(null);

  useEffect(() => {
    authIsLogged(navigation);
  }, []);

  const register = async values => {
    const res = await axios
      .post('/users', values)
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
      roles: '',
    },
    validationSchema: AuthValidationSchema,
    onSubmit: values => register(values),
  });

  return (
    <View>
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
      <RadioButton.Group onValueChange={handleChange('roles')} value={roles}>
        <RadioButton.Item label="Candidate" value="candidate" />
        <RadioButton.Item label="Recruiter" value="recruiter" />
      </RadioButton.Group>
      <HelperText type="error" visible={errors.roles}>
        {errors.roles}
      </HelperText>
      <Button onPress={handleSubmit}>Submit</Button>
      <Button onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Already have an account ? SignIn Here</Text>
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

export default RegisterScreen;
