import React from 'react';
import {Text} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalendarView from '../screens/bottomTabScreens/CalendarView';
import EventsListView from '../screens/bottomTabScreens/EventsListView';
import {routes} from './utils';

const Tab = createBottomTabNavigator();
const screenOptions = ({route}) => ({
  tabBarStyle: {
    padding: '4%',
    height: '10%',
    borderTopWidth: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#171717',
  },
  headerShown: false,
  tabBarShowLabel: true,
  tabBarActiveTintColor: '#d4d4d4',
  tabBarHideOnKeyboard: true,
  tabBarIcon: () => null,
  tabBarLabel: ({color}) => (
    <Text fontSize="lg" fontWeight="semibold" color={color}>
      {route.name}
    </Text>
  ),
  tabBarLabelPosition: 'beside-icon',
});

const BottomTabs = () => {
  const {
    tabs: {eventsList, calendarView},
  } = routes;

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={eventsList}
        key={eventsList}
        component={EventsListView}
      />
      <Tab.Screen
        name={calendarView}
        key={calendarView}
        component={CalendarView}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
