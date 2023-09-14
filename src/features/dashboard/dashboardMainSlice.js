import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chartTypes:[],
    filter:[],
    gridColoumns:[],
    groupByCondition:[],
    groups:[],
    modules:[],
    selectedModuleId:null,
    chartsIds:[],
    showHideColsPoup:false,
    currentCheckedGridCols:{}
};

const dashboardMainSlice = createSlice({
    name: "dashboardMain",
    initialState,
    reducers: {
        updateDashboardMain: (state, action) => {
            state.chartTypes = action.payload.chartTypes;
            state.filter = action.payload.filter;
            state.gridColoumns = action.payload.gridColoumns;
            state.groupByCondition = action.payload.groupByCondition;
            state.groups = action.payload.groups;
            state.modules = action.payload.modules;
            state.selectedModuleId = action.payload.selectedModuleId;
            state.chartsIds = action.payload.charts;
        },
        updateSlectedModule:(state,action)=>{
            state.groups=action.payload.data.groups;
            state.filter=action.payload.data.filter;
            state.gridColoumns=action.payload.data.gridColoumns;
            state.chartsIds=action.payload.data.charts;
            state.selectedModuleId=action.payload.id;
        },
        updateSelectedModule: (state, action) => {
            return { ...state, ...action.payload };
        },
        updateShowHideColsPoup: (state, action) => {
            state.showHideColsPoup=action.payload;
        },
        updateCurrentCheckedGridCols: (state, action) => {
            state.currentCheckedGridCols={...state.currentCheckedGridCols ,[action.payload.id]:action.payload.data};
        },
    },
});

export const { updateDashboardMain,updateSelectedModule,updateShowHideColsPoup,updateCurrentCheckedGridCols,updateSlectedModule } = dashboardMainSlice.actions;
export default dashboardMainSlice.reducer;
