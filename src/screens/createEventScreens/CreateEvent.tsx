import React, {useContext, useRef, useState} from 'react';
import {
  Box,
  Button,
  HStack,
  IInputProps,
  Input,
  KeyboardAvoidingView,
  Select,
  TextArea,
  VStack,
} from 'native-base';
import DatePicker from 'react-native-date-picker';
import Header from '../../components/Header';
import {setToStorage} from '../../common/storage';
import {EventsContext} from '../../common/userContext';
import {
  eventTypes,
  isDateToday,
  parseDateMoment,
  parseTimeMoment,
} from '../../common/utils';
import {DatePickerContext, RootStackParamList} from '../../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Notifications from '../../common/Notifications';
import moment from 'moment';
import {outlineButtonProps, selectProps} from '../../common/theme';
import {Platform} from 'react-native';

type CreateEventProps = NativeStackScreenProps<
  RootStackParamList,
  'Create Event'
>;

const CreateEvent: React.FC<CreateEventProps> = ({navigation, route}) => {
  const {events, setEvents} = useContext(EventsContext);
  const {eventToEdit} = route.params;
  const isEdit = !!eventToEdit ?? false;
  const nameRef = useRef(null);
  const desRef = useRef(null);
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
  const [datePickerContext, setDatePickerContext] = useState<DatePickerContext>(
    {
      open: false,
      type: 'date',
      form: 'date',
    },
  );

  const handleDateConfirm = (date: Date) => {
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
      const updateIndex = events?.findIndex(
        item => item.key === eventToEdit?.key,
      );
      updateIndex !== -1 && (updatedEvents[updateIndex] = event);
    } else {
      updatedEvents.push(event);
    }
    setToStorage('events', updatedEvents).then(isSet => {
      if (isSet) {
        setEvents(updatedEvents);
        navigation.goBack();
      }
    });
    const nTime = moment(startTime).subtract(10, 'minutes');
    Notifications.scheduleNotification(nTime, name, description);
  };

  const getDatePickerDate = (): string | Date => {
    switch (datePickerContext.form) {
      case 'date':
        return date.selected;
      case 'start':
        return startTime;
      case 'end':
        return endTime;
    }
    return '';
  };

  const getMinDate = (): Date => {
    if (isDateToday(date.selected)) {
      return new Date(date.selected);
    } else {
      return new Date(new Date().toDateString().split('T')[0]);
    }
  };

  return (
    <Box safeArea>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Header title="New Event" />
        <VStack px={6} mt={8} space={6}>
          <Input
            p={4}
            ref={nameRef}
            returnKeyType="next"
            blurOnSubmit={false}
            selectTextOnFocus={false}
            onSubmitEditing={() => desRef?.current?.focus()}
            value={name}
            fontSize="md"
            placeholder="Name"
            onChangeText={val => setName(val)}
          />
          <TextArea
            p={4}
            h={40}
            ref={desRef}
            returnKeyType="done"
            selectTextOnFocus={false}
            fontSize="md"
            value={description}
            placeholder="Description"
            onChangeText={val => setDescription(val)}
          />
          <Select
            {...selectProps}
            selectedValue={type}
            placeholder="Event type"
            onValueChange={type => setType(type)}>
            {eventTypes.map(eventType => (
              <Select.Item
                key={eventType}
                label={eventType}
                value={eventType}
              />
            ))}
          </Select>
          <Button
            {...outlineButtonProps}
            onPress={() =>
              setDatePickerContext({open: true, type: 'date', form: 'date'})
            }>
            {date.show ? parseDateMoment(date.selected) : 'Select a Date'}
          </Button>
          <HStack display="flex" justifyContent="space-between">
            <Button
              {...outlineButtonProps}
              w="48%"
              onPress={() =>
                setDatePickerContext({open: true, type: 'time', form: 'start'})
              }>
              {startTime ? parseTimeMoment(startTime) : 'Start Time'}
            </Button>
            <Button
              {...outlineButtonProps}
              w="48%"
              onPress={() =>
                setDatePickerContext({open: true, type: 'time', form: 'end'})
              }>
              {endTime ? parseTimeMoment(endTime) : 'End Time'}
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
      </KeyboardAvoidingView>
      <DatePicker
        modal={true}
        onCancel={handleDateCancel}
        mode={datePickerContext.type}
        open={datePickerContext.open}
        onConfirm={handleDateConfirm}
        date={new Date(getDatePickerDate())}
        minimumDate={
          isDateToday(date.selected)
            ? new Date()
            : new Date(new Date().toDateString().split('T')[0])
        }
      />
    </Box>
  );
};

export default CreateEvent;
