import { FC } from "react";
import styled from 'styled-components'
import { selectDateById } from "../../reducers/daysReducer";
import { useAppSelector } from "../../store";



const EventsTable : FC = () => {

    const selectedDate = useAppSelector((state)=> state.daysReducer.selectedDate);

    const eventsOnThisDate = useAppSelector((state)=> selectDateById(state,selectedDate));

    const eventsToRender = eventsOnThisDate && eventsOnThisDate.events.map((event) => 
        <Event>
            <EventTime>{event.date}</EventTime>
            <EventContent>{event.event}</EventContent>
        </Event>);

    return <EventsContainer>{eventsToRender}</EventsContainer>;
};

export default EventsTable;

const EventsContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    background-color:lightgrey;
`;

const Event = styled.div`
    display: flex;
    border: 1px solid black;
`

const EventTime = styled.div`
    display: flex;
    justify-content:center;
    width:20%;
    border-right: 1px solid black;
`;

const EventContent = styled.div`
    display: flex;
    width:70%;
`;