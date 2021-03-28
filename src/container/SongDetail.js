import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import TrackPlayer, {
	useTrackPlayerProgress,
	usePlaybackState,
	useTrackPlayerEvents,
} from "react-native-track-player";

import Header from "../components/common/Header";
import Constants from "../constants";
import { convertSecToMinutes } from "../helpers/JsHelperFunctions";
import { Pressable } from "react-native";

const SongDetail = (props) => {
	const { navigation } = props;
	const { songDetails, songsList } = props?.route?.params;
	const progress = useTrackPlayerProgress();
	const playbackState = usePlaybackState();
	const [duration, setDuration] = useState(0);
	const [position, setPosition] = useState(0);
	const [trackTitle, setTrackTitle] = useState("");
	const [trackArtwork, setTrackArtwork] = useState();
	const [trackArtist, setTrackArtist] = useState("");
	useTrackPlayerEvents(["playback-track-changed"], async (event) => {
		if (
			event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED
		) {
			const track = await TrackPlayer.getTrack(event.nextTrack);
			const { title, artist, artwork } = track || {};
			setTrackTitle(title);
			setTrackArtist(artist);
			setTrackArtwork(artwork);
		}
	});

	useEffect(() => {
		setup();
		console.log(modifySongsList());
	}, []);

	useEffect(() => {
		async function fetchMyAPI() {
			setPosition(await TrackPlayer.getPosition());
			setDuration(await TrackPlayer.getDuration());
		}

		fetchMyAPI();
	});

	const modifySongsList = () => {
		let newList =
			songsList &&
			songsList.reduce((finals, item) => {
				let newObj = {
					id: item?.trackId ?? "0",
					url: item?.previewUrl,
					title: item?.trackName ?? "Title",
					artist: item?.artistName,
					artwork: item?.artworkUrl100,
					duration: parseInt(item?.trackTimeMillis / 1000).toString(),
				};
				finals.push(newObj);
				return finals;
			}, []);

		return newList;
	};

	async function setup() {
		await TrackPlayer.setupPlayer({});
		await TrackPlayer.updateOptions({
			stopWithApp: true,
			capabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
				TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
				TrackPlayer.CAPABILITY_STOP,
			],
			compactCapabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE,
			],
		});
	}

	async function togglePlayback() {
		const currentTrack = await TrackPlayer.getCurrentTrack();
		if (currentTrack == null) {
			await TrackPlayer.reset();
			await TrackPlayer.add({
				id: songDetails?.trackId,
				url: songDetails?.previewUrl,
				title: songDetails?.trackName,
				artist: songDetails?.artistName,
				artwork: songDetails?.artworkUrl100,
				duration: parseInt(
					songDetails?.trackTimeMillis / 1000
				).toString(),
			});
			await TrackPlayer.add(modifySongsList());

			await TrackPlayer.play();
		} else {
			if (playbackState === TrackPlayer.STATE_PAUSED) {
				await TrackPlayer.play();
			} else {
				await TrackPlayer.pause();
			}
		}
	}

	async function skipToNext() {
		try {
			// await TrackPlayer.reset();
			await TrackPlayer.skipToNext();
		} catch (_) {}
	}

	async function skipToPrevious() {
		try {
			await TrackPlayer.skipToPrevious();
		} catch (_) {}
	}

	const renderTimeIndicator = () => {
		return (
			<View style={Styles.timeIndicatorContainer}>
				<View style={Styles.timeIndicator}>
					<View
						style={{
							flex: position,
							backgroundColor: Constants.Colors.DarkGray,
							borderRadius: moderateScale(10),
						}}
					/>
					<View
						style={{
							flex: duration - position,
							backgroundColor: Constants.Colors.borderGrayColor,
						}}
					/>
				</View>
				<View style={Styles.timeTextContainer}>
					<Text style={Styles.timeText}>
						{convertSecToMinutes(parseInt(position))}
					</Text>
					<Text style={Styles.timeText}>
						{convertSecToMinutes(parseInt(duration))}
					</Text>
				</View>
			</View>
		);
	};

	const renderControllerButtons = () => {
		return (
			<View style={Styles.playButtonsContainer}>
				<Pressable
					android_ripple={{
						color: Constants.Colors.Primary,
						borderless: false,
						radius: moderateScale(300),
					}}
					style={{
						padding: moderateScale(20),
					}}
					onPress={skipToPrevious}
				>
					<Image
						source={Constants.Images.next}
						resizeMode="contain"
						style={[
							Styles.forwardImage,
							{ transform: [{ rotate: "180deg" }] },
						]}
					/>
				</Pressable>
				<Pressable
					android_ripple={{
						color: Constants.Colors.Primary,
						borderless: false,
						radius: moderateScale(300),
					}}
					style={{
						padding: moderateScale(20),
					}}
					onPress={togglePlayback}
				>
					<Image
						source={
							playbackState === TrackPlayer.STATE_PLAYING ||
							playbackState === TrackPlayer.STATE_BUFFERING
								? Constants.Images.pause
								: Constants.Images.playBlack
						}
						resizeMode="contain"
						style={{
							height: moderateScale(60),
							width: moderateScale(60),
						}}
					/>
				</Pressable>
				<Pressable
					android_ripple={{
						color: Constants.Colors.Primary,
						borderless: false,
						radius: moderateScale(300),
					}}
					style={{
						padding: moderateScale(20),
					}}
					onPress={skipToNext}
				>
					<Image
						source={Constants.Images.next}
						resizeMode="contain"
						style={Styles.forwardImage}
					/>
				</Pressable>
			</View>
		);
	};

	const renderTrackDetails = () => {
		return (
			<View style={{ alignItems: "center", flex: 0.1 }}>
				<View>
					<Text style={Styles.trackText}>
						{trackTitle || songDetails?.trackName}
					</Text>
				</View>
				<View style={{ marginTop: moderateScale(10) }}>
					<Text numberOfLines={2} style={Styles.collectionText}>
						{trackArtist || songDetails?.artistName}
					</Text>
				</View>
			</View>
		);
	};

	const renderTrackPoster = () => {
		return (
			<View style={Styles.trackPosterContainer}>
				<Image
					source={{ uri: trackArtwork || songDetails?.artworkUrl100 }}
					resizeMode="cover"
					style={Styles.trackPosterImage}
				/>
			</View>
		);
	};

	stopPlayer = async () => {
		await TrackPlayer.stop();
		// await TrackPlayer.reset();
	};

	return (
		<View style={Styles.container}>
			<Header
				title="NOW PLAYING"
				statusBarType="light-content"
				backButton
				onBackPress={stopPlayer}
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
