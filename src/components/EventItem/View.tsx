import { EventItemProps } from "./View.types";
import style from "./View.module.css";

const EventItem = (props: EventItemProps) => {
	const { event } = props;

	return (
		<button
			className={`${style.eventItem}`}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<p className="event-name">{event.name}</p>
			<ol className="event-list">
				{event.invitees.map((email: string) => (
					<li key={email}>{email}</li>
				))}
			</ol>

			<p className="event-schedule">{event.date.toLocaleDateString("id")}</p>
		</button>
	);
};

export default EventItem;
