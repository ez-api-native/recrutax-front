import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {Button} from 'react-native-paper';
import axios from '~/lib/axios';
import List from '~/components/List';
import Header from '~/components/Header';
import getRole from '~/lib/JWTDecoder';

const OffersList = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [role, setRole] = useState('');
  const [offers, setOffers] = useState([]);
  const fetchData = async () => {
    await axios.get('/offers').then(({data}) => {
      setOffers(data['hydra:member']);
    });
  };
  const getUserRole = async () => {
    setRole(await getRole());
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      fetchData();
      getUserRole();
    });
    navigation.addListener('blur', () => {
      setOffers([]);
      setRole(null);
    });
  }, [navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            setOffers([]);
            await fetchData();
            setRefreshing(false);
          }}
        />
      }>
      <Header title="Offers" />
      {role === 'recruiter' && (
        <Button
          mode="contained"
          onPress={() => navigation.navigate('OfferCreate')}>
          Create an offer
        </Button>
      )}
      <List
        columns={['id', 'name']}
        data={offers}
        onPress={offer => navigation.navigate('OfferView', {offer})}
      />
    </ScrollView>
  );
};

export default OffersList;
