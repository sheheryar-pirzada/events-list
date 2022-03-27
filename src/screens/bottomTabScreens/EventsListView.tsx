import React, {useContext, useState} from 'react';
import {AddIcon, Box, Button, HStack, Select} from 'native-base';
import Header from '../../components/Header';
import {routes} from '../../navigation/utils';
import {EventsContext} from '../../common/userContext';
import EventsList from '../../components/EventsList';
import {eventTypes} from '../../common/utils';
import {selectProps} from '../../common/theme';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabsParamsList} from '../../types/types';

type EventsListViewProps = BottomTabScreenProps<BottomTabsParamsList, 'Events'>;

const EventsListView: React.FC<EventsListViewProps> = ({navigation}) => {
  const {events} = useContext(EventsContext);
  const [filter, setFilter] = useState('');
  return (
    <Box safeArea flex={1}>
      <Header title="My Events Listing" />
      <HStack display="flex" justifyContent="center" space={4} p={4}>
        <Box w="48%">
          <Select
            {...selectProps}
            selectedValue={filter}
            onValueChange={type => setFilter(type)}
            placeholder="Event type">
            <Select.Item label="All" value="" key="all" />
            {eventTypes.map(eventType => (
              <Select.Item
                key={eventType}
                label={eventType}
                value={eventType}
              />
            ))}
          </Select>
        </Box>
        <Button
          w="48%"
          startIcon={<AddIcon size="4" />}
          onPress={() =>
            navigation.navigate(routes.createEvent, {eventToEdit: null})
          }>
          Create Event
        </Button>
      </HStack>
      <EventsList
        filter={filter}
        events={events
          .filter(event => filter === '' || event.type === filter)
          .sort(
            (a, b) =>
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
          )}
      />
    </Box>
  );
};

export default EventsListView;
