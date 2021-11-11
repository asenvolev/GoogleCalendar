import { FC, useMemo } from "react";
import styled from 'styled-components'
import { useAppSelector } from "../store";
import ActiveDatesList from "./ActiveDatesList";
import Day from "./Day";

const Month : FC = () => {

    const {selectedMonth : month, selectedYear : year} = useAppSelector(state => state.daysReducer)

    const getDaysOfMonth = (month: number,year: number): number => {
        return (new Date(year, month+1, 0).getDate());
    };

    const getFirstWeekDayOfMonth = (month: number,year: number) : number => {
        return new Date(year, month, 1).getDay();
    };

    const getDaysArrayFromMonth = (daysToReturn: number, startDate: number, month: number, year:number) : Array<JSX.Element> => {
        return Array.from({length:daysToReturn}, (val, key) => 
        {
            return <Day key={`${year}-${month}-${key+startDate}`} date={key+startDate} month={month} year={year}/>
        });
    };

    const daysFromPrevMonth = useMemo(() : Array<JSX.Element> => {
        const daysToReturn = getFirstWeekDayOfMonth(month,year);;

        const prevMonth = month -1;
        const lastDateOfPrevMonth = getDaysOfMonth(prevMonth,year);
        
        const startDate = lastDateOfPrevMonth - daysToReturn + 1;
        return getDaysArrayFromMonth(daysToReturn, startDate, prevMonth, year);
    },[month,year]);

    const daysFromNextMonth = useMemo(() : Array<JSX.Element> => {
        const daysToReturn = 7 - (getFirstWeekDayOfMonth(month+1,year));

        return getDaysArrayFromMonth(daysToReturn, 1, month+1, year);
    },[month, year]);

    return (
        <MonthContainer>
            {daysFromPrevMonth}
            <ActiveDatesList/>
            {daysFromNextMonth}
        </MonthContainer>);
};

export default Month;

const MonthContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
`;