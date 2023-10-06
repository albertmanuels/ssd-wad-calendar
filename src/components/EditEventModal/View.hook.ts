import { CalendarContext } from "@/src/context";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { formattedTime, isValidEmail } from "@/src/utils/utils";
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
	const [error, setError] = useState(false);
	const [isExistGuest, setIsExistGuest] = useState(false);
	const createdEventDate = new Date(data.date).toLocaleDateString();

	const handleOnChangeGuest = (e: ChangeEvent<HTMLInputElement>) => {
		if (!isValidEmail(e.target.value)) {
			setError(true);
		} else {
			setError(false);
		}

		setGuestValue(e.target.value);
	};

	const handleAddGuest = () => {
		if (!guests.includes(guestValue)) {
			setIsExistGuest(false);
			setGuests((prev) => [...prev, guestValue]);
			setGuestValue("");
		} else {
			setIsExistGuest(true);
			setTimeout(() => {
				setIsExistGuest(false);
			}, 3000);
		}
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		const detailEvent = {
			id: data.id,
			title: title,
			time: formattedTime(time),
			invitees: guests,
			date: createdEventDate,
			color: data.color,
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
		handleOnChangeGuest,
		error,
		isExistGuest,
	};
};
