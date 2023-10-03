import "./App.css";
import Calendar from "@/src/components/Calendar";

function App() {
	const startDate = new Date();

	const EVENTS = [
		{
			date: new Date(),
			name: "Project A",
			invitees: ["albert@gmail.com", "manuel@gmail.com"],
		},
		{
			date: new Date(),
			name: "Project B",
			invitees: ["jhondoe@gmail.com"],
		},
	];

	return (
		<main className="layout">
			<Calendar startDate={startDate} events={EVENTS} />
		</main>
	);
}

export default App;
