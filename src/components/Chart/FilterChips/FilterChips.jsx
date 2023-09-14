import { useState, useEffect } from "react";
import { Chip, Stack, Tooltip } from "@mui/material";
import { usePinnedChartsContext } from "../../PinnedCharts/PinnedChartsContext";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function FilterChips({ data, isPinned, setChartData }) {
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.userToken);
    const globalState = useSelector((state) => state);
    const { pinnedChart, setPinnedChart } = usePinnedChartsContext();
    useEffect(() => {
        console.log("data from FilterChips", data);
        console.log("isPinned from FilterChips", isPinned);
    }, [data, isPinned]);
    const handleDelete = (id) => {
        let columnsArray = [];
        globalState.dashboardMain.gridColoumns.filter((obj) => {
            if (obj.systemDefined) {
                columnsArray.push(obj.groupId);
            }
        });

        let gridDataCheck = data.gridData;

        for (const col in gridDataCheck["header"]) {
            if (!columnsArray.includes(gridDataCheck["header"][col].id)) {
                columnsArray.push(gridDataCheck["header"][col].id);
            }
        }
        const body = {
            asOfDate: globalState.asOfDate.asOfDate.substr(
                globalState.asOfDate.asOfDate.indexOf("-") + 1
            ),
            moduleId: globalState.dashboardMain.selectedModuleId,
            dateFilter: data.dateFilter,
            filter: data.filter.filter((filter) => filter.filterId !== id),
            chartName: data.chartName.englishName
                ? data.chartName
                : globalState.chartControls.chartName,
            gridColumns: columnsArray,
            chartOrGrid: data.chartOrGrid
                ? data.chartOrGrid
                : globalState.chartControls.chartOrGrid.toLowerCase(),
            chartType: isPinned
                ? data.chartType
                : globalState.chartControls.chartType.toLowerCase(),
            yAxis: data.yAxis.groupById
                ? data.yAxis
                : globalState.chartControls.yAxis,
            xAxis: data.xAxis.groupById
                ? data.xAxis
                : globalState.chartControls.xAxis,
            selectedLocations: globalState.locationTree.selectedLocations,
            Page: 1,
        };

        fetch(`${globalState.baseURL}/Dashboard/PreviewCahrt`, {
            method: "POST",
            headers: {
                LangCode: globalState.auth.systemLang,
                UserToken: token,
                Accept: "application.json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.isAuthorized) {
                    return navigate("/notAuthorized");
                }
                if (isPinned) {
                    setChartData((prevChartData) => data);
                } else {
                    setPinnedChart((prevPinnedChart) => {
                        return {
                            ...prevPinnedChart,
                            previewData: {
                                chartName: data?.data?.chartName || "",
                                chartOrGrid: data?.data?.chartOrGrid || "",
                                chartType:
                                    data?.data?.chartType.toLowerCase() || "",
                                yAxis: data?.data?.yAxis || "",
                                yAxisName: data?.data?.yAxisName || "",
                                xAxis: data?.data?.xAxis || "",
                                xAxisName: data?.data?.xAxisName || "",
                                data: data?.data?.data || "",
                                dateFilter: data?.data.dateFilter || null,
                                gridData: data?.data?.gridData || "",
                                numberOfGridRows:
                                    data?.data?.numberOfGridRows || 0,
                                filter: data?.data?.filter || [],
                            },
                        };
                    });
                }
            });
    };
    const handleDeleteFilterDate = () => {
        let columnsArray = [];
        globalState.dashboardMain.gridColoumns.filter((obj) => {
            if (obj.systemDefined) {
                columnsArray.push(obj.groupId);
            }
        });
        let gridDataCheck = data.gridData;
        for (const col in gridDataCheck["header"]) {
            if (!columnsArray.includes(gridDataCheck["header"][col].id)) {
                columnsArray.push(gridDataCheck["header"][col].id);
            }
        }
        const body = {
            asOfDate: globalState.asOfDate.asOfDate.substr(
                globalState.asOfDate.asOfDate.indexOf("-") + 1
            ),
            moduleId: globalState.dashboardMain.selectedModuleId,
            filter: data.filter,
            dateFilter: null,
            chartName: data.chartName.englishName
                ? data.chartName
                : globalState.chartControls.chartName,
            gridColumns: columnsArray,
            chartOrGrid: data.chartOrGrid
                ? data.chartOrGrid
                : globalState.chartControls.chartOrGrid.toLowerCase(),
            chartType: data.chartType
                ? data.chartType.toLowerCase()
                : globalState.chartControls.chartType.toLowerCase(),
            yAxis: data.yAxis.groupById
                ? data.yAxis
                : globalState.chartControls.yAxis,
            xAxis: data.xAxis.groupById
                ? data.xAxis
                : globalState.chartControls.xAxis,
            selectedLocations: globalState.locationTree.selectedLocations,
            Page: 1,
        };
        fetch(`${globalState.baseURL}/Dashboard/PreviewCahrt`, {
            method: "POST",
            headers: {
                LangCode: globalState.auth.systemLang,
                UserToken: token,
                Accept: "application.json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.isAuthorized) {
                    return navigate("/notAuthorized");
                }
                if (isPinned) {
                    setChartData((prevChartData) => data);
                } else {
                    setPinnedChart((prevPinnedChart) => {
                        return {
                            ...prevPinnedChart,
                            previewData: {
                                chartName: data?.data?.chartName || "",
                                chartOrGrid: data?.data?.chartOrGrid || "",
                                chartType:
                                    data?.data?.chartType.toLowerCase() || "",
                                yAxis: data?.data?.yAxis || "",
                                yAxisName: data?.data?.yAxisName || "",
                                xAxis: data?.data?.xAxis || "",
                                xAxisName: data?.data?.xAxisName || "",
                                data: data?.data?.data || "",
                                dateFilter: data?.dateFilter || null,
                                gridData: data?.data?.gridData || "",
                                numberOfGridRows:
                                    data?.data?.numberOfGridRows || "",
                                filter: data?.data?.filter || [],
                            },
                        };
                    });
                }
            });
    };
    return (
        <Stack className="preview-popup__filters" direction="row" spacing={1}>
            {/*{data?.filter.length === 0 && data?.dateFilter === null ? (*/}
            {/*    <h2>No filters</h2>*/}
            {/*) : null}*/}
            {data &&
                data.filter &&
                data.filter.length > 0 &&
                data.filter.map(
                    (element) =>
                        element.filterName && (
                            <Tooltip
                                key={element.filterId}
                                title={element.filterValueNames}>
                                <Chip
                                    label={element.filterName}
                                    onDelete={() =>
                                        handleDelete(element.filterId)
                                    }
                                />
                            </Tooltip>
                        )
                )}
            {data?.dateFilter &&
                data?.dateFilter.filterId !== "Custom date" && (
                    <>
                        <Tooltip title={data?.dateFilter.filterId}>
                            <Chip
                                label="Date"
                                onDelete={() => handleDeleteFilterDate()}
                            />
                        </Tooltip>
                    </>
                )}
            {data?.dateFilter &&
                data?.dateFilter.filterId === "Custom date" && (
                    <>
                        <Tooltip
                            title={
                                "Custom date: " +
                                data?.dateFilter.filterValue1 +
                                ", " +
                                data?.dateFilter.filterValue2
                            }>
                            <Chip
                                label="Date"
                                onDelete={() => handleDeleteFilterDate()}
                            />
                        </Tooltip>
                    </>
                )}
        </Stack>
    );
}

export default FilterChips;
