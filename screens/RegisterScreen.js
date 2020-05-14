import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput, Button, Text, Title, RadioButton} from 'react-native-paper';
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
    values: {email, password, roles},
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      roles: '',
    },
    onSubmit: register,
  });

  return (
    <View>
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
      <RadioButton.Group onValueChange={handleChange('roles')} value={roles}>
        <RadioButton.Item label="Candidate" value="candidate" />
        <RadioButton.Item label="Recruiter" value="recruiter" />
      </RadioButton.Group>
      <Button onPress={handleSubmit}>Submit</Button>
      <Button onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Already have an account ? SignIn Here</Text>
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
