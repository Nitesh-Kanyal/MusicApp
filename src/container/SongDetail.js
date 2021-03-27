import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import Header from '../components/common/Header';
import Constants from '../constants';
import {convertMilliToMinutes} from '../helpers/JsHelperFunctions';

const SongDetail = (props) => {
  const {navigation} = props;
  const {songDetails} = props?.route?.params;
  return (
    <View style={Styles.container}>
      <Header
        title="NOW PLAYING"
        statusBarType="light-content"
        backButton
        navigation={navigation}
      />
      <View style={{flex: 1}}>
        <View
          style={{alignItems: 'center', flex: 0.5, justifyContent: 'center'}}>
          <Image
            source={{uri: songDetails?.artworkUrl100}}
            resizeMode="cover"
            style={{
              height: '70%',
              width: '60%',
              borderRadius: moderateScale(5),
            }}
          />
        </View>
        <View style={{alignItems: 'center', flex: 0.1}}>
          <View>
            <Text style={Styles.trackText}>{songDetails?.trackName}</Text>
          </View>
          <View style={{marginTop: moderateScale(10)}}>
            <Text numberOfLines={2} style={Styles.collectionText}>
              {songDetails?.artistName}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.05,
            justifyContent: 'center',
            paddingHorizontal: moderateScale(40),
            paddingTop: moderateScale(15),
          }}>
          <View
            style={{
              height: moderateScale(7),
              borderWidth: 1,
              borderColor: Constants.Colors.borderGrayColor,
              borderRadius: moderateScale(10),
              backgroundColor: Constants.Colors.borderGrayColor,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.7,
                backgroundColor: Constants.Colors.DarkGray,
                borderRadius: moderateScale(10),
              }}></View>
            <View style={{flex: 0.3}}></View>
          </View>
          <View
            style={{
              marginTop: moderateScale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={Styles.timeText}>2:30</Text>
            <Text style={Styles.timeText}>
              {convertMilliToMinutes(songDetails?.trackTimeMillis)}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 0.18,
          }}>
          <Image
            source={Constants.Images.next}
            resizeMode="contain"
            style={{
              height: moderateScale(20),
              width: moderateScale(20),
              transform: [{rotate: '180deg'}],
            }}
          />
          <Image
            source={Constants.Images.playBlack}
            resizeMode="contain"
            style={{
              height: moderateScale(60),
              width: moderateScale(60),
            }}
          />
          <Image
            source={Constants.Images.next}
            resizeMode="contain"
            style={{
              height: moderateScale(20),
              width: moderateScale(20),
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SongDetail;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.White,
  },
  trackText: {
    color: Constants.Colors.Secondary,
    fontSize: moderateScale(20),
    fontWeight: '500',
  },
  collectionText: {
    color: Constants.Colors.DarkGray,
    fontSize: moderateScale(15),
  },
  timeText: {
    color: Constants.Colors.DarkGray,
    fontSize: moderateScale(12),
  },
});
