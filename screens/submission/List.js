import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {Button} from 'react-native-paper';
import axios from '~/lib/axios';
import List from '~/components/List';
import Header from '~/components/Header';

const SubmissionsList = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const fetchData = async () => {
    await axios.get('/submissions').then(({data}) => {
      setSubmissions(data['hydra:member']);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            setSubmissions([]);
            await fetchData();
            setRefreshing(false);
          }}
        />
      }>
      <Header title="Submissions" />
      <List
        columns={['id', 'name']}
        data={submissions}
        // onPress={submission => navigation.navigate('SubmissionView', {submission})}
      />
    </ScrollView>
  );
};

export default SubmissionsList;
