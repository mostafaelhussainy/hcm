import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // fixedCharts: [{chartCode, value},{chartCode, value1, value2},{chartCode, value1, value2}}
    fixedCharts: [],
};

const fixedChartsSlice = createSlice({
    name: "fixedCharts",
    initialState,
    reducers: {
        update: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { update } = fixedChartsSlice.actions;
export default fixedChartsSlice.reducer;
