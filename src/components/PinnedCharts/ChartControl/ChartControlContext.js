import { createContext, useContext, useReducer, useState } from "react";

const ChartControlContext = createContext();

export const FilterProvider = ({ children }) => {
    const initialState = {
        chartName: "",
        chartOrGrid: "",
        chartType: "",
        yAxis: { groupById: "", conditionId: "" },
        xAxis: { groupById: "", conditionId: "" },
        gridColumns: [],
        filter: [],
    };
    const chartControlReducer = () => {};
    // const [chartControl, setChartControl] = useReducer(
    //     chartControlReducer,
    //     initialState
    // );
    const [chartControl, setChartControl] = useState(initialState);
    return (
        <ChartControlContext.Provider value={{ chartControl, setChartControl }}>
            {children}
        </ChartControlContext.Provider>
    );
};

export const useChartControlContext = () => {
    return useContext(ChartControlContext);
};
