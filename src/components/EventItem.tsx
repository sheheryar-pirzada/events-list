import React from 'react';
import {Box, Heading, HStack, Text, VStack} from 'native-base';
import {formatDate, parseDate, parseTime} from '../common/utils';

const EventItem = ({item: event}) => {
  const {name, description, startTime, endTime, date} = event;
  const getDateTimeText = (
    date: Date,
    startTime: Date,
    endTime: Date,
  ): string => {
    return `${formatDate(new Date(date))} from ${parseTime(
      new Date(startTime),
    )} - ${parseTime(new Date(endTime))}`;
  };

  return (
    <Box bg="dark.50" p={4} minH={100} maxH={200} mb={4} borderRadius={12}>
      <VStack space={1}>
        <HStack>
          <Heading fontSize="lg" color="gray.300">
            {name}
          </Heading>
        </HStack>
        <Heading fontSize="sm" fontWeight="semibold" color="gray.400">
          {getDateTimeText(date.selected, startTime, endTime)}
        </Heading>
        <Box mt={2}>
          <Text fontSize="md" color="gray.500">
            {description}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default EventItem;
