import React from 'react';
import {View} from 'react-native';
import {useFormik} from 'formik';
import {Button, TextInput} from 'react-native-paper';
import axios from '~/lib/axios';
import DateInput from '~/components/DateInput';

const OfferCreate = ({navigation}) => {
  const {
    values: {
      name,
      companyDescription,
      offerDescription,
      startDate,
      contractType,
      place,
    },
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      name: '',
      companyDescription: '',
      offerDescription: '',
      startDate: new Date(),
      contractType: '',
      place: '',
    },
    onSubmit: async values => {
      const res = await axios.post('/offers', values);
      if (res.status === 201) {
        navigation.navigate('Offer');
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Name"
        value={name}
        onChangeText={handleChange('name')}
      />
      <TextInput
        label="Company description"
        value={companyDescription}
        onChangeText={handleChange('companyDescription')}
      />
      <TextInput
        label="Offer description"
        value={offerDescription}
        onChangeText={handleChange('offerDescription')}
      />
      <DateInput
        label="Start date"
        value={startDate}
        onChange={date => {
          setFieldValue('startDate', date);
          setFieldTouched('startDate', true);
        }}
      />
      <TextInput
        label="Contract type"
        value={contractType}
        onChangeText={handleChange('contractType')}
      />
      <TextInput
        label="Place"
        value={place}
        onChangeText={handleChange('place')}
      />
      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  );
};

export default OfferCreate;
