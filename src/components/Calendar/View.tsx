import { DAYS } from "../../constants";
import "./View.style.css";
import type { CalendarProps } from "./View.types";
import { useView } from "./View.hook";
import { getDateObj, isSameDate } from "@/src/utils/utils";
import AddEventModal from "../AddEventModal";
import { Fragment } from "react";
import EventItem from "../EventItem";
import EditEventModal from "../EditEventModal";

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
		color,
		handleGenerateRandomColor,
	} = useView(props);

	return (
		<div className="calendar-wrapper">
			<div className="calendar-navigation">
				<div className="navigation-wrapper">
					<i className="left-arrow" onClick={handlePrevMonth} />
					<h2>
						{currentMonth} {currYear}
					</h2>
					<i className="right-arrow" onClick={handleNextMonth} />
				</div>
			</div>

			<ul className="calendar-header">
				{DAYS.map((day) => (
					<li key={day} className="list-day">
						{day}
					</li>
				))}
			</ul>
			<div className="calendar-body">
				{dates.map((date, idx) => (
					<div
						key={idx}
						className={`date-box ${!date ? "no-date" : ""} ${
							isSameDate(new Date(), getDateObj(date, currMonth, currYear))
								? "today"
								: ""
						}`}
						onClick={() => {
							handleOnClickDateBox(date);
							handleGetEventDate(date);
						}}
					>
						<span className="date">{date}</span>
						<div className="event-wrapper">
							{eventsArr.map((event) => (
								<Fragment key={event.id}>
									{isSameDate(
										getDateObj(date, currMonth, currYear),
										new Date(event.date)
									) ? (
										<EventItem
											key={event.id}
											event={event}
											handleOnClickEventItem={handleOnClickEventItem}
											color={color}
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
					onGenerateRandomColor={handleGenerateRandomColor}
				/>
			)}
			{showEditModal && (
				<EditEventModal
					onClose={() => setShowEditModal(false)}
					data={editModalData}
					eventsArr={eventsArr}
				/>
			)}
		</div>
	);
};

export default Calendar;
