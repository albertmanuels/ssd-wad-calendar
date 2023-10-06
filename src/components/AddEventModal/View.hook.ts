import { CalendarContext } from "@/src/context";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AddEventModalProps } from "./View.types";
import { formattedTime, generateUUID, isValidEmail } from "@/src/utils/utils";
import { EventObj } from "@/src/types";
import { UpdateMyEventStore } from "@/src/utils/localStorage";
import useGenerateRandomColor from "@/src/hooks/useGenerateRandomColor";

export const useView = (props: AddEventModalProps) => {
	const { eventDate, onClose } = props;
	const { events, setEvents } = useContext(CalendarContext);
	const [title, setTitle] = useState("");
	const [time, setTime] = useState("");
	const [guests, setGuests] = useState<Array<string | null>>([]);
	const [guestValue, setGuestValue] = useState("");
	const [error, setError] = useState<boolean>(false);
	const id = generateUUID();
	const createdEventDate = new Date(eventDate).toLocaleDateString();
	const { color, generateColor } = useGenerateRandomColor();

	const handleOnChangeGuest = (e: ChangeEvent<HTMLInputElement>) => {
		if (!isValidEmail(e.target.value)) {
			setError(true);
		} else {
			setError(false);
		}

		setGuestValue(e.target.value);
	};

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
			color: `#${color}`,
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
		generateColor,
		handleOnChangeGuest,
		error,
	};
};
