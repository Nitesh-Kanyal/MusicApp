import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';

import Constants from '../constants';
import {moderateScale} from 'react-native-size-matters';

const SplashScreen = (props) => {
  return (
    <View style={Styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Image
        source={Constants.Images.playWhite}
        style={{
          height: moderateScale(80),
          width: moderateScale(80),
        }}
      />
    </View>
  );
};

export default SplashScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.Secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
