import "./App.css";
import Calendar from "@/src/components/Calendar";
import { CalendarContext } from "./context";
import { useEffect, useMemo, useState } from "react";
import { StoreMyEvents, UpdateMyEventStore } from "./utils/localStorage";

function App() {
	const startDate = new Date();
	const [events, setEvents] = useState([]);
	const data = useMemo(() => ({ events, setEvents }), [events, setEvents]);

	useEffect(() => {
		const data = StoreMyEvents();
		setEvents(data);
		UpdateMyEventStore(data);
	}, []);

	return (
		<CalendarContext.Provider value={data}>
			<main className="layout">
				<Calendar startDate={startDate} />
			</main>
		</CalendarContext.Provider>
	);
}

export default App;
