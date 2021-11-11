import { FC, Fragment } from "react";
import { selectAllDatesIds } from "../reducers/daysReducer";
import { useAppSelector } from "../store";
import ActiveDate from "./ActiveDate";

const ActiveDatesList : FC = () => {
    const activeDaysIds = useAppSelector(state => selectAllDatesIds(state));

    const activeDays = activeDaysIds.map((dayId) => <ActiveDate key={dayId} id={dayId} /> );

    return <Fragment>{activeDays}</Fragment>;
}

export default ActiveDatesList