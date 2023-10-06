import type { EventObj } from "../types";

export const StoreMyEvents = () => {
	return localStorage.getItem("my-events")
		? JSON.parse(localStorage.getItem("my-events") || "")
		: [];
};

export const UpdateMyEventStore = (events: EventObj) => {
	localStorage.setItem("my-events", JSON.stringify(events));
};
