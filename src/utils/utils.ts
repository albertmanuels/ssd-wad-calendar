import { DAYS, MONTHS } from "../constants";

export const dateRange = (end: number) => {
	const { result } = Array.from({ length: end }).reduce(
		({ result, current }) => ({
			result: [...result, current],
			current: current + 1,
		}),
		{ result: [], current: 1 }
	);

	return result;
};

export const getDaysInMonth = (month: number, year: number) => {
	return new Date(year, month + 1, 0).getDate();
};

export const getSortedDays = (month: number, year: number) => {
	const dayIndex = new Date(year, month, 1).getDay();
	return [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)];
};

export const getDateObj = (day: string, month: number, year: number) => {
	return new Date(year, month, Number(day));
};

export const isSameDate = (first: Date, second: Date) => {
	return (
		first.getFullYear() === second.getFullYear() &&
		first.getMonth() === second.getMonth() &&
		first.getDate() === second.getDate()
	);
};

export const formattedDate = (val: string) => {
	const date = new Date(val).getDate();
	const month = new Date(val).getMonth();
	const year = new Date(val).getFullYear();

	return `${date} ${MONTHS[month]} ${year}`;
};

export const formattedTime = (time: string, withMeridian: boolean = true) => {
	const timeSplit = time.split(":");

	let hours = Number(timeSplit[0]);
	const minutes = timeSplit[1];
	let meridian = "";

	if (hours > 12) {
		meridian = "pm";
		hours -= 12;
	} else if (hours < 12) {
		meridian = "am";
		if (hours === 0) {
			hours = 12;
		}
	} else {
		meridian = "pm";
	}

	if (withMeridian) {
		return `${hours}:${minutes} ${meridian}`;
	} else {
		const timeSplitMeridian = time.split(" ")[0];
		const timeSplitted = timeSplitMeridian.split(":");
		const hours = Number(timeSplitted[0]);
		const minutes = Number(timeSplitted[1]);

		let hourStr = "";

		if (hours < 10) {
			hourStr = `0${hours}`;
		} else {
			hourStr = `${hours}`;
		}

		return `${hourStr}:${minutes}`;
	}
};

export const generateUUID = () => {
	return Math.random().toString(36).substring(2, 6);
};

export const isValidEmail = (email: string) => {
	return /\S+@\S+\.\S+/.test(email);
};

export const lightOrDark = (color: string) => {
	let r = color[1];
	let g = color[2];
	let b = color[3];

	let hsp = 0;

	if (color.match(/^rgb/)) {
		color = String(
			color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)
		);
	} else {
		const newColor = String(color);
		color = String(
			+("0x" + color.slice(1).replace(newColor.length < 5 ? /./g : "", "$&$&"))
		);

		r = String(Number(color) >> 16);
		g = String((Number(color) >> 8) & 255);
		b = String(Number(color) & 255);
	}

	const R = Number(r);
	const G = Number(g);
	const B = Number(b);

	hsp = Math.sqrt(0.299 * (R * R) + 0.587 * (G * G) + 0.114 * (B * B));

	if (hsp > 127.5) {
		return "light";
	} else {
		return "dark";
	}
};
