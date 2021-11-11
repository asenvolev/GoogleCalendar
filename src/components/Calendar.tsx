import { FC, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeMonthYear } from '../reducers/daysReducer';
import { useAppSelector } from '../store';
import Month from './Month';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdays = ['Mo','Tu','We','Th','Fr','Sa','Su']

const Calendar : FC = () => {
  const dispatch = useDispatch();
  const {selectedMonth: month, selectedYear: year} = useAppSelector(state => state.daysReducer)

  const daysOfWeek = weekdays.map((day, index) => {return <WeekDay key={index}>{day}</WeekDay>});

  const monthName = useMemo(()=> monthNames[(month) % 12], [month]);

  useEffect(()=>{

  })

  const onNextMonthClick = () => {
    if (month > 10) {
      dispatch(changeMonthYear({month:0, year:year+1}))
    }
    else { 
      dispatch(changeMonthYear({month:month+1, year}))
    }
  }

  const onPrevMonthClick = () => {
    if (month < 1) {
      dispatch(changeMonthYear({month:11, year:year-1}))

    }
    else { 
      dispatch(changeMonthYear({month:month-1, year}))
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
      <Month />
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