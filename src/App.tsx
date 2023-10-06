import "./App.css";
import Calendar from "@/src/components/Calendar";
import { CalendarContext, ToastErrorContext } from "./context";
import { useEffect, useMemo, useState } from "react";
import { StoreMyEvents, UpdateMyEventStore } from "./utils/localStorage";

function App() {
	const startDate = new Date();
	const [events, setEvents] = useState([]);
	const [toastError, setToastError] = useState(null);

	const data = useMemo(() => ({ events, setEvents }), [events, setEvents]);
	const error = useMemo(
		() => ({ toastError, setToastError }),
		[toastError, setToastError]
	);
	useEffect(() => {
		const data = StoreMyEvents();
		setEvents(data);
		UpdateMyEventStore(data);
	}, []);

	return (
		<ToastErrorContext.Provider value={error}>
			<CalendarContext.Provider value={data}>
				<main className="layout">
					<Calendar startDate={startDate} />
				</main>
			</CalendarContext.Provider>
		</ToastErrorContext.Provider>
	);
}

export default App;
