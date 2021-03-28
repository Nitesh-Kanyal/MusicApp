"use strict";

export const convertMilliToMinutes = (millis) => {
	let minutes = Math.floor(millis / 60000);
	let seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const convertSecToMinutes = (millis) => {
	let minutes = Math.floor(millis / 60);
	let seconds = (millis % 60).toFixed(0);
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
