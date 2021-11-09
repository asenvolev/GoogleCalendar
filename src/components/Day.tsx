import { FC } from "react";
import styled from 'styled-components'

interface Props{
    date: string,
    isToday?: boolean
}

const Day : FC<Props> = ({date, isToday = false}) => {

    return <DayContainer isActive={isToday}>{date}</DayContainer>;
};

export default Day;

const DayContainer = styled.div<{isActive: boolean}>`
    width:30px;
    height:30px;
    text-align:center;
    ${({isActive})=> isActive && `background-color:red;`}
`;