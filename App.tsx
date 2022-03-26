import React, {useEffect, useState, createContext} from 'react';
import type {ReactNode} from 'react';
import {NativeBaseProvider} from 'native-base';
import RootStack from './src/navigation/RootStack';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './src/common/theme';
import {getFromStorage} from './src/common/storage';
import {EventsContext} from './src/common/userContext';

const App: () => ReactNode = () => {
  const [events, setEvents] = useState<any>([]);
  useEffect(() => {
    getFromStorage('events').then(data => {
      if (data) {
        {
          if (Array.isArray(data) && data.length > events.length) {
            setEvents(data);
          }
        }
      }
    });
  }, [events.length]);
  return (
    <NativeBaseProvider theme={theme}>
      <EventsContext.Provider value={{events, setEvents}}>
        <NavigationContainer theme={DarkTheme}>
          <SafeAreaProvider>
            <RootStack />
          </SafeAreaProvider>
        </NavigationContainer>
      </EventsContext.Provider>
    </NativeBaseProvider>
  );
};

export default App;
