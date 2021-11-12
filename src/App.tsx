import { FC, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import EventsTable from './components/Events/EventsTable';
import AddEventForm from './components/Events/AddEventForm';
import { getEvents } from './reducers/daysReducer';
import { useAppSelector } from './store';

const App : FC = () => {
  const dispatch = useDispatch();
  const {selectedMonth : month, selectedYear : year} = useAppSelector(state => state.daysReducer)

  useEffect(()=>{
    dispatch(getEvents());
  },[dispatch, month, year])

  return (
    <Fragment>
    <MainContainer>
      <Calendar/>
        <EventsTable/>
    </MainContainer>
    <AddEventForm/>
    </Fragment>
  );
}

export default App;

const MainContainer = styled.div`
  display: flex;
  flex-grow:1;
  align-items:stretch;
  `;

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  `;