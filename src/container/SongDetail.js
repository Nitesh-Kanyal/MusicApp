import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";

import Header from "../components/common/Header";
import Constants from "../constants";
import { convertMilliToMinutes } from "../helpers/JsHelperFunctions";

const SongDetail = (props) => {
	const { navigation } = props;
	const { songDetails } = props?.route?.params;
	const renderTimeIndicator = () => {
		return (
			<View style={Styles.timeIndicatorContainer}>
				<View style={Styles.timeIndicator}>
					<View
						style={{
							flex: 0.7,
							backgroundColor: Constants.Colors.DarkGray,
							borderRadius: moderateScale(10),
						}}
					></View>
				</View>
				<View style={Styles.timeTextContainer}>
					<Text style={Styles.timeText}>2:30</Text>
					<Text style={Styles.timeText}>
						{convertMilliToMinutes(songDetails?.trackTimeMillis)}
					</Text>
				</View>
			</View>
		);
	};

	const renderControllerButtons = () => {
		return (
			<View style={Styles.playButtonsContainer}>
				<Image
					source={Constants.Images.next}
					resizeMode="contain"
					style={[
						Styles.forwardImage,
						{ transform: [{ rotate: "180deg" }] },
					]}
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
					style={Styles.forwardImage}
				/>
			</View>
		);
	};

	const renderTrackDetails = () => {
		return (
			<View style={{ alignItems: "center", flex: 0.1 }}>
				<View>
					<Text style={Styles.trackText}>
						{songDetails?.trackName}
					</Text>
				</View>
				<View style={{ marginTop: moderateScale(10) }}>
					<Text numberOfLines={2} style={Styles.collectionText}>
						{songDetails?.artistName}
					</Text>
				</View>
			</View>
		);
	};

	const renderTrackPoster = () => {
		return (
			<View style={Styles.trackPosterContainer}>
				<Image
					source={{ uri: songDetails?.artworkUrl100 }}
					resizeMode="cover"
					style={Styles.trackPosterImage}
				/>
			</View>
		);
	};

	return (
		<View style={Styles.container}>
			<Header
				title="NOW PLAYING"
				statusBarType="light-content"
				backButton
				navigation={navigation}
			/>
			<View style={{ flex: 1 }}>
				{renderTrackPoster()}
				{renderTrackDetails()}
				{renderTimeIndicator()}
				{renderControllerButtons()}
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
		fontWeight: "500",
	},
	collectionText: {
		color: Constants.Colors.DarkGray,
		fontSize: moderateScale(15),
	},
	timeText: {
		color: Constants.Colors.DarkGray,
		fontSize: moderateScale(12),
	},
	forwardImage: {
		height: moderateScale(20),
		width: moderateScale(20),
	},
	playButtonsContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		flex: 0.18,
	},
	timeTextContainer: {
		marginTop: moderateScale(10),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	timeIndicator: {
		height: moderateScale(7),
		borderWidth: 1,
		borderColor: Constants.Colors.borderGrayColor,
		borderRadius: moderateScale(10),
		backgroundColor: Constants.Colors.borderGrayColor,
		flexDirection: "row",
	},
	timeIndicatorContainer: {
		flex: 0.05,
		justifyContent: "center",
		paddingHorizontal: moderateScale(40),
		paddingTop: moderateScale(15),
	},
	trackPosterContainer: {
		alignItems: "center",
		flex: 0.5,
		justifyContent: "center",
	},
	trackPosterImage: {
		height: "70%",
		width: "60%",
		borderRadius: moderateScale(5),
	},
});
