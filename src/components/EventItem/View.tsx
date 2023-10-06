import { EventItemProps } from "./View.types";
import css from "./View.module.css";

const EventItem = (props: EventItemProps) => {
	const { event, handleOnClickEventItem } = props;

	return (
		<button
			className={`${css.eventItem}`}
			onClick={(e) => {
				e.stopPropagation();
				handleOnClickEventItem(event);
			}}
		>
			<p className={css.eventTitle}>{event.title}</p>
			<ol className="event-list">
				{event.invitees.map((email: string) => (
					<li key={email}>{email}</li>
				))}
			</ol>

			<p className="event-schedule">{event.time}</p>
		</button>
	);
};

export default EventItem;
