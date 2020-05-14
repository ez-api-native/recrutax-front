import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Badge, Card, Paragraph, Portal, Title} from 'react-native-paper';
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
    <View>
      <Portal>
        <FABView offer={offer} onAction={handleFABActions} />
      </Portal>
      <Title>{offer.name}</Title>
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

export default OfferCreate;
