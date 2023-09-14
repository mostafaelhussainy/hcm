import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showMainLoader: false,
    showSectionLoader: true,
};

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setMainLoader: (state, action) => {
            state.showMainLoader = action.payload;
        },
        setSectionLoader: (state, action) => {
            state.showSectionLoader = action.payload;
        },
    },
});

export const { setMainLoader, setSectionLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
