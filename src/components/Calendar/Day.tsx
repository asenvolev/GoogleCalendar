import { FC } from "react";
import { useDispatch } from "react-redux";
import styled from 'styled-components'
import { changeMonthYear } from "../../reducers/daysReducer";

interface Props{
    date: number,
    month:number;
    year:number;
}

const Day : FC<Props> = ({date, month, year}) => {

    const dispatch = useDispatch();

    const onDayClicked = () => {
        dispatch(changeMonthYear({month,year}));
    }

    return <DayContainer onClick={onDayClicked}>{date}</DayContainer>;
};

export default Day;

const DayContainer = styled.div`
    width:30px;
    height:30px;
    text-align:center;
    cursor: pointer;
`;