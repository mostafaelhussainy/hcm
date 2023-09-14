import * as React from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import "./DashboardGrid.scss";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

function DashboardGrid({ gridChartData, chartId, isPinned }) {
    const navigate = useNavigate();

    const SERVER_OPTIONS = {
        useCursorPagination: false,
    };

    const globalState = useSelector((state) => state);
    const token = globalState.auth.userToken;
    const systemLang = globalState.auth.systemLang;
    const moduleId = globalState.dashboardMain.selectedModuleId;
    const selectedLocations = globalState.locationTree.selectedLocations;
    //  const date = globalState.asOfDate.asOfDate.replaceAll(
    //    "/",
    //    "-"
    //);

    const date = globalState.asOfDate.asOfDate.substr(
        globalState.asOfDate.asOfDate.indexOf("-") + 1
    );
    let gridDataobj = { columns: [], rows: [] };
    const [gridDataobjState, setGridDataobjState] = React.useState({
        columns: [],
        rows: [],
    });
    const [fullgridDataobjState, fullsetGridDataobjState] =
        React.useState(null);

    const [nextOrPrev, setnextOrPrev] = React.useState();
    let currentGridCols = [];
    const [paginationStepModel, setPaginationStepModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    const [loading, setLoading] = React.useState(false);

    const handlePaginationModelChange = (newPaginationModel, e, reason) => {
        let gridObject = gridChartData.isAuthinticated
            ? gridChartData.data
            : gridChartData;
        if (newPaginationModel.page > paginationModel.page) {
            if (isPinned && gridObject.chartId) {
                if (
                    gridDataobjState.rows.length < gridObject?.numberOfGridRows
                ) {
                    setLoading(true);
                    fetch(
                        `${
                            globalState.baseURL
                        }/Dashboard/LoadChart?chartId=${chartId}&moduleId=${moduleId}&selectedLocations=${selectedLocations}&date=${date}&Page=${
                            paginationModel.page + 2
                        }`,
                        {
                            method: "GET",
                            headers: {
                                LangCode: systemLang,
                                UserToken: token,
                                Accept: "application.json",
                                "Content-Type": "application/json",
                            },
                        }
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            if (!data.isAuthorized) {
                                return navigate("/notAuthorized");
                            }
                            setLoading(false);
                            if (data.success) {
                                gridDataobj.rows = gridDataobjState.rows;
                                gridDataobj.columns = gridDataobjState.columns;
                                data.data.gridData["rows"].forEach(function (
                                    currRow,
                                    index
                                ) {
                                    let currentRow = {
                                        id:
                                            index +
                                            gridDataobjState.rows.length,
                                    };
                                    data.data.gridData["header"].forEach(
                                        function (col, secindex) {
                                            currentRow = {
                                                ...currentRow,
                                                ["col" + (secindex + 1)]:
                                                    currRow["col" + secindex],
                                            };
                                        }
                                    );
                                    gridDataobj.rows = [
                                        ...gridDataobj.rows,
                                        currentRow,
                                    ];
                                });
                                setGridDataobjState(gridDataobj);
                                setPaginationStepModel(newPaginationModel);
                                setPaginationModel(newPaginationModel);
                            }
                        });
                } else {
                    setPaginationStepModel(newPaginationModel);
                    setPaginationModel(newPaginationModel);
                }
            } else {
                if (
                    gridDataobjState.rows.length < gridObject?.numberOfGridRows
                ) {
                    setLoading(true);

                    let columnsArray = [];
                    globalState.dashboardMain.gridColoumns.filter((obj) => {
                        if (obj.systemDefined) {
                            columnsArray.push(obj.groupId);
                        }
                    });
                    let gridDataCheck = {};

                    if (gridChartData.success !== undefined) {
                        gridDataCheck = gridChartData?.data?.gridData;
                    } else {
                        gridDataCheck = gridChartData.gridData;
                    }
                    for (const col in gridDataCheck["header"]) {
                        if (
                            !columnsArray.includes(
                                gridDataCheck["header"][col].id
                            )
                        ) {
                            columnsArray.push(gridDataCheck["header"][col].id);
                        }
                    }

                    const body = {
                        asOfDate: date,
                        moduleId: moduleId,
                        filter: gridObject.filter,
                        dateFilter: gridObject.dateFilter,
                        chartName: gridObject.chartName,
                        gridColumns: columnsArray,
                        chartOrGrid: "grid",
                        chartType: gridObject.chartType.toLowerCase(),
                        yAxis: gridObject.yAxis,
                        xAxis: gridObject.xAxis,
                        selectedLocations:
                            globalState.locationTree.selectedLocations,
                        Page: paginationModel.page + 2,
                    };
                    fetch(
                        `${globalState.baseURL}/Dashboard/PreviewCahrt`,
                        {
                            method: "POST",
                            headers: {
                                LangCode: systemLang,
                                UserToken: token,
                                Accept: "application.json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body),
                        }
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            if (!data.isAuthorized) {
                                return navigate("/notAuthorized");
                            }
                            setLoading(false);

                            if (data.success) {
                                gridDataobj.rows = gridDataobjState.rows;
                                gridDataobj.columns = gridDataobjState.columns;
                                data.data.gridData["rows"].forEach(function (
                                    currRow,
                                    index
                                ) {
                                    let currentRow = {
                                        id:
                                            index +
                                            gridDataobjState.rows.length,
                                    };
                                    data.data.gridData["header"].forEach(
                                        function (col, secindex) {
                                            currentRow = {
                                                ...currentRow,
                                                ["col" + (secindex + 1)]:
                                                    currRow["col" + secindex],
                                            };
                                        }
                                    );
                                    gridDataobj.rows = [
                                        ...gridDataobj.rows,
                                        currentRow,
                                    ];
                                });
                                setGridDataobjState(gridDataobj);
                                setPaginationStepModel(newPaginationModel);

                                setPaginationModel(newPaginationModel);
                            }
                        });
                } else {
                    setPaginationStepModel(newPaginationModel);

                    setPaginationModel(newPaginationModel);
                }
            }
        } else {
            /* let currentPagetNum=paginationModel.page;
    setPaginationModel({})
    setGridDataobjState(gridDataobjState)  
    setPaginationModel({
      page: currentPagetNum--,
      pageSize: 10,
    })*/
            setPaginationStepModel(newPaginationModel);

            setPaginationModel(newPaginationModel);
        }
    };
    const setGridOneffect = (gridDataCheck) => {
        setGridDataobjState({ columns: [], rows: [] });
        if (gridChartData.success !== undefined) {
            fullsetGridDataobjState(gridChartData.data);
        } else {
            fullsetGridDataobjState(gridChartData);
        }
        setPaginationModel({
            page: 0,
            pageSize: 10,
        });
        gridDataCheck["header"].forEach(function (col, index) {
            gridDataobj.columns = [
                ...gridDataobj.columns,
                {
                    field: "col" + (index + 1),
                    headerName: col["value"],
                    hideable: false,
                    flex: 1,
                    height: 30,
                },
            ];
            currentGridCols = [
                ...currentGridCols,
                { groupId: col.id, groupTitle: col.value },
            ];
        });
        gridDataCheck["rows"].forEach(function (currRow, index) {
            let currentRow = { id: index };
            gridDataCheck["header"].forEach(function (col, secindex) {
                currentRow = {
                    ...currentRow,
                    ["col" + (secindex + 1)]: currRow["col" + secindex],
                };
            });
            gridDataobj.rows = [...gridDataobj.rows, currentRow];
        });
        setGridDataobjState(gridDataobj);
    };
    useEffect(() => {
        if (gridChartData) {
            let gridDataCheck = {};
            if (gridChartData.success !== undefined) {
                gridDataCheck = gridChartData?.data?.gridData;
            } else {
                gridDataCheck = gridChartData.gridData;
            }
            if (
                gridDataCheck &&
                gridDataobjState.columns.length !==
                    gridDataCheck["header"].length
            ) {
                setGridOneffect(gridDataCheck);
            }
            if (fullgridDataobjState) {
                if (gridChartData.success !== undefined) {
                    if (
                        fullgridDataobjState?.filter?.length !==
                        gridChartData.data.filter.length
                    ) {
                        setGridOneffect(gridDataCheck);
                    }
                } else {
                    if (
                        fullgridDataobjState?.filter?.length !==
                        gridChartData.filter.length
                    ) {
                        setGridOneffect(gridDataCheck);
                    }
                }
            }
        }
    }, [
        gridDataobjState,
        gridDataobjState.columns,
        gridChartData,
        paginationModel.page,
        paginationStepModel.page,
    ]);

    return (
        <>
            <div style={{ height: 350 }}>
                {gridDataobjState.columns.length !== 0 ? (
                    <DataGrid
                        rowHeight={30}
                        //rowsPerPage={-1}
                        disableColumnMenu={true}
                        pageSize={10}
                        //page={paginationStepModel.page}
                        rows={gridDataobjState.rows}
                        columns={gridDataobjState.columns}
                        //paginationMode="server"
                        rowCount={
                            gridChartData?.numberOfGridRows
                                ? gridChartData?.numberOfGridRows
                                : gridChartData?.data.numberOfGridRows
                        }
                        onPaginationModelChange={handlePaginationModelChange}
                        paginationModel={paginationModel}
                        loading={loading}
                    />
                ) : (
                    ""
                )}
            </div>
        </>
    );
}
export default memo(DashboardGrid);
