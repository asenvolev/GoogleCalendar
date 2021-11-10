import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DateEvent, EventsResponse } from '../models/Events'
import data from '../data.json'

export const getEvents = createAsyncThunk<EventsResponse, void>('events/getEvents', async () => {
    const res = data
    return res as EventsResponse;
});

interface EventsState {
    events: DateEvent[];
    dateToShow:number;
    monthToShow:number;
    yearToShow:number;
    status:string;
}

const initialState: EventsState = {
    events:[],
    dateToShow: new Date().getDate(),
    monthToShow: new Date().getMonth(),
    yearToShow: new Date().getFullYear(),
    status: 'initial'
}

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers : {
        addEvent(state, action) {
            state.events.push(action.payload);
        },
        removeEvent(state, action) {
            const index = state.events.findIndex(x=>x.date === action.payload);
            state.events = state.events.splice(index, 1);
        },
        updateDateForShow(state,action) {
            const { date, month, year } = action.payload;
            state.dateToShow = date;
            state.monthToShow = month;
            state.yearToShow = year;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.pending, (state)=>{
            state.status = 'loading';
            state.events = [];
        });

        builder.addCase(getEvents.fulfilled, (state, action)=>{
            state.status = 'success';
            state.events = action.payload.events;
        });

        builder.addCase(getEvents.rejected, (state)=>{
            state.status = 'failed';
        });
    }
});

export const selectEventsForDate = (state:EventsState, date:string) => state.events.filter(event => event.date === date);

export const selectDayIsSelected = (state:EventsState, date:number, month:number, year:number) => 
    state.dateToShow === date && state.monthToShow === month && state.yearToShow === year;

export const { addEvent, removeEvent, updateDateForShow } = eventsSlice.actions;

export default eventsSlice.reducer;
