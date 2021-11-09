import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import eventsReducer from "./reducers/eventsReducer";

export const rootReducer = combineReducers({
    eventsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({ reducer: rootReducer });

export default store;