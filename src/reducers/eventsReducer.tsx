import { createSlice } from '@reduxjs/toolkit';

export interface Event {
    date: Date;
    event: string;
}

interface EventsState {
    events: Event[];
}

const initialState: EventsState = {
    events:[]
}

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers : {
        addEvent(state, action) {
            state.events.push(action.payload);
        }
    },
    extraReducers: {}
});

export const { addEvent } = eventsSlice.actions;

export default eventsSlice.reducer;