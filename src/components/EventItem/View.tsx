import { EventItemProps } from "./View.types";
import css from "./View.module.css";
import { useView } from "./View.hook";

const EventItem = (props: EventItemProps) => {
	const { event } = props;
	const { handleClickEventItem, limitShownGuests, restOfGuests, brightness } =
		useView(props);

	return (
		<button
			className={`${css.eventItem}`}
			onClick={handleClickEventItem}
			style={{
				backgroundColor: event.color,
				color: brightness === "light" ? "#000000" : "#ffffff",
			}}
		>
			<p className={css.eventTitle}>{event.title}</p>
			<ol className="event-list">
				{limitShownGuests(3).map((email: string) => (
					<li key={email}>{email}</li>
				))}
				{event.invitees.length > 3 && `+${restOfGuests} more`}
			</ol>

			<p className="event-schedule">{event.time}</p>
		</button>
	);
};

export default EventItem;
