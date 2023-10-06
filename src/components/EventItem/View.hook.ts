import { EventItemProps } from "./View.types";
import { lightOrDark } from "@/src/utils/utils";

export const useView = (props: EventItemProps) => {
	const { event, handleOnClickEventItem } = props;

	const brightness = lightOrDark(event.color || "");

	const limitShownGuests = (limit = 3) => {
		const guests = event.invitees.slice(0, limit);

		return guests;
	};

	const restOfGuests = event.invitees.length - 3;

	const handleClickEventItem = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		handleOnClickEventItem(event);
	};

	return {
		handleClickEventItem,
		limitShownGuests,
		restOfGuests,
		brightness,
	};
};
