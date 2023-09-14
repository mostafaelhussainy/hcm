import { useState, useEffect, useRef } from "react";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { AppBar, Tabs, Tab, Box, Drawer, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GeneralTab from "./Tabs/GeneralTab";
import ConditionsTab from "./Tabs/ConditionsTab";
import FilterTab from "./Tabs/FilterTab/FilterTab";
import "./chart-control.scss";
import { useFilterContext } from "./Tabs/FilterTab/FilterContext";
import { usePinnedChartsContext } from "../PinnedChartsContext.js";
import { useSelector, useDispatch } from "react-redux";
import {
    general,
    conditions,
    filter,
} from "../../../features/dashboard/chartControlSlice";
import { reset } from "../../../features/dashboard/dateFilterSlice";
import { useFetch } from "../../../hooks/useFetch";
import { setMainLoader } from "../../../features/shared/loadersSlice";
import { useNavigate } from "react-router-dom";

export default function ChartControl({
    chartControlOpen,
    setChartControlOpen,
    setOpenPreview,
    currentTab = null,
    setCurrentTab,
    pinnedChartData = null,
    setPinnedChartData,
    setCloseChartControl,
}) {
    const navigate = useNavigate();

    const [groupBy, setGroupBy] = useState([]);
    const [chartType, setChartType] = useState([]);
    const [conditionsOptions, setConditionsOptions] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);
    const globalState = useSelector((state) => state);

    const token = useSelector((state) => state.auth.userToken);
    const { data, isPending, error } = useFetch(
        `${globalState.baseURL}/DashBoard/PageLoad`,
        "GET",
        { LangCode: globalState.auth.systemLang, UserToken: token }
    );

    useEffect(() => {
        setGroupBy(data?.data?.groups);
        setChartType(data?.data?.chartTypes);
        setConditionsOptions(data?.data?.groupByCondition);
        setFilterOptions(data?.data?.filter);
    }, [data]);

    const chartControlDispatcher = useDispatch();
    const { filterData, setFilterData } = useFilterContext();

    // setFilterData((prevFilterData) =>
    //     prevFilterData.map((filterObj1) => {
    //         const appliedFilterObj =
    //             pinnedChartData?.data?.filter?.find(
    //                 (filterObj2) => filterObj2.filterId === filterObj1.filterId
    //             ) || filterObj1;
    //         return appliedFilterObj;
    //     })
    // );
    const appliedFilterArray = filterData.filter(
        (filter) => filter.filterValue1 && filter.filterValue1.length > 0
    );
    if (pinnedChartData !== null) {
        const updatedFilterData = filterData.map((existingFilter) => {
            const matchingFilter = pinnedChartData.data.filter.find(
                (filterItem) => filterItem.filterId === existingFilter.filterId
            );
            if (matchingFilter) {
                return {
                    ...existingFilter,
                    filterValue1: matchingFilter.filterValue1,
                    filterValue2: matchingFilter.filterValue2,
                    filterType: matchingFilter.filterType,
                    filterDataType: matchingFilter.filterDataType,
                    // You can update other properties if needed
                };
            }
            return existingFilter;
        });

        // Set the updated filterData using the setFilterData function
        // setFilterData(updatedFilterData);
    }

    const { pinnedChart, setPinnedChart } = usePinnedChartsContext();
    const [value, setValue] = useState(currentTab === null ? 0 : currentTab);
    const [showNext, setShowNext] = useState(true);
    const [showBack, setShowBack] = useState(false);
    const [showApplyAndPreview, setApplyAndPreview] = useState(false);

    const generalTabDataInitialState = {
        chartName: "",
        chartNameID: "",
        chartNameError: false,
        chartOrGrid: "",
        chartOrGridId: "",
        chartOrGridError: false,
    };
    const [generalTabData, setGeneralTabData] = useState(
        generalTabDataInitialState
    );
    const conditionsTabDataInitialState = {
        chartType: "",
        chartTypeError: false,
        groupByX: "",
        groupByXError: false,
        groupByXCondition: "",
        groupByXConditionError: false,
        groupByY: "",
        groupByYError: false,
        groupByYCondition: "",
        groupByYConditionError: false,
        isDisabled: true,
    };
    const [conditionsTabData, setConditionsTabData] = useState(
        conditionsTabDataInitialState
    );
    const [isFilterTabDisabled, setIsFilterTabDisabled] = useState(true);

    const handleChange = (event, newValue) => {
        handleNext(newValue);
        setValue(newValue);
        handleTabs(newValue);
    };
    const handleTabs = (value) => {
        if (value === 0) {
            setShowBack(false);
            setShowNext(true);
            setApplyAndPreview(false);
        }
        if (value === 1) {
            setShowBack(true);
            setShowNext(true);
            setApplyAndPreview(false);
        }
        if (value === 2) {
            setShowBack(true);
            setShowNext(false);
            setApplyAndPreview(true);
        }
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const handleBack = () => {
        if (value !== 0) {
            setValue((prevValue) => prevValue - 1);
            if (value === 1) {
                setShowBack(false);
            }
        }
        if (value === 2) {
            setShowNext(true);
            setApplyAndPreview(false);
        }
    };
    const handleNext = () => {
        if (value === 0) {
            if (
                generalTabData.chartName.length === 0 &&
                generalTabData.chartOrGrid.length === 0
            ) {
                setGeneralTabData((prevGeneralTabData) => ({
                    ...prevGeneralTabData,
                    chartOrGridError: true,
                    chartNameError: true,
                }));
            } else if (generalTabData.chartName.length === 0) {
                setGeneralTabData((prevGeneralTabData) => ({
                    ...prevGeneralTabData,
                    chartNameError: true,
                }));
            } else if (generalTabData.chartOrGrid.length === 0) {
                setGeneralTabData((prevGeneralTabData) => ({
                    ...prevGeneralTabData,
                    chartOrGridError: true,
                }));
            }
            if (
                generalTabData.chartNameError === false &&
                generalTabData.chartOrGridError === false &&
                generalTabData.chartName.length !== 0 &&
                generalTabData.chartOrGrid.length !== 0
            ) {
                setShowBack(true);
                setValue((prevValue) => prevValue + 1);
                // setConditionsTabData((prevConditionsTabData) => ({
                //     ...prevConditionsTabData,
                //     isDisabled: false,
                // }));
                chartControlDispatcher(
                    general({
                        chartName: generalTabData.chartName,
                        chartOrGrid: generalTabData.chartOrGrid,
                    })
                );
            }
        }
        if (value === 1) {
            if (conditionsTabData.chartType.length === 0) {
                setConditionsTabData((prevConditionsTabData) => ({
                    ...prevConditionsTabData,
                    chartTypeError: true,
                }));
            }
            if (conditionsTabData.groupByY.length === 0) {
                setConditionsTabData((prevConditionsTabData) => ({
                    ...prevConditionsTabData,
                    groupByYError: true,
                }));
            }
            if (conditionsTabData.groupByYCondition.length === 0) {
                setConditionsTabData((prevConditionsTabData) => ({
                    ...prevConditionsTabData,
                    groupByYConditionError: true,
                }));
            }
            if (conditionsTabData.groupByX.length === 0) {
                setConditionsTabData((prevConditionsTabData) => ({
                    ...prevConditionsTabData,
                    groupByXError: true,
                }));
            }
            if (conditionsTabData.groupByXCondition.length === 0) {
                setConditionsTabData((prevConditionsTabData) => ({
                    ...prevConditionsTabData,
                    groupByXConditionError: true,
                }));
            }
            if (
                conditionsTabData.chartType.length !== 0 &&
                conditionsTabData.groupByY.length !== 0 &&
                conditionsTabData.groupByYCondition.length !== 0 &&
                conditionsTabData.groupByX.length !== 0 &&
                conditionsTabData.groupByXCondition.length !== 0 &&
                conditionsTabData.groupByXConditionError === false &&
                conditionsTabData.groupByYConditionError === false
            ) {
                setShowNext(false);
                setApplyAndPreview(true);
                setValue((prevValue) => prevValue + 1);
                // setIsFilterTabDisabled(false);
                chartControlDispatcher(
                    conditions({
                        chartType: conditionsTabData.chartType,
                        yAxis: {
                            groupById: conditionsTabData.groupByY,
                            conditionId: conditionsTabData.groupByYCondition,
                        },
                        xAxis: {
                            groupById: conditionsTabData.groupByX,
                            conditionId: conditionsTabData.groupByXCondition,
                        },
                    })
                );
            }
        }
    };

    const closeChartControlRef = useRef(); // Create a ref to hold the function

    const closeChartControl = () => {
        setValue(0);
        setGeneralTabData(generalTabDataInitialState);
        setConditionsTabData(conditionsTabDataInitialState);
        setShowBack(false);
        setShowNext(true);
        setApplyAndPreview(false);
        setChartControlOpen(false);
        setIsFilterTabDisabled(true);
        setFilterData([]);
        setPinnedChartData(null);
        chartControlDispatcher(reset());
    };

    const handleApplyAndPreview = async () => {
        chartControlDispatcher(filter(filterData));
        setTimeout(() => {
            let columnsArray = [];
            globalState.dashboardMain.gridColoumns.filter((obj) => {
                if (obj.systemDefined) {
                    columnsArray.push(obj.groupId);
                }
            });
            let gridColms = pinnedChartData
                ? pinnedChartData.data.gridData["header"]
                : globalState.chartControls.chartName;
            if (gridColms.length > 0) {
                for (const col in gridColms) {
                    if (!columnsArray.includes(gridColms[col].id)) {
                        columnsArray.push(gridColms[col].id);
                    }
                }
            }
            let currentFilterArray = appliedFilterArray;
            if (pinnedChartData?.data?.filter?.length > 0) {
                pinnedChartData.data.filter.forEach(function (elem) {
                    currentFilterArray.push(elem);
                });
            }

            const body = {
                asOfDate: globalState.asOfDate.asOfDate.substr(
                    globalState.asOfDate.asOfDate.indexOf("-") + 1
                ),
                moduleId: globalState.dashboardMain.selectedModuleId,
                // filter:currentFilterArray,
                filter: filterData,
                dateFilter: globalState.filterDate,
                // chartName: globalState.chartControls.chartName.englishName&&!pinnedChartData
                //     ? globalState.chartControls.chartName
                //     : pinnedChartData.data.chartName,
                chartName: globalState.chartControls.chartName.englishName
                    ? globalState.chartControls.chartName
                    : pinnedChartData.data.chartName,
                gridColumns: columnsArray,
                // chartOrGrid:
                //     globalState.chartControls.chartOrGrid && !pinnedChartData
                //         ? globalState.chartControls.chartOrGrid.toLowerCase()
                //         : pinnedChartData.data.chartOrGrid.toLowerCase(),
                chartOrGrid: globalState.chartControls.chartOrGrid
                    ? globalState.chartControls.chartOrGrid.toLowerCase()
                    : pinnedChartData.data.chartOrGrid.toLowerCase(),
                chartType:
                    globalState.chartControls.chartType && !pinnedChartData
                        ? globalState.chartControls.chartType.toLowerCase()
                        : pinnedChartData.data.chartType.toLowerCase(),
                yAxis:
                    globalState.chartControls.yAxis.groupById &&
                    !pinnedChartData
                        ? globalState.chartControls.yAxis
                        : pinnedChartData.data.yAxis,
                xAxis:
                    globalState.chartControls.xAxis.groupById &&
                    !pinnedChartData
                        ? globalState.chartControls.xAxis
                        : pinnedChartData.data.xAxis,
                selectedLocations: globalState.locationTree.selectedLocations,
                Page: 1,
            };
            chartControlDispatcher(setMainLoader(true));
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
                                dateFilter: data?.data?.dateFilter || null,
                                gridData: data?.data?.gridData || "",
                                numberOfGridRows:
                                    data?.data?.numberOfGridRows || "",
                                filter: data?.data?.filter || [],
                                Page: data?.data?.Page || 1,
                            },
                        };
                    });
                    setOpenPreview(true);
                    chartControlDispatcher(setMainLoader(false));
                });
        }, 500);
    };
    useEffect(() => {
        // setCloseChartControl(closeChartControl);
    }, [closeChartControl, setCloseChartControl]);
    useEffect(() => {
        if (currentTab !== null) {
            setValue(currentTab);
            if (currentTab === 2) {
                setShowNext(false);
                setApplyAndPreview(true);
                setShowBack(true);
            }
            setCurrentTab(null);
        }
    }, [currentTab, value, pinnedChartData]);

    return (
        <Drawer
            className="create-manage-chart"
            anchor="right"
            open={chartControlOpen}
            onClose={closeChartControl}>
            <div className="create-mange-chart__heading">
                <h3 className="create-mange-chart__heading__text">
                    Create Chart
                </h3>
                <button
                    className="create-mange-chart__heading__btn"
                    onClick={closeChartControl}>
                    <CancelOutlinedIcon />
                </button>
            </div>
            <Box>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example">
                        <Tab label="General" value={0} disabled />
                        <Tab
                            label="Conditions"
                            value={1}
                            // disabled={conditionsTabData.isDisabled}
                            disabled
                        />
                        <Tab
                            label="Filter"
                            value={2}
                            // disabled={isFilterTabDisabled}
                            disabled
                        />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis="x"
                    index={value}
                    onChangeIndex={handleChangeIndex}>
                    <GeneralTab
                        value={value}
                        index={0}
                        dir="ltr"
                        generalTabData={generalTabData}
                        setGeneralTabData={setGeneralTabData}
                        conditionsTabData={conditionsTabData}
                        setConditionsTabData={setConditionsTabData}
                        pinnedChartData={pinnedChartData}
                        closeChartControl={closeChartControl}
                    />
                    <ConditionsTab
                        value={value}
                        index={1}
                        dir="ltr"
                        conditionsTabData={conditionsTabData}
                        chartType={chartType}
                        groupBy={groupBy}
                        conditionsOptions={conditionsOptions}
                        setConditionsTabData={setConditionsTabData}
                        setIsFilterTabDisabled={setIsFilterTabDisabled}
                        pinnedChartData={pinnedChartData}
                    />
                    <FilterTab
                        value={value}
                        index={2}
                        dir="ltr"
                        filterOptions={filterOptions}
                        pinnedChartData={pinnedChartData}
                        appliedFilterArray={appliedFilterArray}
                        setPinnedChartData={setPinnedChartData}
                    />
                </SwipeableViews>
            </Box>
            <div className="create-manage-chart__control">
                {showBack && (
                    <Button
                        onClick={handleBack}
                        variant="outlined"
                        className="create-manage-chart__control__btn prev">
                        Back
                    </Button>
                )}
                {showNext && (
                    <Button
                        onClick={handleNext}
                        variant="contained"
                        className="create-manage-chart__control__btn next">
                        Next
                    </Button>
                )}
                {showApplyAndPreview && (
                    <Button
                        variant="contained"
                        onClick={handleApplyAndPreview}
                        className="create-manage-chart__control__btn apply-preview">
                        <VisibilityIcon />
                        Apply & Preview
                    </Button>
                )}
            </div>
        </Drawer>
    );
}
