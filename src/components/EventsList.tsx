import React, {useContext, useEffect, useRef, useState} from 'react';
import {FlatList, Heading, Center, Box, AlertDialog, Button} from 'native-base';
import EventItem from './EventItem';
import {EventsContext} from '../common/userContext';
import {Event} from '../types/types';
import {setToStorage} from '../common/storage';

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
  const cancelRef = useRef(null);
  const {events: allEvents, setEvents} = useContext(EventsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState('');
  useEffect(() => {
    if (eventToDelete !== '') {
      setIsOpen(true);
    }
  }, [eventToDelete]);
  const onClose = () => setIsOpen(false);
  const noData = () => {
    let str = 'It looks like you dont have any events scheduled';
    if (filter !== '') {
      str += ` for the type ${filter}`;
    } else if (calendarView) {
      str += ' on that day';
    }
    return str;
  };

  const handleDeleteEvent = () => {
    const updatedEvents = allEvents.filter(item => item.key !== eventToDelete);
    setToStorage('events', updatedEvents);
    setEvents(updatedEvents);
    setEventToDelete('');
    onClose();
  };

  return events.length > 0 ? (
    <Box flex={1}>
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
            setEventToDelete={setEventToDelete}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Header>Delete Event</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to delete this event?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button
                bgColor="red.700"
                colorScheme="danger"
                onPress={handleDeleteEvent}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  ) : (
    <Center h={calendarView ? '40%' : '80%'} display="flex" px={4}>
      <Heading textAlign="center" fontWeight={400}>
        {noData()}
      </Heading>
    </Center>
  );
};

export default EventsList;
