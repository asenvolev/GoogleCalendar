import { FC, useMemo } from "react";
import styled from 'styled-components'

interface Props{
    date: number,
    month:number;
    year:number;
}

const Day : FC<Props> = ({date, month, year}) => {

    const isToday = useMemo(() : boolean=>{
        const today = new Date();
        return date === today.getDate() && month-1 === today.getMonth() && year === today.getFullYear();
    },[month, year, date])

    return <DayContainer isActive={isToday}>{date}</DayContainer>;
};

export default Day;

const DayContainer = styled.div<{isActive: boolean}>`
    width:30px;
    height:30px;
    text-align:center;
    ${({isActive})=> isActive && `background-color:red;`}
`;