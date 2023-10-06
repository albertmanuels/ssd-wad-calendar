import { CalendarContext } from "@/src/context";
import { FormEvent, useContext, useState } from "react";
import { formattedTime } from "@/src/utils/utils";
import { EventObj } from "@/src/types";
import { UpdateMyEventStore } from "@/src/utils/localStorage";
import { EditEventModalProps } from "./View.types";

export const useView = (props: EditEventModalProps) => {
	const { data, onClose } = props;
	const { events, setEvents } = useContext(CalendarContext);
	const [title, setTitle] = useState(data.title);
	const [time, setTime] = useState(formattedTime(data.time, false));
	const [guests, setGuests] = useState<Array<string | null>>(data.invitees);
	const [guestValue, setGuestValue] = useState("");
	const createdEventDate = new Date(data.date).toLocaleDateString();

	const handleAddGuest = () => {
		setGuests((prev) => [...prev, guestValue]);
		setGuestValue("");
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		const detailEvent = {
			id: data.id,
			title: title,
			time: formattedTime(time),
			invitees: guests,
			date: createdEventDate,
		};

		setEvents((state: EventObj) => ({
			...state,
			[data.id]: detailEvent,
		}));

		UpdateMyEventStore({ ...events, [data.id]: detailEvent });

		setTitle("");
		setTime("");
		onClose();
	};

	const handleDeleteGuest = (guestEmail: string | null) => {
		const filterredGuests = guests.filter((guest) => guest !== guestEmail);
		setGuests(filterredGuests);
	};

	const handleDeleteEvent = (eventId: string) => {
		delete events[eventId];
		UpdateMyEventStore(events);
		onClose();
	};

	const isDisabledSaveBtn = !title || !time || guests.length === 0;

	return {
		title,
		setTitle,
		time,
		setTime,
		guestValue,
		setGuestValue,
		guests,
		onSubmit,
		handleAddGuest,
		handleDeleteGuest,
		handleDeleteEvent,
		isDisabledSaveBtn,
	};
};
