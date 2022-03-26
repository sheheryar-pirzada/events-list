import React, {useContext} from 'react';
import {FlatList, Heading, Center} from 'native-base';
import EventItem from './EventItem';
import {EventsContext} from '../common/userContext';

const EventsList = ({events, filter}) => {
  const {events: allEvents, setEvents} = useContext(EventsContext);
  return events.length > 0 ? (
    <FlatList
      p={4}
      data={events}
      keyExtractor={({key}) => key}
      renderItem={({item, index}) => (
        <EventItem
          allEvents={allEvents}
          setEvents={setEvents}
          index={index}
          item={item}
          filterApplied={filter !== ""}
        />
      )}
      showsHorizontalScrollIndicator={false}
    />
  ) : (
    <Center h="80%" display="flex" px={4}>
      <Heading
        textAlign="center"
        fontWeight={400}>{`It looks like you don't have any events scheduled${
        filter !== '' && ` for the type "${filter}"`
      }`}</Heading>
    </Center>
  );
};

export default EventsList;
