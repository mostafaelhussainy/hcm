import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
// const todayFullDate = `As of today ${today.getDate()}/${
//     today.getMonth() + 1
// }/${today.getFullYear()}`;
const todayFullDate = `${today.getMonth() + 1}-${today.getFullYear()}`;

const initialState = {
    asOfDate: todayFullDate,
};

const asOfDateSlice = createSlice({
    name: "asOfDate",
    initialState,
    reducers: { 
        update: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});
 
export const { update } = asOfDateSlice.actions;
export default asOfDateSlice.reducer;
