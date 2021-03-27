import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Route from './config/Route';
import Constants from './constants';

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Constants.Colors.Secondary,
      }}>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
