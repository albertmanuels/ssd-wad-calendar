import { DAYS } from "../../constants";
import "./View.style.css";
import { CalendarProps } from "./View.types";
import { useView } from "./View.hook";

const Calendar = (props: CalendarProps) => {
	const { events } = props;
	const {
		currYear,
		currentMonth,
		dates,
		onClickDate,
		handleNextMonth,
		handlePrevMonth,
		thisYearandMonth,
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
					<button
						key={idx}
						className={`date-box ${!date && "no-date"} ${
							date === new Date().getDate() && thisYearandMonth && "today"
						}`}
						disabled={!date}
						onClick={() => onClickDate(date)}
					>
						<span className="date">{date}</span>
						<div className="event-wrapper">
							{events.map(
								(event, idx) =>
									date === new Date().getDate() &&
									thisYearandMonth && (
										<div className="event" key={idx}>
											<p className="event-name">{event.name}</p>
											<ol className="event-list">
												{event.invitees.map((email) => (
													<li key={email}>{email}</li>
												))}
											</ol>

											<p className="event-schedule">
												{event.date.toLocaleDateString("id")}
											</p>
										</div>
									)
							)}
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default Calendar;
