import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    activeDrones: [],
    pastDrones: [],
    dronesHistory: [],
}

const dronesHistorySlice = createSlice({
    name: 'dronesHistorySlice',
    initialState,
    reducers: {
        setActiveDrones: (state, action) => {
            state.activeDrones.push(action.payload);
        },
        removeActiveDrone: (state, action) => {
            state.activeDrones = state.activeDrones.filter((drone) => drone.droneId !== action.payload);
        },
        setPastDrones: (state, action) => {
            state.pastDrones = action.payload;
        },
        addDroneToHistory: (state, action) => {
            state.dronesHistory.push(action.payload);
        },
    },
});

const {actions, reducer: dronesHistoryReducer} = dronesHistorySlice;

const dronesHistoryActions = {
    ...actions,
}

export {
    dronesHistoryActions,
    dronesHistoryReducer,
}