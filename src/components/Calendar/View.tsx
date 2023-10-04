import { DAYS } from "../../constants";
import "./View.style.css";
import { CalendarProps } from "./View.types";
import { useView } from "./View.hook";
import { getDateObj, isSameDate } from "@/src/utils/utils";
import { Fragment } from "react";
import EventItem from "../EventItem";

const Calendar = (props: CalendarProps) => {
	const { events } = props;
	const {
		currYear,
		currMonth,
		currentMonth,
		dates,

		handleNextMonth,
		handlePrevMonth,
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
					>
						<span className="date">{date}</span>
						<div className="event-wrapper">
							{events.map((event, idx) => (
								<Fragment key={idx}>
									{isSameDate(
										getDateObj(date, currMonth, currYear),
										event.date
									) && <EventItem event={event} />}
								</Fragment>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;
