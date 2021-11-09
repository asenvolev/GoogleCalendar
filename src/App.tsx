import { useState } from 'react';
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

  return (
    <Calendar>
      <DaysOfWeekContainer>{daysOfWeek}</DaysOfWeekContainer>
      <Month month={month} year={year}/>
    </Calendar>
  );
}

export default App;

const Calendar = styled.div`
    max-width:210px;
`;

const DaysOfWeekContainer = styled.div`
    display: flex;
`;