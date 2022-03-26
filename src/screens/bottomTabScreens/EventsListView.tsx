import React, {useContext, useState} from 'react';
import {
  AddIcon,
  Box,
  Button,
  HStack,
  ScrollView,
  Select,
  Text,
  VStack,
} from 'native-base';
import Header from '../../components/Header';
import {routes} from '../../navigation/utils';
import {EventsContext} from '../../common/userContext';
import EventsList from '../../components/EventsList';

const EventsListView = ({navigation}) => {
  const {events} = useContext(EventsContext);
  const [filter, setFilter] = useState('');
  return (
    <Box safeArea>
      <Header title="My Events Listing" />
      <HStack display="flex" justifyContent="center" space={4} p={4}>
        <Box w="48%">
          <Select
            borderRadius={12}
            h={50}
            p={4}
            fontSize="md"
            selectedValue={filter}
            onValueChange={type => setFilter(type)}
            _actionSheetContent={{
              backgroundColor: 'gray.900',
            }}
            placeholder="Event type"
            _item={{
              p: 4,
              _text: {color: 'gray.100'},
              backgroundColor: 'transparent',
            }}
            _selectedItem={{
              bg: 'gray.300',
              _text: {color: 'gray.900'},
            }}>
            <Select.Item label="All" value="" />
            <Select.Item label="Event" value="event" />
            <Select.Item label="Out of office" value="Out of office" />
            <Select.Item label="Task" value="Task" />
          </Select>
        </Box>
        <Button
          w="48%"
          startIcon={<AddIcon size="4" />}
          onPress={() => navigation.navigate(routes.createEvent)}>
          Create Event
        </Button>
      </HStack>
      <EventsList
        filter={filter}
        events={events.filter(event => filter === '' || event.type === filter)}
      />
    </Box>
  );
};

export default EventsListView;