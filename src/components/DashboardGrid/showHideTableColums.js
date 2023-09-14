import * as React from "react";
import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { updateShowHideColsPoup } from "../../features/dashboard/dashboardMainSlice";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { usePinnedChartsContext } from "../PinnedCharts/PinnedChartsContext";
import "./DashboardGrid.scss";
import Grid from "@mui/material/Grid";
import { push, pop } from "../../features/dashboard/pinnedChartsSlice";
import { setMainLoader } from "../../features/shared/loadersSlice";
import { updategridColumns } from "../../features/dashboard/chartControlSlice";
import { useNavigate } from "react-router-dom";

export default function DashboardShowHideColsPoup({
    data,
    chartId,
    setChartData,
    openColsPoup,
    stopenColsPoup,
}) {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const globalState = useSelector((state) => state);
    const [checkedList, setcheckedList] = React.useState({});
    const [cloumsloaded, setIscloumsloaded] = React.useState(false);
    const token = globalState.auth.userToken;
    const systemLang = globalState.auth.systemLang;
    let objItemNaming = "";
    const gridColumns = useSelector(
        (state) => state.dashboardMain.gridColoumns
    );
    const showHideState = useSelector(
        (state) => state.dashboardMain.showHideColsPoup
    );
    const { pinnedChart, setPinnedChart } = usePinnedChartsContext();
    const pinnedCharts = useSelector((state) => state.pinnedCharts);

    let stateObj = {};
    const dispatch = useDispatch();
    const handleClose = () => {
        stopenColsPoup(false);
    };
    const handleChangeCols = () => {
        stopenColsPoup(false);
        let currentColsList = [];
        gridColumns.filter((obj) => {
            if (checkedList[obj.groupId] === true) {
                currentColsList.push(obj.groupId);
            }
        });
        dispatch(updategridColumns(currentColsList));
        const body = {
            asOfDate: globalState.asOfDate.asOfDate.substr(
                globalState.asOfDate.asOfDate.indexOf("-") + 1
            ),
            moduleId: globalState.dashboardMain.selectedModuleId,
            filter: data?.filter || [],
            dateFilter: data?.dateFilter || null,
            chartName: data?.chartName,
            gridColumns: currentColsList,
            chartOrGrid: data?.chartOrGrid,
            chartType: data?.chartType.toLowerCase(),
            yAxis: data?.yAxis,
            xAxis: data?.xAxis,
            selectedLocations: globalState.locationTree.selectedLocations,
            Page: 1,
            chartId: chartId,
        };
        dispatch(setMainLoader(true));

        if (chartId) {
            fetch(`${globalState.baseURL}/Dashboard/PinChart`, {
                method: "POST",
                headers: {
                    LangCode: systemLang,
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
                    let chartIndex = null;
                    if (pinnedCharts.includes(data.data.chartId)) {
                        chartIndex = pinnedCharts.indexOf(data.data.chartId);
                    }
                    dispatch(pop(data.data.chartId));
                    setTimeout(() => {
                        dispatch(
                            push({ id: data.data.chartId, index: chartIndex })
                        );
                        dispatch(setMainLoader(false));
                    }, 100);
                });
        } else {
            fetch(`${globalState.baseURL}/Dashboard/PreviewCahrt`, {
                method: "POST",
                headers: {
                    LangCode: systemLang,
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
                    if (setChartData) {
                        setChartData((prevPinnedChart) => data);
                    } else {
                        setPinnedChart((prevPinnedChart) => {
                            return {
                                ...prevPinnedChart,
                                previewData: {
                                    chartName: data?.data?.chartName || "",
                                    chartOrGrid: data?.data?.chartOrGrid || "",
                                    chartType:
                                        data?.data?.chartType.toLowerCase() ||
                                        "",
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
                        dispatch(setMainLoader(false));
                    }
                });
        }
    };
    useEffect(() => {
        setOpen(openColsPoup);
        if (gridColumns.length > 0) {
            setIscloumsloaded(true);
            gridColumns.map((column, index) => {
                objItemNaming = column.groupId;
                if (column.systemDefined) {
                    stateObj[objItemNaming] = true;
                } else {
                    stateObj[objItemNaming] = false;
                }
            });
            for (const col in data.gridData.header) {
                objItemNaming = data.gridData.header[col].id;
                stateObj[objItemNaming] = true;
            }
            setcheckedList(stateObj);
        }
    }, [gridColumns]);
    const changeCheckBoxState = (id) => {
        stateObj = { ...checkedList, [id]: !checkedList[id] };
        setcheckedList(stateObj);
    };
    return (
        <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle>Show / Hide in Grid</DialogTitle>
            <DialogContent className="showHideTablesDialogContent">
                {cloumsloaded
                    ? gridColumns.map((column, index) => (
                          <Grid item md={3} xs={4}>
                              <label
                                  key={"10" + column.groupId}
                                  className={
                                      column.systemDefined ? "disabledCont" : ""
                                  }>
                                  <Checkbox
                                      key={"20" + column.groupId}
                                      onChange={() =>
                                          changeCheckBoxState(column.groupId)
                                      }
                                      checked={checkedList[column.groupId]}
                                      id={column.groupId.toString()}
                                      disabled={column.systemDefined}
                                  />
                                  <label key={"30" + column.groupId}>
                                      {column.groupTitle}
                                  </label>
                              </label>
                          </Grid>
                      ))
                    : null}
            </DialogContent>
            <DialogActions>
                <Button
                    className="btn errorBtn"
                    variant="outlined"
                    color="error"
                    onClick={handleClose}>
                    Close
                </Button>
                <Button
                    className="btn succeseBtn"
                    variant="contained"
                    onClick={handleChangeCols}>
                    Okey
                </Button>
            </DialogActions>
        </Dialog>
    );
}
