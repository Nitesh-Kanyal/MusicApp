import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	Image,
	Animated,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import YoutubePlayer from "react-native-youtube-iframe";

import Header from "../components/common/Header";
import Constants from "../constants";
import { getCall } from "../helpers/RestClient";
import ApiUrls from "../constants/ApiUrls";
import SongCard from "../components/SongCard";
import { ScrollView } from "react-native-gesture-handler";
const BANNER_H = 300;

const VideosList = (props) => {
	const { navigation } = props;

	const scrollA = useRef(new Animated.Value(0)).current;

	return (
		<View style={Styles.container}>
			<Header
				title="VIDEOS"
				statusBarType="light-content"
				bgColor={Constants.Colors.Secondary}
				backButton
				navigation={navigation}
			/>
			<Animated.ScrollView
				// onScroll={(e) => {
				// 	console.log(e.nativeEvent.contentOffset.y);
				// }}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollA } } }],
					{ useNativeDriver: true }
				)}
				scrollEventThrottle={16}
				style={{ flex: 1 }}
			>
				<View style={{ alignItems: "center" }}>
					<Animated.Image
						resizeMode="contain"
						// style={Styles.bannerImageStyle}
						style={Styles.banner(scrollA)}
						source={Constants.Images.finland1}
					/>
				</View>
				<View style={{ padding: moderateScale(15) }}>
					<Text style={Styles.descText}>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and
						scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into
						electronic typesetting, remaining essentially unchanged.
						It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and
						more recently with desktop publishing software like
						Aldus PageMaker including versions of Lorem Ipsum. Lorem
						Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and
						scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into
						electronic typesetting, remaining essentially unchanged.
						It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and
						more recently with desktop publishing software like
						Aldus PageMaker including versions of Lorem Ipsum.
					</Text>
				</View>
			</Animated.ScrollView>
		</View>
	);
};

export default VideosList;

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Constants.Colors.borderGrayColor,
	},
	bannerImageStyle: {
		height: moderateScale(300),
	},
	descText: {
		fontSize: moderateScale(16),
		color: Constants.Colors.DarkGray,
		lineHeight: moderateScale(22),
	},
	banner: (scrollA) => ({
		height: BANNER_H,
		width: "200%",
		transform: [
			{
				translateY: scrollA.interpolate({
					inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
					outputRange: [
						-BANNER_H / 2,
						0,
						BANNER_H * 0.75,
						BANNER_H * 0.75,
					],
				}),
			},
			{
				scale: scrollA.interpolate({
					inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
					outputRange: [2, 1, 0.5, 0.5],
				}),
			},
		],
	}),
});
