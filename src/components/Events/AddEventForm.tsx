import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addEventForSelectedDate } from "../../reducers/daysReducer";
import { useAppSelector } from "../../store";

const AddEventForm : FC = () => {
    const {selectedDate:date, selectedMonth : month, selectedYear : year} = useAppSelector(state => state.daysReducer)
    const [content, setContent] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const dispatch = useDispatch();
    
    const onTimeChanged = (e: React.ChangeEvent<HTMLInputElement> ) => setTime(e.target.value);
    const onContentChanged = (e: React.ChangeEvent<HTMLInputElement> ) => setContent(e.target.value);
    const onAddEventClicked = () => {
        // parse date and validate date
        const eventDate = new Date(year,month,date).toJSON() //hour, min
        dispatch(addEventForSelectedDate({event:content, date:eventDate}))
        setTime('');
        setContent('');
    };

    return (
    <DateEventContainer>
        <DateInputHolder>
            <label> Event Time:</label>
            <input
                type="text"
                value={time}
                placeholder={'HH:mm:ss'}
                onChange={onTimeChanged} 
            />
        </DateInputHolder>
        <EventInputHolder>
            <label> Event Content:</label>
            <input
                type="text"
                value={content}
                onChange={onContentChanged} 
            />
        </EventInputHolder>
        <button type="button" onClick={onAddEventClicked} >Add Event</button>
    </DateEventContainer>

    );
}

export default AddEventForm;

const DateEventContainer = styled.div`
    display:flex;
    flex-grow:1;
    justify-content:center;
`;

const DateInputHolder = styled.div`
    display: flex;
    justify-content:center;
    width:20%;
`;

const EventInputHolder = styled.div`
    display: flex;
    width:70%;
`;