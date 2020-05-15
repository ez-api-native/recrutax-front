import React, {useState} from 'react';
import {View} from 'react-native';
import {useFormik} from 'formik';
import {Button, Card, TextInput, Title} from 'react-native-paper';
import axios from '~/lib/axios';
import Header from '~/components/Header';

const Apply = ({navigation}) => {
  const [submission, setSubmission] = useState(null);

  const {
    values: {code},
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: async values => {
      const res = await axios.get(`/submission-by-token/${values.code}`);
      if (res.status === 200) {
        setSubmission(res.data);
      }
    },
  });

  return (
    <View>
      <Header title="Apply a Code" />
      <TextInput
        label="Code"
        value={code}
        onChangeText={handleChange('code')}
      />
      <Button onPress={handleSubmit}>Search</Button>
      {submission && (
        <Card>
          <Card.Content>
            <Title>{submission.offer}</Title>
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() =>
                navigation.navigate('ApplyForm', {
                  submission,
                })
              }>
              Apply
            </Button>
            <Button
              onPress={() =>
                axios.patch(
                  `/submissions/${submission.id}`,
                  {
                    status: 'refused',
                  },
                  {
                    headers: {
                      'Content-Type': 'application/merge-patch+json',
                    },
                  },
                )
              }>
              Refuse
            </Button>
          </Card.Actions>
        </Card>
      )}
    </View>
  );
};

export default Apply;
