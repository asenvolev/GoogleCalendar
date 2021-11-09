import { useState, useMemo } from 'react';
import styled from 'styled-components';
import './App.css';
import Day from './components/Day';
import Month from './components/Month';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdays = ['Mo','Tu','We','Th','Fr','Sa','Su']


function App() {
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth()+1);
  const [year, setYear] = useState<number>(today.getFullYear());

  const daysOfWeek = weekdays.map((day, index) => {return <Day key={index} date={day} />});

  const monthName = useMemo(()=> monthNames[(month-1) % 11], [month]);

  const onNextMonthClick = () => setMonth(m=>m+1);

  const onPrevMonthClick = () => setMonth(m=>m-1);

  return (
    <Calendar>
      <MonthSettings>
        <Heading>{monthName} {year}</Heading>
        <MonthControls>
          <ChangeMonthButton onClick={onPrevMonthClick}>&lt;</ChangeMonthButton>
          <ChangeMonthButton onClick={onNextMonthClick}>&gt;</ChangeMonthButton>
        </MonthControls>
      </MonthSettings>
      <DaysOfWeekContainer>{daysOfWeek}</DaysOfWeekContainer>
      <Month month={month} year={year}/>
    </Calendar>
  );
}

export default App;

const Calendar = styled.div`
    max-width:210px;
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
`;