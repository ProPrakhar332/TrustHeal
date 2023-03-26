/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * created by Levi Quackerman
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {useColorScheme, LogBox} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import AppNavigator from './Navigator';

//LogBox.ignoreLogs(["Warning: ..."]);

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
