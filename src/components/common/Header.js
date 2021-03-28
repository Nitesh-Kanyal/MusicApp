import React from "react";
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { moderateScale } from "react-native-size-matters";

import Constants from "../../constants";

const Header = (props) => {
	let {
		title,
		statusBarType,
		backButton,
		navigation,
		onBackPress,
		bgColor,
	} = props;
	const backPress = () => {
		onBackPress();
		navigation.pop();
	};
	return (
		<View style={Styles.shadowProps}>
			<StatusBar barStyle={statusBarType} backgroundColor={bgColor} />
			<View style={Styles.container}>
				<TouchableOpacity
					onPress={() => {
						backButton ? backPress() : null;
					}}
					style={Styles.iconContainer}
				>
					{backButton ? (
						<Icon
							name={"arrow-left"}
							size={moderateScale(26)}
							color={Constants.Colors.White}
						/>
					) : (
						<View
							style={{
								height: moderateScale(26),
								width: moderateScale(26),
							}}
						/>
					)}
				</TouchableOpacity>
				<View style={Styles.titleView}>
					<Text style={Styles.titleText}>{title}</Text>
				</View>
				<View style={Styles.iconContainer}>
					<View style={{ width: moderateScale(26) }}></View>
				</View>
			</View>
		</View>
	);
};

export default Header;

const Styles = StyleSheet.create({
	container: {
		backgroundColor: Constants.Colors.Primary,
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: moderateScale(5),
	},
	titleText: {
		fontSize: moderateScale(17),
		color: Constants.Colors.White,
		fontWeight: "500",
	},
	iconContainer: {
		paddingHorizontal: moderateScale(17),

		paddingVertical: moderateScale(5),
		justifyContent: "center",
	},
	titleView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	shadowProps: {
		shadowOffset: { height: 2, width: 2 },
		shadowOpacity: 0.2,
		shadowColor: "black",
		elevation: 2,
		backgroundColor: "white",
	},
});
