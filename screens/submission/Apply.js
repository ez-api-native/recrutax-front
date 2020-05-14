import React, {useState} from 'react';
import {View} from 'react-native';
import {useFormik} from 'formik';
import axios from '~/lib/axios';
import {Button, Card, TextInput, Title} from 'react-native-paper';

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
          </Card.Actions>
        </Card>
      )}
    </View>
  );
};

export default Apply;
