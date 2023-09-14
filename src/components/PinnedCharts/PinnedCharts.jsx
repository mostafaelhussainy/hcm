import React, { useState, useEffect, useRef } from "react";
import PinnedChartWrapper from "./Chart/PinnedChartWrapper";
import ChartControl from "./ChartControl/ChartControl";
import { FilterProvider } from "./ChartControl/Tabs/FilterTab/FilterContext";
import ChartPrev from "../ChartPrev/ChartPrev";
import { useSelector, useDispatch } from "react-redux";
import "./pinned-charts.scss";
import { usePinnedChartsContext } from "./PinnedChartsContext.js";
// import { update } from "../../features/dashboard/dateFilterSlice";
import { update } from "../../features/dashboard/dateFilterSlice";

function PinnedCharts() {
    const pinnedChartsGlobalState = useSelector((state) => state.pinnedCharts);
    const [chartControlOpen, setChartControlOpen] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [renderedCharts, setRenderedCharts] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [pinnedChartData, setPinnedChartData] = useState(null);
    const [chartId, setChartId] = useState(null);
    const [closeChartControl, setCloseChartControl] = useState(() => {});

    const specialDateDispatcher = useDispatch();
    const toggleChartControl = (open, tab, data, chartId) => (event) => {
        
        if ( 
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setCurrentTab(tab);
        setChartControlOpen(open);
        if ((data, chartId)) {
            setPinnedChartData(data);
            setChartId(chartId);
        }
        console.log("data from toggleChartControl", data);
        const filterObj = data?.data?.dateFilter || null;

        if (filterObj !== null) {
            specialDateDispatcher(
                update({
                    filterName: filterObj.filterName,
                    filterId: filterObj.filterId,
                    filterDataType: "special-date",
                    filterType:
                        filterObj.filterName === "Custom date"
                            ? "range"
                            : "value",
                    filterValue1: filterObj.filterValue1,
                    filterValue2: filterObj.filterValue2,
                })
            );
        }
        // if (data && data.data && data.data.filter) {
        //     data.data.filter.map((filter) => {
        //         specialDateDispatcher(
        //             update({
        //                 filterName: filter.filterName,
        //                 filterId: filter.filterId,
        //                 filterDataType: "special-date",
        //                 filterType:
        //                     filter.filterName === "Custom date"
        //                         ? "range"
        //                         : "value",
        //                 filterValue1: filter.filterValue1,
        //                 filterValue2: filter.filterValueNames,
        //                 // filterValue2: filter.filterValue2,
        //                 // filterValueNames: filter.filterValueNames,
        //             })
        //         );
        //     });
        // }
    };

    useEffect(() => {
        const renderedCharts = [];
        let chartsToRender;
        if (pinnedChartsGlobalState.length < 4) {
            chartsToRender = Math.max(4, pinnedChartsGlobalState.length);
        } else {
            if (pinnedChartsGlobalState.length % 2 === 0) {
                chartsToRender = pinnedChartsGlobalState.length + 2;
            } else {
                chartsToRender = pinnedChartsGlobalState.length + 1;
            }
        }

        for (let i = 0; i < chartsToRender; i++) {
            const id =
                i < pinnedChartsGlobalState.length
                    ? pinnedChartsGlobalState[i]
                    : false;

            renderedCharts.push(
                <PinnedChartWrapper
                    key={i}
                    id={id}
                    toggleChartControl={toggleChartControl}
                    setChartControlOpen={setChartControlOpen}
                    // setCurrentTab={setCurrentTab}
                />
            );
        }

        setRenderedCharts(renderedCharts);
    }, [pinnedChartsGlobalState]);
    const closeChartControlRef = useRef();

    return (
        <section id="pinned-charts">
            {renderedCharts}
            {/* <PinnedChartsProvider> */}
            <FilterProvider>
                <ChartControl
                    chartControlOpen={chartControlOpen}
                    setChartControlOpen={setChartControlOpen}
                    setOpenPreview={setOpenPreview}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    pinnedChartData={pinnedChartData}
                    setPinnedChartData={setPinnedChartData}
                    chartId={chartId}
                    setCloseChartControl={setCloseChartControl}
                />
                <ChartPrev
                    openPreview={openPreview}
                    setOpenPreview={setOpenPreview}
                    pinnedChartData={pinnedChartData}
                    chartId={chartId}
                    closeChartControl={closeChartControlRef.current} // Use the function from the ref
                />
            </FilterProvider>
            {/* </PinnedChartsProvider> */}
        </section>
    );
}
export default PinnedCharts;
