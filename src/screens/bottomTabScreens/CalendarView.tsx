import React, {useContext, useState} from 'react';
import {AddIcon, Box, Button, Center} from 'native-base';
import {Calendar, DateData} from 'react-native-calendars';
import Header from '../../components/Header';
import moment from 'moment';
import {EventsContext} from '../../common/userContext';
import EventsList from '../../components/EventsList';
import {routes} from '../../navigation/utils';

const CalendarView = ({navigation}) => {
  const {events} = useContext(EventsContext);

  const getMarkedDates = () => {
    const markedDates = {};
    const dates = events.map(({date}) => date);
    dates.forEach(date => {
      markedDates[moment(date).format('YYYY-MM-DD')] = {
        marked: true,
        selected:
          moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'),
        selectedColor: '#164e63',
      };
    });
    return markedDates;
  };
  const formatCurrentDate = (): DateData => {
    return {
      timestamp: moment().unix(),
      dateString: moment().format('YYYY-MM-DD'),
      day: +moment().format('DD'),
      month: +moment().format('MM'),
      year: +moment().format('YYYY'),
    };
  };

  const [markedDates, setMarkedDates] = useState(getMarkedDates());
  const [selectedDay, setSelectedDay] = useState<DateData>(formatCurrentDate());

  const handleDaySelect = day => {
    let _markedDates = {...markedDates};
    if (_markedDates[day.dateString]) {
      _markedDates[day.dateString] = {
        ..._markedDates[day.dateString],
        selected: true,
        selectedColor: '#164e63',
      };
    } else {
      _markedDates[day.dateString] = {
        selected: true,
        selectedColor: '#164e63',
      };
    }
    Object.keys(_markedDates).forEach(mDay => {
      if (mDay !== day.dateString) {
        _markedDates[mDay] = {
          ..._markedDates[mDay],
          selected: false,
        };
      }
    });
    setMarkedDates(_markedDates);
    setSelectedDay(day);
  };

  return (
    <Box safeArea>
      <Header title="My Calendar View" />
      <Center my={2}>
        <Button
          w="95%"
          startIcon={<AddIcon size="4" />}
          onPress={() =>
            navigation.navigate(routes.createEvent, {eventToEdit: null})
          }>
          Create Event
        </Button>
      </Center>
      <Box p={2}>
        <Calendar
          key="calender"
          enableSwipeMonths
          markedDates={markedDates}
          style={{borderRadius: 12}}
          onDayPress={day => {
            handleDaySelect(day);
          }}
          theme={{
            monthTextColor: 'white',
            backgroundColor: '#18181b',
            calendarBackground: '#18181b',
          }}
          minDate={moment().format('YYYY-MM-DD')}
          disableAllTouchEventsForDisabledDays={false}
        />
      </Box>
      <EventsList
        filter=""
        calendarView
        events={events
          .filter(
            event =>
              moment(event.date).format('YYYY-MM-DD') ===
              selectedDay.dateString,
          )
          .sort(
            (a, b) =>
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
          )}
      />
    </Box>
  );
};

export default CalendarView;
