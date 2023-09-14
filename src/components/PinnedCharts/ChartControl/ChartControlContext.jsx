import { createContext, useContext, useState, useReducer } from "react";

const ChartControlContext = createContext();

export const FilterProvider = ({ children }) => {
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
    const chartControlReducer = (state, action) => {
        switch (action.type) {
            case "GENERAL":
                return {
                    ...state,
                    chartName: action.chartName,
                    chartOrGrid: action.chartOrGrid,
                };
            case "CONDITIONS":
                return {
                    ...state,
                    yAxis: action,
                    xAxis: { groupById: "", conditionId: "" },
                };

            case "FILTER":
                return {
                    ...state,
                    filter: action.filter,
                };
            case "DRILL_DOWN":
                return {
                    ...state,
                    drillDownData: action.drillDownData,
                };
            case "RESET":
                return {
                    initialState,
                };
            default:
                return state;
        }
    };

    const [chartControl, setChartControl] = useReducer(
        chartControlReducer,
        initialState
    );
    return (
        <ChartControlContext.Provider value={{ chartControl, setChartControl }}>
            {children}
        </ChartControlContext.Provider>
    );
};

export const useChartControlContext = () => {
    return useContext(ChartControlContext);
};
