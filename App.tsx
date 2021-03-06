import React, {useEffect, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import RootStack from './src/navigation/RootStack';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './src/common/theme';
import {getFromStorage} from './src/common/storage';
import {EventsContext} from './src/common/userContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';

const App: React.FC = () => {
  const [events, setEvents] = useState<any>([]);
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

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
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer theme={DarkTheme}>
            <SafeAreaProvider>
              <RootStack />
            </SafeAreaProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </EventsContext.Provider>
    </NativeBaseProvider>
  );
};

export default App;
