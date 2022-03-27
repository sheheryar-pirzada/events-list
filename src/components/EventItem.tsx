import React from 'react';
import {Box, Heading, HStack, Pressable, Text, VStack} from 'native-base';
import {
  parseDateMoment,
  parseTimeMoment,
} from '../common/utils';
import {Swipeable} from 'react-native-gesture-handler';
import {setToStorage} from '../common/storage';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../navigation/utils';
import {Event} from '../types/types';

type EventItemProps = {
  item: Event;
  index: number;
  allEvents: Array<Event>;
  setEvents: Function;
  filterApplied: boolean;
};

const EventItem: React.FC<EventItemProps> = ({
  item: event,
  index,
  allEvents,
  setEvents,
  filterApplied,
}) => {
  const navigation = useNavigation();
  const {name, description, startTime, endTime, date} = event;
  const row = [];
  let prevOpenedRow;

  const getDateTimeText = (
    date: Date,
    startTime: Date,
    endTime: Date,
  ): string => {
    return `${parseDateMoment(date)} (${parseTimeMoment(
      startTime,
    )} - ${parseTimeMoment(endTime)})`;
  };

  const closeRow = indexNo => {
    if (prevOpenedRow && prevOpenedRow !== row[indexNo]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[indexNo];
  };

  const handleDeleteEvent = () => {
    const updatedEvents = allEvents.filter(item => item.key !== event.key);
    setToStorage('events', updatedEvents);
    setEvents(updatedEvents);
    closeRow(index);
  };

  const handleEditEventClick = () => {
    closeRow(index);
    navigation.navigate(routes.createEvent, {eventToEdit: event});
  };

  const rightSwipeActions = () => {
    return [
      <Pressable
        key={1}
        ml={2}
        w="16%"
        bg="red.700"
        borderRadius={12}
        alignItems="center"
        justifyContent="center"
        onPress={() => handleDeleteEvent()}>
        <Text fontWeight="bold" color="gray.300">
          Delete
        </Text>
      </Pressable>,
      <Pressable
        key={2}
        ml={2}
        w="16%"
        bg="gray.700"
        borderRadius={12}
        alignItems="center"
        justifyContent="center"
        onPress={() => handleEditEventClick()}>
        <Text fontWeight="bold" color="gray.300">
          Edit
        </Text>
      </Pressable>,
    ];
  };

  return (
    <Swipeable
      friction={2}
      useNativeAnimations
      key={event.key}
      containerStyle={{
        width: '100%',
        borderRadius: 12,
        marginVertical: '2%',
      }}
      childrenContainerStyle={{marginRight: 2}}
      ref={ref => {
        row[index] = ref;
      }}
      onSwipeableOpen={() => closeRow(index)}
      renderRightActions={rightSwipeActions}>
      <Box bg="dark.50" p={4} minH={100} maxH={200} borderRadius={12}>
        <VStack space={1}>
          <HStack justifyContent="space-between">
            <Heading fontSize="lg" color="gray.300">
              {name}
            </Heading>
            {!filterApplied && (
              <Box bg="gray.600" px={2} borderRadius={8}>
                <Text color="gray.300">{`#${event.type}`}</Text>
              </Box>
            )}
          </HStack>
          <Heading fontSize="sm" fontWeight="semibold" color="gray.400">
            {getDateTimeText(date, startTime, endTime)}
          </Heading>
          {!!description && (
            <Box mt={2}>
              <Text fontSize="md" color="gray.500">
                {description}
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </Swipeable>
  );
};

export default EventItem;
