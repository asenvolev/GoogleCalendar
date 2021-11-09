import { FC, Fragment } from "react";
import styled from 'styled-components'
import Day from "./Day";

const weekdays = ['Mo','Tu','We','Th','Fr','Sa','Su']

interface Props{
}

const Month : FC<Props> = () => {

    const getDaysOfMonth = (month: number,year: number): number => {
        return new Date(year, month, 0).getDate();
    };

    const getFirstWeekDayOfMonth = (month: number,year: number) : number => {
        return new Date(year, month-1, 1).getDay();
    }

    const getDaysFromPrevMonth = (month:number, year:number) : Array<JSX.Element> => {
        const daysToReturn = getFirstWeekDayOfMonth(month,year) -1;
        const lastDateOfPrevMonth = getDaysOfMonth(month-1,year);
        const startDate = lastDateOfPrevMonth - daysToReturn;
        return Array.from({length:daysToReturn}, (val, key) => 
        {
            return <Day key={`${key+startDate}/${month}/${year}`} date={`${key+startDate}`}/>
        });
    }

    const getDaysFromNextMonth = (month:number, year:number) : Array<JSX.Element> => {
        const daysToReturn = 7 - (getFirstWeekDayOfMonth(month+1,year)-1);

        return Array.from({length:daysToReturn}, (val, key) => 
        {
            return <Day key={`${key+1}/${month}/${year}`} date={`${key+1}`}/>
        });
    }

    const today = new Date().getDate();
    const month = new Date().getMonth()+1;
    const year = new Date().getFullYear();

    const daysOfWeek = weekdays.map((day, index) => {return <Day key={index} date={day} />});

    const daysFromPrevMonth = getDaysFromPrevMonth(month, year);

    const daysFromMonth = Array.from({length: getDaysOfMonth(month,year)}, (val, key) => 
    {
        return <Day key={`${key+1}/${month}/${year}`} date={`${key+1}`} isToday={today === key+1}/>
    });

    const daysFromNextMonth = getDaysFromNextMonth(month, year);

    return (
        <Fragment>
            <DaysOfWeekContainer>{daysOfWeek}</DaysOfWeekContainer>
            <MonthContainer>{[daysFromPrevMonth,daysFromMonth,daysFromNextMonth]}</MonthContainer>
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