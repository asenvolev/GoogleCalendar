import { FC, useState, useMemo } from 'react';
import styled from 'styled-components';
import Month from './Month';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdays = ['Mo','Tu','We','Th','Fr','Sa','Su']

const Calendar : FC = () => {
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth()+1);
  const [year, setYear] = useState<number>(today.getFullYear());

  const daysOfWeek = weekdays.map((day, index) => {return <WeekDay key={index}>{day}</WeekDay>});

  const monthName = useMemo(()=> monthNames[(month-1) % 12], [month]);

  const onNextMonthClick = () => {
    if (month > 11) {
      setMonth(1);
      setYear(y=>y+1);
    }
    else { 
      setMonth(m=>m+1);
    }
  }

  const onPrevMonthClick = () => {
    if (month < 2) {
      setMonth(12);
      setYear(y=>y-1);
    }
    else { 
      setMonth(m=>m-1);
    }
  }

  return (
    <CalendarContainer>
      <MonthSettings>
        <Heading>{monthName} {year}</Heading>
        <MonthControls>
          <ChangeMonthButton onClick={onPrevMonthClick}>&lt;</ChangeMonthButton>
          <ChangeMonthButton onClick={onNextMonthClick}>&gt;</ChangeMonthButton>
        </MonthControls>
      </MonthSettings>
      <DaysOfWeekContainer>{daysOfWeek}</DaysOfWeekContainer>
      <Month month={month} year={year}/>
    </CalendarContainer>
  );
}

export default Calendar;

const CalendarContainer = styled.div`
    max-width:212px;
`;

const MonthSettings = styled.div`
    display:flex;
    width:100%;
`;

const Heading = styled.div`
    font-size:18px;
`;

const MonthControls = styled.div`
    display:flex;
    justify-content:flex-end;
    flex-grow:1;
`

const ChangeMonthButton = styled.div`
    display: flex;
    background-color: blue;
    width:30px;
    justify-content:center;
    border-radius:50%;
`;

const DaysOfWeekContainer = styled.div`
    display: flex;
    justify-content:space-around;
`;

const WeekDay = styled.div`
    display: flex;
`;