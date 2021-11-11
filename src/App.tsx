import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import './App.css';
import Calendar from './components/Calendar';
import EventsTable from './components/EventsTable';
import { getEvents } from './reducers/daysReducer';
import { useAppSelector } from './store';

const App : FC = () => {
  const dispatch = useDispatch();
  const {selectedMonth : month, selectedYear : year} = useAppSelector(state => state.daysReducer)

  useEffect(()=>{
    dispatch(getEvents());
  },[dispatch, month, year])

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