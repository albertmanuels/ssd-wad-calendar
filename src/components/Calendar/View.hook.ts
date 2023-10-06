import { DAYS, MONTHS } from "@/src/constants";
import { dateRange, getDaysInMonth, getSortedDays } from "@/src/utils/utils";
import { useContext, useEffect, useState } from "react";
import { CalendarProps } from "./View.types";
import { CalendarContext } from "@/src/context";
import { EventObj } from "@/src/types";
import useGenerateRandomColor from "@/src/hooks/useGenerateRandomColor";

export const useView = (props: CalendarProps) => {
	const { startDate } = props;
	const { events } = useContext(CalendarContext);
	const [currMonth, setCurrMonth] = useState(startDate.getMonth());
	const [currYear, setCurrYear] = useState(startDate.getFullYear());
	const currentMonth = MONTHS[currMonth];
	const [dates, setDates] = useState<Array<string>>([]);
	const DAYS_IN_MONTH = getDaysInMonth(currMonth, currYear);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [eventDate, setEventDate] = useState(Date);
	const [editModalData, setEditModalData] = useState({});
	const eventsArr: Array<EventObj> = Object.values(events);

	const { color, generateColor } = useGenerateRandomColor();

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

	const handleGetEventDate = (date: string) => {
		const eventDate = new Date(
			currYear,
			currMonth,
			Number(date)
		).toLocaleDateString();
		setEventDate(eventDate);
	};

	const handleOnClickDateBox = (date: string) => {
		const eventDate = new Date(
			currYear,
			currMonth,
			Number(date)
		).toLocaleDateString();

		const eventLengthInADay = eventsArr.filter(
			(item) => item.date === eventDate
		).length;

		if (eventLengthInADay < 3) {
			setShowAddModal(true);
		}
	};

	const handleOnClickEventItem = (event: EventObj) => {
		setShowEditModal(true);
		setEditModalData(events[event.id]);
		generateColor();
	};

	const handleGenerateRandomColor = () => {
		generateColor();
	};

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
		showAddModal,
		setShowAddModal,
		showEditModal,
		setShowEditModal,
		eventDate,
		setEventDate,
		eventsArr,
		handleGetEventDate,
		handleOnClickDateBox,
		handleOnClickEventItem,
		editModalData,
		color,
		handleGenerateRandomColor,
	};
};
