import { DAYS } from "../../constants";
import css from "./View.module.css";
import type { CalendarProps } from "./View.types";
import { useView } from "./View.hook";
import { getDateObj, isSameDate } from "@/src/utils/utils";
import AddEventModal from "../AddEventModal";
import { Fragment } from "react";
import EventItem from "../EventItem";
import EditEventModal from "../EditEventModal";
import Toast from "../ToastError";

const Calendar = (props: CalendarProps) => {
	const {
		currYear,
		currMonth,
		currentMonth,
		dates,
		handleNextMonth,
		handlePrevMonth,
		showAddModal,
		setShowAddModal,
		showEditModal,
		setShowEditModal,
		eventDate,
		eventsArr,
		handleGetEventDate,
		handleOnClickDateBox,
		handleOnClickEventItem,
		editModalData,
	} = useView(props);

	return (
		<div className={css.calendarWrapper}>
			<div className={css.calendarNavigation}>
				<div className={css.navigationWrapper}>
					<i className={css.leftArrow} onClick={handlePrevMonth} />
					<div className={css.monthYearWrapper}>
						<h2>
							{currentMonth} {currYear}
						</h2>
					</div>

					<i className={css.rightArrow} onClick={handleNextMonth} />
				</div>
			</div>

			<ul className={css.calendarHeader}>
				{DAYS.map((day) => (
					<li key={day} className={css.listDay}>
						{day}
					</li>
				))}
			</ul>
			<div className={css.calendarBody}>
				{dates.map((date, idx) => (
					<div
						key={idx}
						className={`${css.dayBox} ${!date && `${css.noDate}`} ${
							isSameDate(new Date(), getDateObj(date, currMonth, currYear))
								? `${css.today}`
								: ""
						}`}
						onClick={() => {
							if (date) {
								handleOnClickDateBox(date);
								handleGetEventDate(date);
							}
						}}
					>
						<span className={css.date}>{date}</span>
						<div className={css.eventWrapper}>
							{eventsArr.map((event) => (
								<Fragment key={event.id}>
									{date &&
									isSameDate(
										getDateObj(date, currMonth, currYear),
										new Date(event.date)
									) ? (
										<EventItem
											key={event.id}
											event={event}
											handleOnClickEventItem={handleOnClickEventItem}
										/>
									) : null}
								</Fragment>
							))}
						</div>
					</div>
				))}
			</div>
			{showAddModal && (
				<AddEventModal
					onClose={() => setShowAddModal(false)}
					eventDate={eventDate}
				/>
			)}
			{showEditModal && (
				<EditEventModal
					onClose={() => setShowEditModal(false)}
					data={editModalData}
				/>
			)}
			<Toast eventDate={eventDate} />
		</div>
	);
};

export default Calendar;
