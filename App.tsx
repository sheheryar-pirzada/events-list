import React from 'react';
import type {ReactNode} from 'react';
import {NativeBaseProvider} from 'native-base';
import RootStack from './src/navigation/RootStack';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './src/common/theme';

const App: () => ReactNode = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer theme={DarkTheme}>
        <SafeAreaProvider>
          <RootStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
