import { FC, Fragment, useCallback, useMemo } from "react";
import styled from 'styled-components'
import Day from "./Day";

const weekdays = ['Mo','Tu','We','Th','Fr','Sa','Su']

interface Props{
    month:number;
    year:number;
}

const Month : FC<Props> = ({year, month}) => {

    const getDaysOfMonth = (month: number,year: number): number => {
        return new Date(year, month, 0).getDate();
    };

    const getFirstWeekDayOfMonth = (month: number,year: number) : number => {
        return new Date(year, month-1, 1).getDay();
    };

    const getDaysArrayFromMonth = (daysToReturn: number, startDate: number, month: number, year:number) : Array<JSX.Element> => {
        return Array.from({length:daysToReturn}, (val, key) => 
        {
            return <Day key={`${key+startDate}/${month}/${year}`} date={`${key+startDate}`}/>
        });
    }

    const getDaysFromPrevMonth = useCallback((month:number, year:number) : Array<JSX.Element> => {
        const daysToReturn = getFirstWeekDayOfMonth(month,year) -1;
        const lastDateOfPrevMonth = getDaysOfMonth(month-1,year);
        const startDate = lastDateOfPrevMonth - daysToReturn;
        return getDaysArrayFromMonth(daysToReturn, startDate, month, year);
    },[])

    const getDaysFromNextMonth = useCallback((month:number, year:number) : Array<JSX.Element> => {
        const daysToReturn = 7 - (getFirstWeekDayOfMonth(month+1,year)-1);

        return getDaysArrayFromMonth(daysToReturn, 1, month+1, year);
    },[]);

    const daysOfWeek = weekdays.map((day, index) => {return <Day key={index} date={day} />});

    const daysOfMonth = useMemo(()=>{
        const daysFromPrevMonth = getDaysFromPrevMonth(month, year);

        const daysFromThisMonth = getDaysArrayFromMonth( getDaysOfMonth(month,year), 1, month, year)
    
        const daysFromNextMonth = getDaysFromNextMonth(month, year);

        return [daysFromPrevMonth, daysFromThisMonth, daysFromNextMonth];
    },[month, year, getDaysFromPrevMonth, getDaysFromNextMonth]);

    return (
        <Fragment>
            <DaysOfWeekContainer>{daysOfWeek}</DaysOfWeekContainer>
            <MonthContainer>{daysOfMonth}</MonthContainer>
        </Fragment>);
};

export default Month;

const DaysOfWeekContainer = styled.div`
    display: flex;
    max-width:210px;
`;

const MonthContainer = styled(DaysOfWeekContainer)`
    flex-wrap:wrap;
`;