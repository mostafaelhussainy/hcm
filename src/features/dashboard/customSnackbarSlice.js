import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
// const todayFullDate = `As of today ${today.getDate()}/${
//     today.getMonth() + 1
// }/${today.getFullYear()}`;

const initialState = {
    open: false,
    message: "",
    severity: "",
};

const customSnackbarSlice = createSlice({
    name: "customSnackbar",
    initialState,
    reducers: {
        updateSnackMsg: (state, action) => {
            return action.payload;
        },
    },
});

export const { updateSnackMsg } = customSnackbarSlice.actions;
export default customSnackbarSlice.reducer;
