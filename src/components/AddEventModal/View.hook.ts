import { CalendarContext } from "@/src/context";
import { FormEvent, useContext, useState } from "react";
import { AddEventModalProps } from "./View.types";
import { formattedTime, generateUUID } from "@/src/utils/utils";
import { EventObj } from "@/src/types";
import { UpdateMyEventStore } from "@/src/utils/localStorage";

export const useView = (props: AddEventModalProps) => {
	const { eventDate, onClose, onGenerateRandomColor } = props;
	const { events, setEvents } = useContext(CalendarContext);
	const [title, setTitle] = useState("");
	const [time, setTime] = useState("");
	const [guests, setGuests] = useState<Array<string | null>>([]);
	const [guestValue, setGuestValue] = useState("");
	const id = generateUUID();
	const createdEventDate = new Date(eventDate).toLocaleDateString();

	const handleAddGuest = () => {
		setGuests((prev) => [...prev, guestValue]);
		setGuestValue("");
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		const detailEvent = {
			id,
			title: title,
			time: formattedTime(time),
			invitees: guests,
			date: createdEventDate,
		};
		setEvents((state: EventObj) => ({
			...state,
			[id]: detailEvent,
		}));

		UpdateMyEventStore({ ...events, [id]: detailEvent });

		setTitle("");
		setTime("");
		onClose();
	};

	const handleDeleteGuest = (guestEmail: string | null) => {
		const filterredGuests = guests.filter((guest) => guest !== guestEmail);
		setGuests(filterredGuests);
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
		isDisabledSaveBtn,
		onGenerateRandomColor,
	};
};
