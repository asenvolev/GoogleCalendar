import { FC } from "react";
import styled from 'styled-components'
import { selectDateById } from "../reducers/daysReducer";
import { useAppSelector } from "../store";



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
`;

const Event = styled.div`
    display: flex;
`

const EventTime = styled.div`
    display: flex;
    width:30%;
`;

const EventContent = styled.div`
    display: flex;
    width:70%;
`;
