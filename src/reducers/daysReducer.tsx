import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Day } from '../models/Day';
import data from '../data.json'
import { EventsResponse } from '../models/Events';

export const getEvents = createAsyncThunk<EventsResponse, void>('days/getEvents', async () => {
    const res = data
    return res as EventsResponse;
});

const daysAdapter = createEntityAdapter<Day>({
    selectId: (day: Day) => day.date
});

interface DaysState {
    todayMonth: number;
    todayYear: number;
    today: number;
    month: number;
    year: number;
    status:string;
}

const initialState = daysAdapter.getInitialState<DaysState>({
    todayMonth: new Date().getMonth(),
    todayYear: new Date().getFullYear(),
    today: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    status: 'initial'
});

const defaultState = daysAdapter.upsertMany(initialState, 
    Array.from(
        {length: new Date(initialState.todayYear, initialState.todayMonth+1, 0).getDate()}, 
        (val, key) => { return {date:key+1, isToday:key+1 === initialState.today, isChosen:false, events:[]}}
    )
);

const daysSlice = createSlice({
    name: 'days',
    initialState: defaultState,
    reducers : {
        changeMonthYear(state, action){
            state.month = action.payload;
            const dateOfToday = state.month === state.todayMonth && state.year === state.todayYear ? state.today : -1;
            const daysCount = new Date(state.year, state.month+1, 0).getDate();
            const dates = Array.from({length: daysCount+1}, (val, key) => { return {date:key, isToday:key === dateOfToday, isChosen:false, events:[]}});
            dates.shift();
            daysAdapter.upsertMany(state, dates);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.pending, (state)=>{
            state.status = 'loading';
        });

        builder.addCase(getEvents.fulfilled, (state, action)=>{
            state.status = 'success';
            const events = action.payload.events;
            events.forEach(event => {
                const eventDate = new Date(event.date);
                const eventYear = eventDate.getFullYear();
                const eventMonth = eventDate.getMonth();
                if (eventYear === state.year && eventMonth === state.month) {
                    const dateOfEvent = eventDate.getDate();
                    const day = state.entities[dateOfEvent];
                    if (day) {
                        day.events.push(event)
                    }
                }
            })
        });

        builder.addCase(getEvents.rejected, (state)=>{
            state.status = 'failed';
        });
    }
});

export const {
    selectAll: selectAllDates,
    selectById: selectDateById,
    selectIds: selectAllDatesIds,
} = daysAdapter.getSelectors();

export const { changeMonthYear } = daysSlice.actions;

export default daysSlice.reducer;
