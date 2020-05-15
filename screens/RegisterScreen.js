import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Colors,
  HelperText,
  RadioButton,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthValidationSchema} from '~/lib/validationSchema';
import {authIsLogged} from '~/lib/asyncStorage';
import axios from '~/lib/axios';

const RegisterScreen = ({navigation}) => {
  const [errorsForm, setErrorsForm] = useState(null);

  useEffect(() => {
    authIsLogged(navigation);
  }, []);

  const {
    errors,
    values: {email, password, roles},
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      roles: '',
    },
    validationSchema: AuthValidationSchema,
    onSubmit: async values => {
      try {
        const res = await axios.post('/users', values);
        axios
          .post('/authentication_token', {
            email: res.data.email,
            password: res.data.password,
          })
          .then(async r => {
            if (r.status === 200) {
              await AsyncStorage.setItem(
                'JwtToken',
                JSON.stringify(r.data.token),
              );
              navigation.navigate('Home');
            }
          });
        navigation.navigate('Home');
      } catch (e) {
        setErrorsForm(e);
      }
    },
  });

  return (
    <View>
      <Title style={styles.title}>Register</Title>
      <TextInput
        label="Email"
        name="email"
        value={email}
        onChangeText={handleChange('email')}
        keyboardType="email-address"
        textContentType="email"
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
        textContentType="newPassword"
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
      <Button mode="contained" onPress={handleSubmit}>
        Register
      </Button>
      <Button
        compact
        color={Colors.black}
        onPress={() => navigation.navigate('Login')}>
        Already have an account ? SignIn Here
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

export default RegisterScreen;
