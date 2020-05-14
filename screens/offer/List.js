import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import axios from '~/lib/axios';
import List from '~/components/List';
import Header from '~/components/Header';

const OffersList = () => {
  const [offers, setOffers] = useState([]);
  const fetchData = async () => {
    axios.get('/offers').then(({data}) => {
      setOffers(data['hydra:member']);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Header title="Offers" />
      <Button onPress={fetchData}>
        <Text>Fetch offers</Text>
      </Button>
      <List columns={['id', 'name']} data={offers} />
    </View>
  );
};

export default OffersList;
