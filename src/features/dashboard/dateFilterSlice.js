import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
// const todayFullDate = `As of today ${today.getDate()}/${
//     today.getMonth() + 1
// }/${today.getFullYear()}`;
// const todayFullDate = `${today.getDate()}/${
//     today.getMonth() + 1
// }/${today.getFullYear()}`;

const initialState = null;

const dateFilter = createSlice({
    name: "dateFilter",
    initialState,
    reducers: {
        update: (state, action) => {
            return { ...state, ...action.payload };
        },
        reset: (state, action) => {
            return initialState;
        }, 
    },
}); 

export const { update, reset } = dateFilter.actions;
export default dateFilter.reducer;
