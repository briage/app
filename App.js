/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { PageLayout } from './app/pageLayout';
import { View } from 'react-native';

const {useState} = React;

const App = () => {
  const [init, setinit] = useState(true);
  return (
    <View>
      <PageLayout init={init} onLock={() => setinit(false)} />
    </View>
  );
};

export default App;
