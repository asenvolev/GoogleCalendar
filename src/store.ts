import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import daysReducer from "./reducers/daysReducer";

export const rootReducer = combineReducers({
    daysReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({ reducer: rootReducer });

export default store;