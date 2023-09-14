import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { usePinnedChartsContext } from "../../PinnedCharts/PinnedChartsContext";
import { Switch, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SwitchChartGrid({ data }) {
    const token = useSelector((state) => state.auth.userToken);
    const globalState = useSelector((state) => state);
    const { pinnedChart, setPinnedChart } = usePinnedChartsContext();
    const [isChart, setIsChart] = useState(data.chartOrGrid === "chart");
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsDisabled(true);
        setIsChart((prevIsChart) => !prevIsChart);
        let columnsArray = [];
        globalState.dashboardMain.gridColoumns.filter((obj) => {
            if (obj.systemDefined) {
                columnsArray.push(obj.groupId);
            }
        });
        let gridDataCheck = {};

        if (data.success !== undefined) {
            gridDataCheck = data?.data?.gridData;
        } else {
            gridDataCheck = data.gridData;
        }
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
            filter: data?.filter,
            dateFilter: data.dateFilter,
            chartName: data.chartName.englishName
                ? data.chartName
                : globalState.chartControls.chartName,
            gridColumns: columnsArray,
            chartOrGrid: data?.chartOrGrid === "chart" ? "grid" : "chart",
            chartType: globalState.chartControls.chartType.toString(),
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
                            gridData: data?.data?.gridData || "",
                            numberOfGridRows:
                                data?.data?.numberOfGridRows || "",
                            filter: data?.data?.filter || [],
                            Page: data?.data?.Page || 1,
                            dateFilter: data?.data?.dateFilter || null,
                        },
                    };
                });
                setIsDisabled(false);
            });
    };
    return (
        <div className="preview-popup__control__switch">
            <span
                className={
                    isChart
                        ? "preview-popup__control__switch__state active"
                        : "preview-popup__control__switch__state"
                }>
                Chart
            </span>
            <Tooltip title="Switch chart/grid">
                <Switch
                    onChange={handleSwitch}
                    checked={!isChart}
                    disabled={isDisabled}
                />
            </Tooltip>
            <span
                className={
                    !isChart
                        ? "preview-popup__control__switch__state active"
                        : "preview-popup__control__switch__state"
                }>
                Grid
            </span>
        </div>
    );
}

export default SwitchChartGrid;
