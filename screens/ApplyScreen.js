import {useFormik} from 'formik';
import React, {useState} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import FilePickerManager from 'react-native-file-picker';
import ImagePicker from 'react-native-image-picker';
import axios from '~/lib/axios';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

const ApplyScreen = ({route, navigation}) => {
  // const {offer, submission} = route.params;
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
      email: '',
      age: '',
      address: '',
      motivation: '',
      wantedIncome: '',
    },
    onSubmit: async values => {
      const res = await axios.post('/submissions', {
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
        // offer: offer['@id'],
      });
      if (res.status === 201) {
        resetForm();
      }
    },
  });

  const handleChoosePicture = () => {
    const token = AsyncStorage.getItem('token');

    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        RNFetchBlob.fetch(
          'POST',
          'https://localhost:8443/media_objects',
          {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'file',
              filename: response.fileName,
              type: response.type,
              data: RNFetchBlob.wrap('file://' + response.path),
            },
          ],
        )
          .then(res => res.json())
          .then(result => setPicture(result['@id']))
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const handleChooseFile = async () => {
    const token = await AsyncStorage.getItem('token');
    FilePickerManager.showFilePicker(null, response => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else if (response.type !== 'application/pdf') {
        console.log('Not pdf');
      } else {
        RNFetchBlob.fetch(
          'POST',
          'https://localhost:8443/media_objects',
          {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'file',
              filename: response.fileName,
              type: response.type,
              data: RNFetchBlob.wrap('file://' + response.path),
            },
          ],
        )
          .then(res => res.json())
          .then(result => setResume(result['@id']))
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <TextInput
          label="Firstname"
          name="firstname"
          value={firstname}
          onChangeText={handleChange('firstname')}
        />
        <TextInput
          label="Lastname"
          name="lastname"
          value={lastname}
          onChangeText={handleChange('lastname')}
        />
        <TextInput
          label="Sexe"
          name="sexe"
          value={sexe}
          onChangeText={handleChange('sexe')}
        />
        <TextInput
          label="Email"
          name="email"
          value={email}
          onChangeText={handleChange('email')}
        />
        <TextInput
          label="Age"
          name="age"
          value={age}
          onChangeText={handleChange('age')}
        />
        <TextInput
          label="Address"
          name="address"
          value={address}
          onChangeText={handleChange('address')}
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
        />
        <Button onPress={handleChoosePicture}>Choose picture</Button>
        <Button onPress={handleChooseFile}>Choose resume</Button>
        <Button onPress={handleSubmit}>Submit</Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ApplyScreen;
