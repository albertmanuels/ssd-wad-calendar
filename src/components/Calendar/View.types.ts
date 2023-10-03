type Events = {
	name: string;
	date: Date;
	invitees: string[];
};
export interface CalendarProps {
	startDate: Date;
	events: Array<Events>;
}
