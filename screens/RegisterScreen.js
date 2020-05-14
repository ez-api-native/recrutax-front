import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {authIsLogged} from '~/lib/asyncStorage';
import axios from '~/lib/axios';

const RegisterScreen = ({navigation}) => {
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    authIsLogged(navigation);
  }, []);

  const register = async values =>
    await axios
      .post('/users', values)
      .then(response => console.log('Connected', response))
      .catch(error => setErrors(error));

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
        <Button onPress={handleSubmit}>Submit</Button>
        <Button onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>No account ? Sign Up Here</Text>
        </Button>
        {errors && <Text>{errors}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
  },
});

export default RegisterScreen;
