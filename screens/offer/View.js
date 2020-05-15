import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Badge,
  Button,
  Card,
  Paragraph,
  Portal,
  Title,
} from 'react-native-paper';
import axios from '~/lib/axios';
import FABView from '~/components/offer/FABView';

const OfferCreate = ({route, navigation}) => {
  const {offer} = route.params;
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = useCallback(async () => {
    axios.get(`/offers/${offer.id}/submissions`).then(({data}) => {
      setSubmissions(data['hydra:member']);
    });
  }, [offer]);

  const handleFABActions = useCallback(
    type => {
      switch (type) {
        case 'invite':
          fetchSubmissions();
          break;
        case 'delete':
          navigation.navigate('Offer');
          break;
      }
    },
    [fetchSubmissions, navigation],
  );

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return (
    <View style={styles.view}>
      <Button
        icon={() => <MaterialCommunityIcons name="arrow-left" size={36} />}
        onPress={() => navigation.goBack()}
        style={styles.icon}
      />
      <Portal>
        <FABView offer={offer} onAction={handleFABActions} />
      </Portal>
      <Title style={styles.title}>{offer.name}</Title>
      {submissions.map(
        ({id, firstname, lastname, email, motivation, status}) => (
          <Card key={`submission-${id}`}>
            <Card.Content>
              <Title>
                {firstname || lastname ? `${firstname} ${lastname}` : email}
              </Title>
              <Paragraph>{motivation}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Badge>{status}</Badge>
            </Card.Actions>
          </Card>
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    marginTop: 5,
  },

  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  icon: {
    alignItems: 'flex-start',
  },
});

export default OfferCreate;
