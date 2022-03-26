import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateEvent from '../screens/createEventScreens/CreateEvent';
import BottomTabs from './BottomTabs';
import {routes} from './utils';
import {getFromStorage} from '../common/storage';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={routes.main}
        component={BottomTabs}
      />
      <Stack.Screen
        name={routes.createEvent}
        component={CreateEvent}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
