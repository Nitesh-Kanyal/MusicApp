import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { moderateScale } from "react-native-size-matters";

import Constants from "../constants";
import { convertMilliToMinutes } from "../helpers/JsHelperFunctions";

const SongCard = (props) => {
	const { item, index, songsList } = props;
	const goToDetail = (item) => {
		props.navigation.navigate("SongDetail", {
			songDetails: item,
			songsList: songsList,
		});
	};

	return (
		<Pressable
			key={index}
			android_ripple={{
				color: Constants.Colors.Primary,
				borderless: false,
				radius: moderateScale(300),
			}}
			style={Styles.cardContainer}
			onPress={() => goToDetail(item)}
		>
			<View style={{ flex: 1, flexDirection: "row" }}>
				<View>
					<Image
						source={{ uri: item.artworkUrl100 }}
						style={{
							height: moderateScale(90),
							width: moderateScale(90),
							borderRadius: moderateScale(4),
						}}
					/>
				</View>
				<View style={{ flex: 1, paddingLeft: moderateScale(15) }}>
					<View>
						<Text style={Styles.trackText}>{item.trackName}</Text>
					</View>
					<View style={{ marginTop: moderateScale(10) }}>
						<Text numberOfLines={2} style={Styles.collectionText}>
							{item.collectionCensoredName}
						</Text>
					</View>
					<View
						style={{
							marginTop: moderateScale(10),
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text style={Styles.collectionText}>
							{item.artistName}
						</Text>
						<Text style={Styles.collectionText}>
							{convertMilliToMinutes(item.trackTimeMillis)} min
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default SongCard;

const Styles = StyleSheet.create({
	cardContainer: {
		padding: moderateScale(15),
		backgroundColor: Constants.Colors.White,
		borderBottomWidth: 1,
		borderBottomColor: Constants.Colors.borderGrayColor,
	},
	trackText: {
		color: Constants.Colors.Secondary,
		fontSize: moderateScale(16),
		fontWeight: "500",
	},
	collectionText: {
		color: Constants.Colors.DarkGray,
		fontSize: moderateScale(13),
	},
});
