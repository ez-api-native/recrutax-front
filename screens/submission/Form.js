import {useFormik} from 'formik';
import React, {useState} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import axios from '~/lib/axios';
import Upload from '~/components/Upload';

const Form = ({route, navigation}) => {
  const {submission} = route.params;
  const [picture, setPicture] = useState(null);
  const [resume, setResume] = useState(null);

  const {
    values: {
      firstname,
      lastname,
      sexe,
      email,
      age,
      address,
      motivation,
      wantedIncome,
    },
    handleSubmit,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      sexe: '',
      age: '',
      address: '',
      motivation: '',
      wantedIncome: '',
      email: submission.email,
    },
    onSubmit: async values => {
      const res = await axios.patch(
        `/submissions/${submission.id}`,
        {
          firstname: values.firstname,
          lastname: values.lastname,
          sexe: values.sexe,
          email: values.email,
          age: parseInt(values.age, 10),
          address: values.address,
          motivation: values.motivation,
          wantedIncome: parseInt(values.wantedIncome, 10),
          picture: picture,
          resume: resume,
        },
        {
          headers: {
            'Content-Type': 'application/merge-patch+json',
          },
        },
      );
      if (res.status === 200) {
        resetForm();
        navigation.navigate('Submissions');
      }
    },
  });

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <TextInput
          label="Firstname"
          name="firstname"
          value={firstname}
          onChangeText={handleChange('firstname')}
          textContentType="givenName"
        />
        <TextInput
          label="Lastname"
          name="lastname"
          value={lastname}
          onChangeText={handleChange('lastname')}
          textContentType="familyName"
        />
        <RadioButton.Group onValueChange={handleChange('sexe')} value={sexe}>
          <RadioButton.Item label="Male" value="male" />
          <RadioButton.Item label="Female" value="female" />
        </RadioButton.Group>
        <TextInput
          label="Email"
          name="email"
          value={email}
          onChangeText={handleChange('email')}
          textContentType="email"
          keyboardType="email-address"
        />
        <TextInput
          label="Age"
          name="age"
          value={age}
          onChangeText={handleChange('age')}
          keyboardType="number-pad"
        />
        <TextInput
          label="Address"
          name="address"
          value={address}
          onChangeText={handleChange('address')}
          textContentType="addressCityAndState"
        />
        <TextInput
          label="Motivation"
          name="motivation"
          value={motivation}
          onChangeText={handleChange('motivation')}
          multiline={true}
        />
        <TextInput
          label="Wanted income"
          name="wantedIncome"
          value={wantedIncome}
          onChangeText={handleChange('wantedIncome')}
          keyboardType="number-pad"
        />
        <Upload type="images" onChange={setPicture}>
          Choose picture
        </Upload>
        <Upload type="pdf" onChange={setResume}>
          Choose resume
        </Upload>
        <Button onPress={handleSubmit}>Submit</Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Form;
