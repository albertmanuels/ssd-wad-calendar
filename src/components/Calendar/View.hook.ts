import { DAYS, MONTHS } from "@/src/constants";
import { dateRange, getDaysInMonth, getSortedDays } from "@/src/utils/utils";
import { useEffect, useState } from "react";
import { CalendarProps } from "./View.types";

export const useView = (props: CalendarProps) => {
	const { startDate } = props;
	const [currMonth, setCurrMonth] = useState(startDate.getMonth());
	const [currYear, setCurrYear] = useState(startDate.getFullYear());
	const currentMonth = MONTHS[currMonth];
	const [dates, setDates] = useState<Array<string>>([]);
	const DAYS_IN_MONTH = getDaysInMonth(currMonth, currYear);

	useEffect(() => {
		const newDays = () => {
			const range = dateRange(DAYS_IN_MONTH);
			const startDayIndex = DAYS.indexOf(getSortedDays(currMonth, currYear)[0]);
			const tempArr = Array(range.length + startDayIndex).fill(null);
			const totalLength = range.length + startDayIndex;

			tempArr.splice(startDayIndex, 0, ...range);

			setDates(tempArr.slice(0, totalLength));
		};

		newDays();
	}, [DAYS_IN_MONTH, currMonth, currYear]);

	const handleNextMonth = () => {
		if (currMonth < 11) {
			setCurrMonth((prev) => prev + 1);
		} else {
			setCurrMonth(0);
			setCurrYear((prev) => prev + 1);
		}
	};

	const handlePrevMonth = () => {
		if (currMonth > 0) {
			setCurrMonth((prev) => prev - 1);
		} else {
			setCurrMonth(11);
			setCurrYear((prev) => prev - 1);
		}
	};

	const thisYearandMonth =
		new Date().getFullYear() === currYear &&
		new Date().getMonth() === currMonth;

	return {
		currMonth,
		currYear,
		currentMonth,
		dates,
		setCurrMonth,
		setCurrYear,
		handleNextMonth,
		handlePrevMonth,
		thisYearandMonth,
	};
};
