import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {Button} from 'react-native-paper';
import axios from '~/lib/axios';
import List from '~/components/List';
import Header from '~/components/Header';

const OffersList = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [offers, setOffers] = useState([]);
  const fetchData = async () => {
    await axios.get('/offers').then(({data}) => {
      setOffers(data['hydra:member']);
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
            setOffers([]);
            await fetchData();
            setRefreshing(false);
          }}
        />
      }>
      <Header title="Offers" />
      <Button onPress={() => navigation.navigate('OfferCreate')}>
        Create an offer
      </Button>
      <List
        columns={['id', 'name']}
        data={offers}
        onPress={offer => navigation.navigate('OfferView', {offer})}
      />
    </ScrollView>
  );
};

export default OffersList;
