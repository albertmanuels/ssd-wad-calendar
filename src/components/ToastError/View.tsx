import { useContext } from "react";
import css from "./View.module.css";
import { ToastErrorContext } from "@/src/context";
import { formattedDate } from "@/src/utils/utils";

function Toast(props: { eventDate: string }) {
	const { toastError } = useContext(ToastErrorContext);
	const { eventDate } = props;
	const isActive = toastError ? css.active : "";

	return (
		<div className={`${css.toast} ${isActive}`}>
			<div className={css.content}>
				<span>
					<b>Cannot add more event</b>
				</span>
				<span>Event on {formattedDate(eventDate)} is already full</span>
			</div>
		</div>
	);
}

export default Toast;
