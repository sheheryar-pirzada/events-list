import React, {useContext, useState} from 'react';
import {
  Box,
  Button,
  HStack,
  Input,
  Select,
  TextArea,
  VStack,
} from 'native-base';
import DatePicker from 'react-native-date-picker';
import Header from '../../components/Header';
import {setToStorage} from '../../common/storage';
import {routes} from '../../navigation/utils';
import {EventsContext} from '../../common/userContext';
import {formatDate, parseDate, parseTime} from '../../common/utils';

interface IDatePickerContext {
  open: boolean;
  type: 'date' | 'datetime' | 'time';
  form: string;
}

const CreateEvent = ({navigation, route}) => {
  const {events, setEvents} = useContext(EventsContext);
  const {eventToEdit} = route.params;
  console.log(eventToEdit);
  const isEdit = !!eventToEdit ?? false;
  const [name, setName] = useState<string>(eventToEdit?.name ?? '');
  const [description, setDescription] = useState<string>(
    eventToEdit?.description ?? '',
  );
  const [type, setType] = useState<string>(eventToEdit?.type ?? '');
  const [date, setDate] = useState({
    selected: eventToEdit?.date ?? new Date(),
    show: !!eventToEdit?.date,
  });
  const [startTime, setStartTime] = useState<null | Date>(
    eventToEdit?.startTime ?? null,
  );
  const [endTime, setEndTime] = useState<null | Date>(
    eventToEdit?.endTime ?? null,
  );
  const [datePickerContext, setDatePickerContext] =
    useState<IDatePickerContext>({
      open: false,
      type: 'date',
      form: 'date',
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
    backgroundColor: 'transparent',
  };

  const isDisabled = [name, date.selected, startTime, endTime, type].some(
    item => !item,
  );

  const handleCreateEvent = () => {
    const key = new Date().valueOf().toString();
    const event = {
      key,
      name,
      type,
      endTime,
      startTime,
      description,
      date: date.selected,
    };
    let updatedEvents = [...events];
    if (isEdit) {
      const updateIndex = events.findIndex(
        item => item.key === eventToEdit.key,
      );
      updatedEvents[updateIndex] = event;
    } else {
      updatedEvents.push(event);
    }
    setToStorage('events', updatedEvents).then(isSet => {
      if (isSet) {
        console.log('Event Set');
        setEvents(updatedEvents);
        navigation.navigate(routes.tabs.eventsList);
      }
    });
  };

  const getDatePickerDate = () => {
    switch (datePickerContext.form) {
      case 'date':
        return date.selected;
      case 'start':
        return startTime;
        break;
      case 'end':
        return endTime;
    }
  };

  return (
    <Box safeArea>
      <Header title="New Event" />
      <VStack px={6} mt={8} space={6}>
        <Input
          p={4}
          fontSize="md"
          placeholder="Name"
          value={name}
          onChangeText={val => setName(val)}
        />
        <TextArea
          p={4}
          h={40}
          value={description}
          fontSize="md"
          placeholder="Description"
          onChangeText={val => setDescription(val)}
        />
        <Select
          borderRadius={12}
          h={50}
          p={4}
          fontSize="md"
          selectedValue={type}
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
          }}
          onValueChange={type => setType(type)}>
          <Select.Item label="Event" value="event" />
          <Select.Item label="Out of office" value="Out of office" />
          <Select.Item label="Task" value="Task" />
        </Select>
        <Button
          {...outlineButtonProps}
          onPress={() =>
            setDatePickerContext({open: true, type: 'date', form: 'date'})
          }>
          {date.show ? formatDate(new Date(date.selected)) : 'Select a Date'}
        </Button>
        <HStack display="flex" justifyContent="space-between">
          <Button
            {...outlineButtonProps}
            w="48%"
            onPress={() =>
              setDatePickerContext({open: true, type: 'time', form: 'start'})
            }>
            {startTime ? parseTime(new Date(startTime)) : 'Start Time'}
          </Button>
          <Button
            {...outlineButtonProps}
            w="48%"
            onPress={() =>
              setDatePickerContext({open: true, type: 'time', form: 'end'})
            }>
            {endTime ? parseTime(new Date(endTime)) : 'End Time'}
          </Button>
        </HStack>
        <Button
          variant="outline"
          bg="gray.800"
          borderWidth={0}
          _text={{color: 'gray.300'}}
          onPress={() => navigation.goBack()}>
          Cancel
        </Button>
        <Button isDisabled={isDisabled} onPress={handleCreateEvent}>
          {isEdit ? 'Update Event' : 'Create Event'}
        </Button>
      </VStack>
      <DatePicker
        mode={datePickerContext.type}
        modal={true}
        open={datePickerContext.open}
        date={new Date(getDatePickerDate())}
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
        minimumDate={new Date()}
      />
    </Box>
  );
};

export default CreateEvent;
