import type { EventObj } from "@/src/types";

export type EventItemProps = {
	event: EventObj;
	handleOnClickEventItem: (obj: EventObj) => void;
};
