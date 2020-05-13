import {useFormik} from 'formik';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';

const LoginScreen = ({navigation}) => {
  const login = values => console.log(values);

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
        <Button onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text}>
            Already have an account ? Sign Up Here
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
  },
});

export default LoginScreen;
