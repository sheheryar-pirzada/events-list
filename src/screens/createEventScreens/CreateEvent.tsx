import React, {useState} from 'react';
import {Box, Button, HStack, Input, TextArea, VStack} from 'native-base';
import DatePicker from 'react-native-date-picker';
import Header from '../../components/Header';

interface IDatePickerContext {
  open: boolean;
  type: 'date' | 'datetime' | 'time';
  form: string;
}

const CreateEvent = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState({selected: new Date(), show: false});
  const [startTime, setStartTime] = useState<null | Date>(null);
  const [endTime, setEndTime] = useState<null | Date>(null);
  const [attachment, setAttachment] = useState<string>('');
  const [datePickerContext, setDatePickerContext] =
    useState<IDatePickerContext>({
      open: false,
      type: 'date',
      form: 'date',
    });

  const parseDate = date => date.toISOString().split('T')[0];
  const parseTime = time =>
    time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  const handleDateConfirm = date => {
    switch (datePickerContext.form) {
      case 'date':
        setDate({selected: date, show: true});
        break;
      case 'start':
        setStartTime(date);
        break;
      case 'end':
        setEndTime(date);
        break;
    }
    setDatePickerContext({open: false, type: 'date', form: 'date'});
  };

  const handleDateCancel = () => {
    setDatePickerContext({open: false, type: 'date', form: 'date'});
  };

  const outlineButtonProps = {
    variant: 'outline',
    borderColor: 'trueGray.300',
    _text: {color: 'trueGray.300'},
  };

  const isDisabled = [
    name,
    description,
    date.selected,
    startTime,
    endTime,
  ].some(item => !item);

  return (
    <Box safeArea>
      <Header title="New Event" />
      <VStack px={6} mt={8} space={6}>
        <Input
          p={4}
          fontSize="md"
          placeholder="Name"
          onChangeText={val => setName(val)}
        />
        <TextArea
          p={4}
          h={40}
          fontSize="md"
          placeholder="Description"
          onChangeText={val => setDescription(val)}
        />
        <Button
          {...outlineButtonProps}
          onPress={() =>
            setDatePickerContext({open: true, type: 'date', form: 'date'})
          }>
          {date.show ? parseDate(date.selected) : 'Select a Date'}
        </Button>
        <HStack display="flex" justifyContent="space-between">
          <Button
            {...outlineButtonProps}
            w="48%"
            onPress={() =>
              setDatePickerContext({open: true, type: 'time', form: 'start'})
            }>
            {startTime ? parseTime(startTime) : 'Start Time'}
          </Button>
          <Button
            {...outlineButtonProps}
            w="48%"
            onPress={() =>
              setDatePickerContext({open: true, type: 'time', form: 'end'})
            }>
            {endTime ? parseTime(endTime) : 'End Time'}
          </Button>
        </HStack>
        <Button isDisabled={isDisabled}>Create Event</Button>
      </VStack>
      <DatePicker
        mode={datePickerContext.type}
        modal={true}
        open={datePickerContext.open}
        date={date.selected}
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />
    </Box>
  );
};

export default CreateEvent;
