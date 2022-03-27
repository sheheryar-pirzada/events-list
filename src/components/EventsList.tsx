import React, {useContext} from 'react';
import {FlatList, Heading, Center} from 'native-base';
import EventItem from './EventItem';
import {EventsContext} from '../common/userContext';
import {Event} from '../types/types';

type EventsListProps = {
  events: Array<Event>;
  filter: string;
  calendarView?: boolean;
};

const EventsList: React.FC<EventsListProps> = ({
  events,
  filter,
  calendarView = false,
}) => {
  const {events: allEvents, setEvents} = useContext(EventsContext);
  const noData = () => {
    let str = 'It looks like you dont have any events scheduled';
    if (filter !== '') {
      str += ` for the type ${filter}`;
    } else if (calendarView) {
      str += ' on that day';
    }
    return str;
  };
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
          filterApplied={filter !== ''}
        />
      )}
      showsHorizontalScrollIndicator={false}
    />
  ) : (
    <Center h={calendarView ? '40%' : '80%'} display="flex" px={4}>
      <Heading textAlign="center" fontWeight={400}>
        {noData()}
      </Heading>
    </Center>
  );
};

export default EventsList;
