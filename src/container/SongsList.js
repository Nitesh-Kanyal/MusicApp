import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

import Header from "../components/common/Header";
import Constants from "../constants";
import { getCall } from "../helpers/RestClient";
import ApiUrls from "../constants/ApiUrls";
import SongCard from "../components/SongCard";

const SongsList = (props) => {
	const { navigation } = props;
	const [songsList, setSongs] = useState(null);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		callSongsApi();
	}, []);

	const callSongsApi = () => {
		setLoader(true);
		getCall(ApiUrls.getSongs)
			.then((response) => {
				console.log("All Songs=>>", response?.results);
				setTimeout(() => {
					setLoader(false);
					setSongs(response?.results);
				}, 1000);
			})
			.catch((err) => {
				console.log("Error", err);
			});
	};

	const renderSongsList = ({ item, index }) => {
		return (
			<SongCard
				item={item}
				index={index}
				navigation={navigation}
				songsList={songsList}
			/>
		);
	};

	return (
		<View style={Styles.container}>
			<Header
				title="SONGS"
				statusBarType="light-content"
				bgColor={Constants.Colors.Secondary}
			/>
			<View style={{ flex: 1 }}>
				{loader ? (
					<View
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<ActivityIndicator
							size="large"
							color={Constants.Colors.Primary}
						/>
					</View>
				) : songsList && songsList.length ? (
					<FlatList
						data={songsList}
						keyExtractor={(item, index) => index + "unique"}
						renderItem={renderSongsList}
						onRefresh={callSongsApi}
						refreshing={loader}
					/>
				) : (
					<Text>No Songs Found!</Text>
				)}
			</View>
		</View>
	);
};

export default SongsList;

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Constants.Colors.borderGrayColor,
	},
});
