import ContextMenu from "./ContextMenu/ContextMenu";
import { contextMenu } from "react-contexify";
import BarChart from "./ChartTypes/BarChart";
import PieChart from "./ChartTypes/PieChart";
import FilterChips from "./FilterChips/FilterChips";
import SwitchChartGrid from "./Switch/SwitchChartGrid.jsx";
import SwitchPinned from "./Switch/SwitchPinned.jsx";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Tooltip } from "@mui/material";
import Switch from "@mui/material/Switch";
import excel from "../../assets/icons/excel.svg";
import { useState, useEffect } from "react";
import DashboardGrid from "../DashboardGrid/dashboardGrid";
import { useDispatch, useSelector } from "react-redux";
import React, { createRef } from "react";
import { useScreenshot } from "use-react-screenshot";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DashboardShowHideColsPoup from "../DashboardGrid/showHideTableColums";
import { updateShowHideColsPoup } from "../../features/dashboard/dashboardMainSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { memo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { pop } from "../../features/dashboard/pinnedChartsSlice";
import UnPinAlert from "../PinnedCharts/UnPinAlert/UnPinAlert";
import { useNavigate } from "react-router-dom";

function Chart({
    data,
    isPinned,
    setChartData,
    chartId,
    exportBody,
    toggleChartControl,
}) {
    const navigate = useNavigate();

    const globalState = useSelector((state) => state);
    const ref = createRef(null);
    const [image, takeScreenshot] = useScreenshot("");
    const getImage = () => {
        takeScreenshot(ref.current);
        if (image) {
            exportTolExcelFetch();
        }
    };
    const [showSpinner, setChartSpinner] = useState(false);
    const [openColsPoup, stopenColsPoup] = useState(false);
    const token = useSelector((state) => state.auth.userToken);
    const systemLang = useSelector((state) => state.auth.systemLang);
    const asOfDateObj = useSelector((state) => state.asOfDate.asOfDate);
    const [exportClicked, setexportClicked] = useState(false);
    const selectedLocations = useSelector(
        (state) => state.locationTree.selectedLocations
    );
    const [openUnPinAlert, setOpenUnPinAlert] = useState(false);
    const selectedModuleId = useSelector(
        (state) => state.dashboardMain.selectedModuleId
    );
    useEffect(() => {
        if (image && exportClicked) {
            exportTolExcelFetch();
        }
    }, [image]);
    let exportChartCurentObj = {};
    function exportExcel(chartType, chartIdpram) {
        let chartOBj = data.success ? data.data : data;
        setexportClicked(true);
        setChartSpinner(true);

        if (chartType == "grid") {
            exportTolExcelFetch();
        } else {
            getImage();
        }
    }
    const exportTolExcelFetch = () => {
        let chartOBj = data.success ? data.data : data;
        console.log("chartOBj", chartOBj);
        let columnsArray = [];
        for (const col in chartOBj.gridData["header"]) {
            if (!columnsArray.includes(chartOBj.gridData["header"][col].id)) {
                columnsArray.push(chartOBj.gridData["header"][col].id);
            }
        }
        exportBody = {
            asOfDate: asOfDateObj.replaceAll("/", "-"),
            moduleId: selectedModuleId,
            filter: chartOBj.filter,
            dateFilter: chartOBj.dateFilter,
            chartName: chartOBj.chartName,
            selectedLocations: selectedLocations,
            Page: 1,
            gridColumns: columnsArray,
            dillDownData: {},
            chartOrGrid: chartOBj.chartOrGrid,
            dateFilter: chartOBj.dateFilter,
            chartType: chartOBj.chartType,
            chartId: chartId,
            yAxis: chartOBj.yAxis,
            xAxis: chartOBj.xAxis,
        };

        exportChartCurentObj = {
            previewChart: exportBody,
            ChartImage: image,
        };
        if (exportChartCurentObj.ChartImage) {
            exportChartCurentObj.ChartImage =
                exportChartCurentObj.ChartImage.replace(
                    "data:image/png;base64,",
                    ""
                );
        }
        fetch(`${globalState.baseURL}/Dashboard/ExportToExcel`, {
            method: "POST",
            headers: {
                LangCode: systemLang,
                UserToken: token,
                Accept: "application.json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(exportChartCurentObj),
        })
            .then((resp) => resp.blob())
            .then((blob) => {
                setChartSpinner(false);
                setexportClicked(false);
                if (blob) {
                    let URL = window.URL || window.webkitURL;
                    let downloadUrl = window.URL.createObjectURL(blob);
                    // use HTML5 a[download] attribute to specify filename
                    let a = document.createElement("a");

                    // safari doesn't support this yet
                    if (typeof a.download === "undefined") {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = data.success
                            ? data.data.chartName.englishName + ".xlsx"
                            : data.chartName.englishName + ".xlsx";
                        document.body.appendChild(a);
                        a.target = "_blank";
                        a.click();
                    }
                }
                exportChartCurentObj.ChartImage = null;
            });
    };
    function somewhere(e) {
        contextMenu.show({
            id: "menu-id",
            event: e,
        });
    }
    // const handleUnPin = () => {
    //     console.log("chartId", chartId);
    //     fetch(
    //         `${globalState.baseURL}/Dashboard/UnPinChart?chartId=${chartId}`,
    //         {
    //             method: "POST",
    //             headers: {
    //                 LangCode: globalState.auth.systemLang,
    //                 UserToken: token,
    //                 Accept: "application.json",
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             dispatch(pop(chartId));
    //         });
    // };

    if (isPinned) {
        return (
            <div className="preview-popup">
                <div className="preview-popup-flex">
                    {systemLang === "en" ? (
                        <h2>{data?.data?.chartName?.englishName}</h2>
                    ) : (
                        <h2>{data?.data?.chartName?.arabicName}</h2>
                    )}
                    <Grid>
                        <Grid item xs={4}>
                            {data && (
                                <SwitchPinned
                                    data={data}
                                    setChartData={setChartData}
                                />
                            )}
                        </Grid>
                    </Grid>
                </div>
                <Grid item xs={12}>
                    <FilterChips
                        data={data?.data}
                        isPinned={isPinned}
                        setChartData={setChartData}
                    />
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={11}>
                        <div ref={ref} className="chartBody">
                            {data?.data?.chartOrGrid === "chart" ? (
                                data?.data.chartType === "bar" ||
                                data?.data.chartType === "Bar" ? (
                                    <BarChart
                                        data={data?.data}
                                        somewhere={somewhere}
                                        fontSizeNum={30}
                                        heightNum={700}
                                        labelFontSize={40}
                                        axisLabelPadding={220}
                                    />
                                ) : (
                                    <PieChart
                                        data={data?.data}
                                        somewhere={somewhere}
                                    />
                                )
                            ) : (
                                data &&
                                data?.data?.chartOrGrid === "grid" && (
                                    <DashboardGrid
                                        gridChartData={data}
                                        somewhere={somewhere}
                                        chartId={chartId}
                                    />
                                )
                            )}
                        </div>

                        <ContextMenu />
                    </Grid>
                    <Grid item xs={1}>
                        {data && (
                            <>
                                <div className="preview-popup__control__column">
                                    <Tooltip title="Manage">
                                        <Button
                                            className="preview-popup__control__column__settings-btn"
                                            onClick={toggleChartControl(
                                                true,
                                                0,
                                                data,
                                                chartId
                                            )}>
                                            <SettingsIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Export to excel">
                                        <Button
                                            onClick={(e) =>
                                                exportExcel(
                                                    data.data.chartOrGrid,
                                                    chartId
                                                )
                                            }
                                            className="preview-popup__control__column__excel-btn">
                                            {/* <img src={excel} /> */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                width="24"
                                                height="24"
                                                viewBox="0,0,256,256">
                                                <g
                                                    fill="#0E0F38"
                                                    fill-rule="nonzero"
                                                    stroke="none"
                                                    stroke-width="1"
                                                    stroke-linecap="butt"
                                                    stroke-linejoin="miter"
                                                    stroke-miterlimit="10"
                                                    stroke-dasharray=""
                                                    stroke-dashoffset="0"
                                                    font-family="none"
                                                    font-weight="none"
                                                    font-size="none"
                                                    text-anchor="none"
                                                    style={{
                                                        mixBlendMode: "normal",
                                                    }}>
                                                    <g transform="scale(5.12,5.12)">
                                                        <path d="M28.8125,0.03125l-28,5.3125c-0.47266,0.08984 -0.8125,0.51953 -0.8125,1v37.3125c0,0.48047 0.33984,0.91016 0.8125,1l28,5.3125c0.0625,0.01172 0.125,0.03125 0.1875,0.03125c0.23047,0 0.44531,-0.07031 0.625,-0.21875c0.23047,-0.19141 0.375,-0.48437 0.375,-0.78125v-48c0,-0.29687 -0.14453,-0.58984 -0.375,-0.78125c-0.23047,-0.19141 -0.51953,-0.24219 -0.8125,-0.1875zM32,6v7h2v2h-2v5h2v2h-2v5h2v2h-2v6h2v2h-2v7h15c1.10156,0 2,-0.89844 2,-2v-34c0,-1.10156 -0.89844,-2 -2,-2zM36,13h8v2h-8zM6.6875,15.6875h5.125l2.6875,5.59375c0.21094,0.44141 0.39844,0.98438 0.5625,1.59375h0.03125c0.10547,-0.36328 0.30859,-0.93359 0.59375,-1.65625l2.96875,-5.53125h4.6875l-5.59375,9.25l5.75,9.4375h-4.96875l-3.25,-6.09375c-0.12109,-0.22656 -0.24609,-0.64453 -0.375,-1.25h-0.03125c-0.0625,0.28516 -0.21094,0.73047 -0.4375,1.3125l-3.25,6.03125h-5l5.96875,-9.34375zM36,20h8v2h-8zM36,27h8v2h-8zM36,35h8v2h-8z"></path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </Button>{" "}
                                    </Tooltip>
                                    <Tooltip title="Filter">
                                        <Button
                                            className="preview-popup__control__column__filter-btn"
                                            onClick={toggleChartControl(
                                                true,
                                                2,
                                                data,
                                                chartId
                                            )}>
                                            <FilterAltIcon />
                                        </Button>
                                    </Tooltip>
                                    {data.data?.chartOrGrid === "grid" && (
                                        <>
                                            <Tooltip title="Show/Hide">
                                                <Button
                                                    onClick={(e) =>
                                                        stopenColsPoup(true)
                                                    }
                                                    className="preview-popup__control__column__shoColums-btn">
                                                    <VisibilityIcon />
                                                </Button>
                                            </Tooltip>
                                            {openColsPoup && (
                                                <DashboardShowHideColsPoup
                                                    chartId={chartId}
                                                    header={
                                                        data.isAuthinticated
                                                            ? data.data.gridData
                                                                  .header
                                                            : data.gridData
                                                                  .header
                                                    }
                                                    data={
                                                        data.isAuthinticated
                                                            ? data.data
                                                            : data
                                                    }
                                                    setChartData={setChartData}
                                                    stopenColsPoup={
                                                        stopenColsPoup
                                                    }
                                                    openColsPoup={openColsPoup}
                                                />
                                            )}
                                        </>
                                    )}
                                    <Tooltip title="Unpin">
                                        {/* <Button
                                            className="preview-popup__control__column__filter-btn"
                                            onClick={handleUnPin}>
                                            <DeleteIcon />
                                        </Button> */}
                                        <Button
                                            className="preview-popup__control__column__filter-btn unpin"
                                            onClick={() =>
                                                setOpenUnPinAlert(true)
                                            }>
                                            <DeleteIcon />
                                        </Button>
                                    </Tooltip>
                                    <UnPinAlert
                                        open={openUnPinAlert}
                                        setOpen={setOpenUnPinAlert}
                                        chartId={chartId}
                                    />
                                </div>
                            </>
                        )}
                    </Grid>
                </Grid>
                {showSpinner && (
                    <div className="overlay">
                        <CircularProgress />
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className="preview-popup" ref={ref}>
            <div className="preview-popup-flex">
                {data && data.filter && <FilterChips data={data} />}
                <SwitchChartGrid data={data} />
                <div className="preview-popup__control__column">
                    {/*<Button className="preview-popup__control__column__settings-btn">*/}
                    {/*    <SettingsIcon />*/}
                    {/*</Button>*/}
                    <Button className="preview-popup__control__column__excel-btn">
                        {/* <img src={excel} /> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="24"
                            height="24"
                            viewBox="0,0,256,256">
                            <g
                                fill="#0E0F38"
                                fill-rule="nonzero"
                                stroke="none"
                                stroke-width="1"
                                stroke-linecap="butt"
                                stroke-linejoin="miter"
                                stroke-miterlimit="10"
                                stroke-dasharray=""
                                stroke-dashoffset="0"
                                font-family="none"
                                font-weight="none"
                                font-size="none"
                                text-anchor="none"
                                style={{ mixBlendMode: "normal" }}>
                                <g transform="scale(5.12,5.12)">
                                    <path d="M28.8125,0.03125l-28,5.3125c-0.47266,0.08984 -0.8125,0.51953 -0.8125,1v37.3125c0,0.48047 0.33984,0.91016 0.8125,1l28,5.3125c0.0625,0.01172 0.125,0.03125 0.1875,0.03125c0.23047,0 0.44531,-0.07031 0.625,-0.21875c0.23047,-0.19141 0.375,-0.48437 0.375,-0.78125v-48c0,-0.29687 -0.14453,-0.58984 -0.375,-0.78125c-0.23047,-0.19141 -0.51953,-0.24219 -0.8125,-0.1875zM32,6v7h2v2h-2v5h2v2h-2v5h2v2h-2v6h2v2h-2v7h15c1.10156,0 2,-0.89844 2,-2v-34c0,-1.10156 -0.89844,-2 -2,-2zM36,13h8v2h-8zM6.6875,15.6875h5.125l2.6875,5.59375c0.21094,0.44141 0.39844,0.98438 0.5625,1.59375h0.03125c0.10547,-0.36328 0.30859,-0.93359 0.59375,-1.65625l2.96875,-5.53125h4.6875l-5.59375,9.25l5.75,9.4375h-4.96875l-3.25,-6.09375c-0.12109,-0.22656 -0.24609,-0.64453 -0.375,-1.25h-0.03125c-0.0625,0.28516 -0.21094,0.73047 -0.4375,1.3125l-3.25,6.03125h-5l5.96875,-9.34375zM36,20h8v2h-8zM36,27h8v2h-8zM36,35h8v2h-8z"></path>
                                </g>
                            </g>
                        </svg>
                    </Button>
                    {/*<Button className="preview-popup__control__column__filter-btn">*/}
                    {/*    <FilterAltIcon />*/}
                    {/*</Button>*/}
                    {data && data?.chartOrGrid === "grid" && (
                        <Button
                            onClick={(e) => stopenColsPoup(true)}
                            className="preview-popup__control__column__shoColums-btn">
                            <VisibilityIcon />
                        </Button>
                    )}
                </div>
            </div>
            {data?.chartOrGrid === "chart" ? (
                data.chartType === "bar" || data.chartType === "Bar" ? (
                    <BarChart
                        data={data}
                        somewhere={somewhere}
                        fontSizeNum={20}
                        labelFontSize={25}
                        heightNum={450}
                        axisLabelPadding={180}
                    />
                ) : (
                    <PieChart data={data} somewhere={somewhere} />
                )
            ) : (
                data &&
                data?.chartOrGrid === "grid" && (
                    <>
                        <DashboardGrid
                            gridChartData={data}
                            somewhere={somewhere}
                            chartId={"prev"}
                        />
                        {openColsPoup && (
                            <DashboardShowHideColsPoup
                                chartId={chartId}
                                header={data?.gridData.header}
                                setChartData={setChartData}
                                data={data}
                                stopenColsPoup={stopenColsPoup}
                                openColsPoup={openColsPoup}
                            />
                        )}
                    </>
                ) // <--- in here <Grid data={data} somewhere={somewhere} />
            )}
            <ContextMenu />
        </div>
    );
}

export default memo(Chart);
