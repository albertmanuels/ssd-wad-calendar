import { formattedDate } from "@/src/utils/utils";
import css from "./View.module.css";
import type { AddEventModalProps } from "./View.types";
import { useView } from "./View.hook";

const AddEventModal = (props: AddEventModalProps) => {
	const { onClose, eventDate } = props;
	const {
		title,
		setTitle,
		time,
		setTime,
		guestValue,
		guests,
		handleAddGuest,
		handleDeleteGuest,
		onSubmit,
		isDisabledSaveBtn,
		generateColor,
		handleOnChangeGuest,
		error,
	} = useView(props);

	return (
		<div className={css.modal}>
			<div className={css.container}>
				<div className={css.modalHeader}>
					<h4 className={css.title}>Add Event on {formattedDate(eventDate)}</h4>
					<button className={css.closeBtn} onClick={onClose} />
				</div>
				<form onSubmit={onSubmit}>
					<div className={css.modalBody}>
						<div className={css.titleSection}>
							<input
								id="title"
								value={title}
								type="text"
								placeholder="Add title"
								className={css.titleInput}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className={css.timeSection}>
							<i className={css.timeIcon} />
							<input
								type="time"
								value={time}
								required
								onChange={(e) => setTime(e.target.value)}
							/>
						</div>
						<div className={css.guestSection}>
							<div className={css.guestInputSection}>
								<i className={css.guestIcon} />
								<div className={css.guestInputWrapper}>
									<input
										className={`${css.guestInput}`}
										value={guestValue}
										placeholder="Add Guest Email (exp: guest@gmail.com)"
										type="email"
										onChange={handleOnChangeGuest}
									/>
									{guestValue && error && (
										<small className={css.error}>Invalid Email</small>
									)}
								</div>

								<button
									type="button"
									className={css.addGuestBtn}
									onClick={handleAddGuest}
									disabled={!guestValue || error}
								/>
							</div>
							<ol className={css.guestListWrapper}>
								{guests.map((guest, idx) => (
									<div key={idx} className={css.guestList}>
										<li>{guest}</li>
										<button
											type="button"
											className={css.deleteGuestBtn}
											onClick={() => handleDeleteGuest(guest)}
										/>
									</div>
								))}
							</ol>
						</div>
					</div>
					<div className={css.modalFooter}>
						<button
							type="submit"
							className={css.saveBtn}
							disabled={isDisabledSaveBtn}
							onClick={() => generateColor()}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddEventModal;
