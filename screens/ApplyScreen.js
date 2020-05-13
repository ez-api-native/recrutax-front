import {useFormik} from 'formik';
import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {TextInput, Button, Avatar, Text} from 'react-native-paper';
import FilePickerManager from 'react-native-file-picker';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const ApplyScreen = ({navigation}) => {
  const apply = values => console.log(values);
  const [picture, setPicture] = useState(null);
  const [cv, setCV] = useState(null);

  const {
    values: {
      firstname,
      lastname,
      sexe,
      email,
      age,
      address,
      motivation,
      salaryClaim,
    },
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      sexe: '',
      email: '',
      age: '',
      address: '',
      motivation: '',
      salaryClaim: '',
      cv: '',
    },
    onSubmit: values =>
      apply({...values, picture: picture.fileName, cv: cv.fileName}),
  });

  const handleChoosePicture = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setPicture(response);
      }
    });
  };

  const handleChooseFile = () => {
    FilePickerManager.showFilePicker(null, response => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else if (response.type !== 'application/pdf') {
        console.log('Not pdf');
      } else {
        const headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append(
          'Authorization',
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODk0NDgxMTUsImV4cCI6MTU4OTQ1MTcxNSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZmlyZW5haWtAZ21haWwuY29tIn0.dzMNvhDFUohU6z8x7cxNjbLobXwA_L33PdZX-IXmG4nAlilGVheVS9xMuOVe-sjNENvdLOUr5pyqryn7QxXDq1Nt7NYwLtUAhHTDQgmrCUi6VONb7MTlbiWGBMmmhAukccoTtL-BJDiZuhn0uqwW7EIDPuVjwBagIFUA0rrJNEs3hrbcLBoRzh4JjsNLpky_eepFKqV8DbvP67Y42j6_sSAoe56Z-HIx4seTVO6oMDGiU950uLPQw7ARddnUY4PK6saVzzWHoZiZsJgbY4CSqbDk6ImTEDKMZ-g1JF5vs3VDkYKasJrGYeBUagf8wfN8WgpQRjSVmosHhDiAdK-rdR22Kn2tj0swwWX34zCxqf0xTddFWmqopoOBP98i8QyGW_83FKQrkEZ4_rC6mya-cvw_c8e_RtpdR3DXEvyuC1mpdT0yDjZ24n2lqooZMZ3yEPGF515VHbCmRM1Xpihy8PS6rTkoQ4LWimyzRFIhFIAtISI-DTegWmf1rWClLV1psB_f0n1756sp2P105v-TSWskbuRSR0V9E46sj5gwaI4MUFgubO8JTs6J7fd78EsdIYjSY3HVkFgpO9c4yDaXz8CfnHZaKw7SYsZhS9MKMIbRba_K64JiivuqKqptySC9APNnM8gRdnA7F8U4QGuZFxTVD4fOwAO59kDDdWWse6Y',
        );
        const formdata = new FormData();
        formdata.append('file', {
          uri: 'file://' + response.uri,
          name: response.fileName,
          type: response.type,
        });
        axios
          .post('https://localhost:8443/media_objects', formdata, {
            headers,
          })
          .then(res => res.text())
          .then(result => console.log('result', result))
          .catch(error => console.log(JSON.stringify(error)));

        setCV(response);
      }
    });
  };

  return (
    <View>
      <View>
        {/* <TextInput
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
        {picture && (
          <Image
            source={{
              uri: 'file://' + picture.uri,
            }}
          />
        )}
        <Button onPress={handleChoosePicture}>Choose picture</Button>
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
          label="Salary claim"
          name="salaryClaim"
          value={salaryClaim}
          onChangeText={handleChange('salaryClaim')}
        /> */}
        <Button onPress={handleChooseFile}>Choose CV</Button>
        {cv && <Text>{cv.fileName}</Text>}
        <Button onPress={handleSubmit}>Submit</Button>
      </View>
    </View>
  );
};

export default ApplyScreen;
