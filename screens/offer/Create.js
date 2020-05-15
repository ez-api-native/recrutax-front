import React from 'react';
import {ScrollView, KeyboardAvoidingView} from 'react-native';
import {useFormik} from 'formik';
import {Button, Title, TextInput, HelperText} from 'react-native-paper';
import DateInput from '~/components/DateInput';
import Header from '~/components/Header';
import {OfferValidationSchema} from '~/lib/validationSchema';
import axios from '~/lib/axios';

const OfferCreate = ({navigation}) => {
  const {
    errors,
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
    validationSchema: OfferValidationSchema,
    onSubmit: async values => {
      const res = await axios.post('/offers', values);
      if (res.status === 201) {
        navigation.navigate('Offer');
      }
    },
  });

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <Header title="Create an Offer" />
        <TextInput
          label="Name"
          value={name}
          onChangeText={handleChange('name')}
        />
        <HelperText type="error" visible={errors.name}>
          {errors.name}
        </HelperText>
        <TextInput
          label="Company description"
          value={companyDescription}
          onChangeText={handleChange('companyDescription')}
        />
        <HelperText type="error" visible={errors.companyDescription}>
          {errors.companyDescription}
        </HelperText>
        <TextInput
          label="Offer description"
          value={offerDescription}
          onChangeText={handleChange('offerDescription')}
        />
        <HelperText type="error" visible={errors.offerDescription}>
          {errors.offerDescription}
        </HelperText>
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
        <HelperText type="error" visible={errors.contractType}>
          {errors.contractType}
        </HelperText>
        <TextInput
          label="Place"
          value={place}
          onChangeText={handleChange('place')}
        />
        <HelperText type="error" visible={errors.place}>
          {errors.place}
        </HelperText>
        <Button mode="contained" onPress={handleSubmit}>
          Create
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default OfferCreate;
