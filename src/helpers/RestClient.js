'use strict';

import Connection from '../config/Connection';
import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const isConnected = () => {
  return new Promise(function (fulfill, reject) {
    if (Platform.OS === 'android') {
      fulfill(true);
    }
    NetInfo.fetch().then((state) => {
      console.log('isConnectedisConnected', state.isConnected);
      if (state.isConnected) fulfill(state.isConnected);
      else {
        reject(state.isConnected);
      }
    });
  });
};

export const getCall = (url, token = null) => {
  console.log('get call', url, token);
  return new Promise(function (fulfill, reject) {
    console.log('URLLL=>>', Connection.getResturl() + url);
    isConnected()
      .then(() => {
        fetch(Connection.getResturl() + url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            return response.text();
          })
          .then((responseText) => {
            if (responseText) {
              fulfill(JSON.parse(responseText));
            } else {
              fulfill(responseText);
            }
          })
          .catch((error) => {
            fulfill({
              message: 'Internet Problem!',
            });
            console.warn('eroro', error);
          });
      })
      .catch((error) => {
        console.log('eroro ********* ', error);
        fulfill({
          message: 'Please check your internet connectivity.',
        });
      });
  });
};
