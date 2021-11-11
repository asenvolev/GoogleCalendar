import { EntityId } from "@reduxjs/toolkit";
import { FC } from "react";
import { useDispatch } from "react-redux";
import styled from 'styled-components'
import { selectDateById, selectIsDateChosen, selectIsDateToday, updateChosenDate } from "../reducers/daysReducer";
import { useAppSelector } from "../store";

interface Props{
    id: EntityId;
}

const ActiveDate : FC<Props> = ({id}) => {

    const dispatch = useDispatch();

    const date = useAppSelector(state => selectDateById(state,id))

    const isToday = useAppSelector(state => selectIsDateToday(state.daysReducer, date?.date || 0))
    const isChosen = useAppSelector(state => selectIsDateChosen(state.daysReducer, date?.date || 0))

    const onDateClicked = () => {
        date && dispatch(updateChosenDate(date.date));
    }

    return <ActiveDateContainer onClick={onDateClicked} isToday={isToday} isActive={isChosen}>{date?.date}</ActiveDateContainer>;
};

export default ActiveDate;

const ActiveDateContainer = styled.div<{isToday: boolean, isActive: boolean}>`
    width:30px;
    height:30px;
    text-align:center;
    cursor: pointer;
    ${({isToday})=> isToday && `background-color:red;`}
    ${({isActive})=> isActive && `border: 1px solid blue; font-color:blue; font-weight:bold;`}
`;

