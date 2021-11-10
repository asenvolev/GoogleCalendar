import { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from 'styled-components'
import { selectDayIsSelected, updateDateForShow } from "../reducers/eventsReducer";
import { useAppSelector } from "../store";

interface Props{
    date: number,
    month:number;
    year:number;
}

const Day : FC<Props> = ({date, month, year}) => {

    const dispatch = useDispatch();
    const isCurrentDaySelected = useAppSelector(state => selectDayIsSelected(state.eventsReducer, date, month, year));


    const isToday = useMemo(() : boolean=>{
        const today = new Date();
        return date === today.getDate() && month-1 === today.getMonth() && year === today.getFullYear();
    },[month, year, date])

    const onDayClicked = () => {
        dispatch(updateDateForShow({date,month,year}));
    }

    return <DayContainer onClick={onDayClicked} isToday={isToday} isActive={isCurrentDaySelected}>{date}</DayContainer>;
};

export default Day;

const DayContainer = styled.div<{isToday: boolean, isActive: boolean}>`
    width:30px;
    height:30px;
    text-align:center;
    cursor: pointer;
    ${({isToday})=> isToday && `background-color:red;`}
    ${({isActive})=> isActive && `border: 1px solid blue; font-color:blue; font-weight:bold;`}
`;