import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import './App.css';
import Calendar from './components/Calendar';
import EventsTable from './components/EventsTable';
import { setDays, getEvents } from './reducers/daysReducer';

const App : FC = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getEvents());
    dispatch(setDays())
  })

  return (
    <MainContainer>
      <Calendar/>
      <EventsTable/>
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.div`
  display: flex;
  flex-grow:1;
  `;