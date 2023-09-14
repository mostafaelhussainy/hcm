import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // modules: [{moduleName, moduleID},....],
    // selectedModule: {moduleName, moduleID},
    modules: [],
    selectedModuleID: {},
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        updateModules: (state, action) => {
            return { ...state, ...action.payload };
        },
        updateSelectedModule: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { update } = modulesSlice.actions;
export default modulesSlice.reducer;
