import React from 'react';
import {Box, Button, Text} from 'native-base';
import Header from '../../components/Header';
import { routes } from '../../navigation/utils';

const EventsListView = ({ navigation }) => {
  return (
    <Box safeArea>
      <Header title="My Events Listing" />
      <Button onPress={() => navigation.navigate(routes.createEvent)}>Create Event</Button>
    </Box>
  );
};

export default EventsListView;
