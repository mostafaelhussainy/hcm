import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SwitchPinned({ data, setChartData }) {
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.userToken);
    const globalState = useSelector((state) => state);
    const [isChart, setIsChart] = useState(data?.data?.chartOrGrid === "chart");
    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        if (data?.data?.chartOrGrid === "chart") {
            setIsChart(true);
        } else {
            setIsChart(false);
        }
    }, [data]);

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
            filter: data?.data?.filter || [],
            dateFilter: data?.data?.dateFilter || null,
            chartName: data?.data?.chartName,
            gridColumns: data?.data?.gridData?.header?.map((obj) => obj?.id),
            chartOrGrid: data?.data?.chartOrGrid === "chart" ? "grid" : "chart",
            chartType: data?.data?.chartType.toLowerCase(),
            yAxis: data?.data?.yAxis,
            xAxis: data?.data?.xAxis,
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
                setChartData((prevPinnedChart) => data);
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

export default SwitchPinned;
