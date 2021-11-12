import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Day, Event } from '../models/Day';
import data from '../data.json'
import { EventsResponse } from '../models/Events';
import { RootState } from '../store';

export const getEvents = createAsyncThunk<EventsResponse, void>('days/getEvents', async () => {
    const res = data;
    return res as EventsResponse;
});

const datesAdapter = createEntityAdapter<Day>({
    selectId: (day: Day) => day.date
});

interface DaysState {
    todayDate: number;
    todayMonth: number;
    todayYear: number;
    selectedDate: number;
    selectedMonth: number;
    selectedYear: number;
    status:string;
}

const initialState = datesAdapter.getInitialState<DaysState>({
    todayDate: new Date().getDate(),
    todayMonth: new Date().getMonth(),
    todayYear: new Date().getFullYear(),
    selectedDate: new Date().getDate(),
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
    status: 'initial'
});

const defaultState = datesAdapter.upsertMany(initialState, 
    Array.from(
        {length: new Date(initialState.todayYear, initialState.todayMonth+1, 0).getDate()}, 
        (val, key) => { return {date:key+1, events:[]}}
    )
);

const datesSlice = createSlice({
    name: 'days',
    initialState: defaultState,
    reducers : {
        changeMonthYear(state, action){
            const {month,year} = action.payload;
            state.selectedMonth = month;
            state.selectedYear = year;
            const daysCount = new Date(state.selectedYear, state.selectedMonth+1, 0).getDate();
            const dates = Array.from({length: daysCount+1}, (val, key) => { return {date:key, events:[]}});
            dates.shift();
            datesAdapter.removeAll(state);
            datesAdapter.upsertMany(state, dates);
        },
        updateSelectedDate(state,action){
            state.selectedDate = action.payload;
        },
        addEventForSelectedDate(state,action){
            const {event, date} = action.payload;
            const dateToUpdate = state.entities[state.selectedDate];
            if (dateToUpdate) {
                dateToUpdate.events.push({event, date})
            }
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
                if (eventYear === state.selectedYear && eventMonth === state.selectedMonth) {
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
} = datesAdapter.getSelectors<RootState>(state=>state.daysReducer);

export const selectIsDateToday = (state:DaysState, date:number) => 
    state.selectedMonth === state.todayMonth &&
    state.selectedYear === state.todayYear &&
    state.todayDate === date;

export const selectIsDateChosen = (state:DaysState, date:number) => state.selectedDate === date;

export const { changeMonthYear, updateSelectedDate, addEventForSelectedDate } = datesSlice.actions;

export default datesSlice.reducer;
