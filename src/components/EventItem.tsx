import React from 'react';
import {
  Box,
  Center,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {formatDate, parseTime} from '../common/utils';
import {Swipeable} from 'react-native-gesture-handler';
import {setToStorage} from '../common/storage';

const EventItem = ({item: event, index, allEvents, setEvents}) => {
  const {name, description, startTime, endTime, date} = event;
  const row = [];
  let prevOpenedRow;

  const getDateTimeText = (
    date: Date,
    startTime: Date,
    endTime: Date,
  ): string => {
    return `${formatDate(new Date(date))} from ${parseTime(
      new Date(startTime),
    )} - ${parseTime(new Date(endTime))}`;
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
        justifyContent="center">
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
          <HStack>
            <Heading fontSize="lg" color="gray.300">
              {name}
            </Heading>
          </HStack>
          <Heading fontSize="sm" fontWeight="semibold" color="gray.400">
            {getDateTimeText(date, startTime, endTime)}
          </Heading>
          <Box mt={2}>
            <Text fontSize="md" color="gray.500">
              {description}
            </Text>
          </Box>
        </VStack>
      </Box>
    </Swipeable>
  );
};

export default EventItem;
