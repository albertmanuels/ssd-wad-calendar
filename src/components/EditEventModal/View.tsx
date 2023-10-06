import { formattedDate } from "@/src/utils/utils";
import { useView } from "./View.hook";
import css from "./View.module.css";
import { EditEventModalProps } from "./View.types";

const EditEventModal = (props: EditEventModalProps) => {
	const { onClose, data } = props;
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
		handleDeleteEvent,
		isDisabledSaveBtn,
		handleOnChangeGuest,
		error,
		isExistGuest,
	} = useView(props);

	return (
		<div className={css.modal}>
			<div className={css.container}>
				<div className={css.modalHeader}>
					<h4 className={css.title}>
						Edit Event on {formattedDate(data.date)}
					</h4>
					<button className={css.closeBtn} onClick={onClose} />
				</div>
				<form onSubmit={onSubmit}>
					<div className={css.modalBody}>
						<div className={css.titleSection}>
							<input
								id="title"
								type="text"
								value={title}
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
										className={css.guestInput}
										value={guestValue}
										placeholder="Add Guest Email (exp: guest@gmail.com)"
										type="email"
										onChange={handleOnChangeGuest}
									/>

									<small
										className={`${css.errorTxt} ${
											((guestValue && error) || isExistGuest) &&
											`${css.isError}`
										}
                    
                    `}
									>
										{isExistGuest
											? "	Guest is already added in list"
											: "		Invalid Email"}
									</small>
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
							type="button"
							className={css.deleteEventBtn}
							onClick={() => handleDeleteEvent(data.id)}
						>
							Delete
						</button>
						<button
							type="submit"
							className={css.saveBtn}
							disabled={isDisabledSaveBtn}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditEventModal;
