import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    chartName: { englishName: "", arabicName: "" },
    chartOrGrid: "",
    chartType: "",
    yAxis: { groupById: "", conditionId: "" },
    xAxis: { groupById: "", conditionId: "" },
    gridColumns: [],
    AsOfDate: "",
    filter: [],
    drillDownData: {
        xAxisGroupId: "",
        xAxisGroupValue: "",
        yAxisGroupId: "",
        yAxisGroupValue: "",
    },
};

const chartControlSlice = createSlice({
    name: "chartControl",
    initialState,
    reducers: {
        general: (state, action) => {
            return { 
                ...state,
                chartName: action.payload.chartName,
                chartOrGrid: action.payload.chartOrGrid,
            };
        },
        conditions: (state, action) => {
            return {
                ...state,
                chartType: action.payload.chartType.toLowerCase(),
                xAxis: action.payload.xAxis,
                yAxis: action.payload.yAxis,
            };
        },
        filter: (state, action) => {
            // console.log("apply working!");
            return {
                ...state,
                filter: action.payload,
            };
        },
        drillDown: (state, action) => {
            return {
                ...state,
                drillDownData: action.payload.drillDownData,
            };
        },
        updategridColumns: (state, action) => {
            return {
                ...state,
                gridColumns: action.payload,
            };
        },
        reset: (state) => {
            return {
                ...state,
                initialState,
            };
        },
    },
});

export const { general, conditions, filter, drillDown,updategridColumns } =
    chartControlSlice.actions;
export default chartControlSlice.reducer;
