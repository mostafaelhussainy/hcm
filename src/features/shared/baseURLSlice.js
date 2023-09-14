import { createSlice } from "@reduxjs/toolkit";

const initialState = "https://yasdemo.civilsoft.org/HcmsCoreApi";
//const initialState="https://yasdemo.civilsoft.org/HcmsCoreDashboard";
export const loaderSlice = createSlice({
    name: "baseURL",
    initialState,
    reducer: {},
});

export default loaderSlice.reducer;
// LangCode: globalState.auth.systemLang
