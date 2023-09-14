import { useEffect } from "react";
import { TextField, MenuItem, Autocomplete } from "@mui/material";
import { useState, useRef, forwardRef } from "react";
import YAxis from "../../../../assets/icons/Group313.svg";
import XAxis from "../../../../assets/icons/Group314.svg";
import { useSelector } from "react-redux";
import ToastMessage from "../../../ui-components/toastMessage";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ConditionsTab({
    conditionsTabData,
    setConditionsTabData,
    setIsFilterTabDisabled,
    pinnedChartData = null,
}) {
    const [selectedCondition, setSelectedCondition] = useState("");
    const [openToast, setOpenToast] = useState(false);
    const handleClick = () => {
        setOpenToast(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenToast(false);
    };

    const ref = useRef();
    const [groupByXValue, setGroupByXValue] = useState("");
    const [groupXCondition, setGroupXCondition] = useState("");
    const [groupByXConditionsActive, setGroupByXConditionsActive] = useState(
        []
    );
    const [groupByYValue, setGroupByYValue] = useState("");
    const [groupYCondition, setGroupYCondition] = useState("");
    const [groupByYConditionsActive, setGroupByYConditionsActive] = useState(
        []
    );
    const dashboardState = useSelector((state) => state.dashboardMain);
    const chartType = dashboardState.chartTypes;
    const groupBy = dashboardState.groups;
    const conditions = dashboardState.groupByCondition;
    const [groupByXDefault, setGroupByXDefault] = useState(null);
    const [groupByXValues, setGroupByXValues] = useState(groupBy);
    const [groupByYValues, setGroupByYValues] = useState(groupBy);
    // const toastError = {
    //     type: "error",
    //     message:
    //         "Can't select the same conditions, please select different one!",
    // };
    useEffect(() => {
        if (
            pinnedChartData &&
            pinnedChartData !== null &&
            pinnedChartData.data
        ) {
            setConditionsTabData((prevConditionsTabData) => ({
                chartType: pinnedChartData.data.chartType.toLowerCase(),
                chartTypeError: false,
                groupByX: pinnedChartData.data.xAxis.groupByid
                    ? pinnedChartData.data.xAxis.groupByid
                    : pinnedChartData.data.xAxis.groupById,
                groupByXCondition: pinnedChartData.data.xAxis.conditionId,
                groupByXConditionError: false,
                groupByXError: false,
                groupByY: pinnedChartData.data.yAxis.groupByid
                    ? pinnedChartData.data.yAxis.groupByid
                    : pinnedChartData.data.yAxis.groupById,
                groupByYCondition: pinnedChartData.data.yAxis.conditionId,
                groupByYConditionError: false,
                groupByYError: false,
            }));
            if (pinnedChartData.data.yAxis.groupByid) {
                setGroupByYValue(
                    dashboardState?.groups?.filter(
                        (group) =>
                            group.groupId ==
                            pinnedChartData?.data?.yAxis?.groupByid
                    )[0]?.groupName
                );
            } else {
                setGroupByYValue(
                    dashboardState?.groups?.filter(
                        (group) =>
                            group.groupId ==
                            pinnedChartData?.data?.yAxis?.groupById
                    )[0]?.groupName
                );
            }
            setGroupYCondition(
                dashboardState.groupByCondition.filter(
                    (condition) =>
                        condition.conditionID ==
                        pinnedChartData.data.yAxis.conditionId
                )[0].conditionTitle
            );
            if (pinnedChartData.data.xAxis.groupByid) {
                setGroupByXValue(
                    dashboardState?.groups?.filter(
                        (group) =>
                            group.groupId ==
                            pinnedChartData?.data?.xAxis?.groupByid
                    )[0]?.groupName
                );
            } else {
                setGroupByXValue(
                    dashboardState?.groups?.filter(
                        (group) =>
                            group.groupId ==
                            pinnedChartData?.data?.xAxis?.groupById
                    )[0]?.groupName
                );
            }

            setGroupXCondition(
                dashboardState.groupByCondition.filter(
                    (condition) =>
                        condition.conditionID ==
                        pinnedChartData.data.xAxis.conditionId
                )[0].conditionTitle
            );
            setGroupByXDefault(
                dashboardState?.groups?.filter(
                    (group) =>
                        group.groupId == pinnedChartData?.data?.yAxis?.groupByid
                )[0]?.groupName
            );
        }
    }, [pinnedChartData]);
    const handleUpdatingConditions = (axe, conditionValue) => {
        if (
            axe === "Y" &&
            conditionsTabData.groupByXCondition > 0 &&
            conditionsTabData.groupByXCondition === conditionValue
        ) {
            setSelectedCondition(
                conditions.filter(
                    (condition) => condition.conditionID === conditionValue
                )[0].conditionTitle
            );
            handleClick();
            setConditionsTabData((prevConditionsTabData) => ({
                ...prevConditionsTabData,
                groupByYConditionError: true,
                isDisabled: true,
            }));
        } else {
            setConditionsTabData((prevConditionsTabData) => ({
                ...prevConditionsTabData,
                groupByYConditionError: false,
                isDisabled: false,
            }));
        }
        if (
            axe === "X" &&
            conditionsTabData.groupByYCondition > 0 &&
            conditionsTabData.groupByYCondition === conditionValue
        ) {
            setSelectedCondition(
                conditions.filter(
                    (condition) => condition.conditionID === conditionValue
                )[0].conditionTitle
            );
            handleClick();
            setConditionsTabData((prevConditionsTabData) => ({
                ...prevConditionsTabData,
                groupByXConditionError: true,
                isDisabled: true,
            }));
        } else {
            setConditionsTabData((prevConditionsTabData) => ({
                ...prevConditionsTabData,
                groupByXConditionError: false,
                isDisabled: false,
            }));
        }
    };
    return (
        <>
            <section className="filter-tab manage-tab">
                <TextField
                    select
                    label="Chart Type"
                    fullWidth
                    helperText="Required*"
                    defaultValue={
                        pinnedChartData
                            ? chartType.filter(
                                  (type) =>
                                      type.typeName.toLowerCase() ===
                                      pinnedChartData?.data?.chartType
                              )[0]?.typeName
                            : ""
                    }
                    error={conditionsTabData.chartTypeError}
                    onChange={(e) => {
                        setConditionsTabData((prevConditionsTabData) => ({
                            ...prevConditionsTabData,
                            chartType: e.target.value.toLowerCase(),
                            chartTypeError: false,
                        }));
                        if (
                            !conditionsTabData.chartTypeError &&
                            !conditionsTabData.groupByXError &&
                            !conditionsTabData.groupByXConditionError &&
                            !conditionsTabData.groupByYError &&
                            !conditionsTabData.groupByYConditionError
                        ) {
                            setIsFilterTabDisabled(false);
                        }
                    }}
                    disabled={pinnedChartData !== null}>
                    {chartType.map((type) => (
                        <MenuItem key={type.typeName} value={type.typeName}>
                            {type.typeName.toLowerCase()}
                        </MenuItem>
                    ))}
                </TextField>
                <div className="manage-tab__input-group">
                    <span className="manage-tab__input-group__label">
                        <img src={YAxis} alt="" className="y-axis" />
                        Group By (Y-Axis)
                    </span>
                    <Autocomplete
                        disablePortal
                        options={groupByYValues}
                        getOptionLabel={(option) => option.groupName}
                        inputValue={groupByYValue}
                        onInputChange={(event, newInputValue) => {
                            if (newInputValue.length > 0) {
                                setGroupByYValue(newInputValue);
                            }
                        }}
                        onChange={(e, newValue) => {
                            setGroupByXValues((prevGroups) =>
                                groupBy.filter(
                                    (group) =>
                                        group?.groupId != newValue?.groupId
                                )
                            );
                            setGroupByYConditionsActive(
                                conditions.filter(
                                    (condition) =>
                                        condition.groupDataType ===
                                        newValue?.groupDataType
                                )
                            );
                            setConditionsTabData((prevConditionsTabData) => ({
                                ...prevConditionsTabData,
                                groupByY: newValue?.groupId || "",
                                groupByYError: newValue ? false : true,
                            }));
                            setGroupYCondition("");
                            setGroupByYValue("");
                            if (
                                e.target
                                    .closest(".manage-tab__input-group")
                                    .querySelectorAll(
                                        ".conditionInput .MuiAutocomplete-clearIndicator"
                                    )[0]
                            ) {
                                e.target
                                    .closest(".manage-tab__input-group")
                                    .querySelectorAll(
                                        ".conditionInput .MuiAutocomplete-clearIndicator"
                                    )[0]
                                    .click();
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                label="Select Group By"
                                helperText="Required*"
                                error={conditionsTabData.groupByYError}
                                {...params}
                            />
                        )}
                        disabled={pinnedChartData !== null}
                    />
                    <Autocomplete
                        disablePortal
                        options={groupByYConditionsActive}
                        getOptionLabel={(option) => option.conditionTitle}
                        inputValue={groupYCondition}
                        // inputValue={groupByYConditionsActive}
                        onInputChange={(event, newInputValue) => {
                            if (newInputValue.length > 0) {
                                setGroupYCondition(newInputValue);
                            }
                        }}
                        onChange={(e, newValue) => {
                            if (newValue === null) {
                                setGroupYCondition("");
                            }
                            setConditionsTabData((prevConditionsTabData) => ({
                                ...prevConditionsTabData,
                                groupByYCondition: newValue?.conditionID || "",
                                groupByYConditionError: newValue ? false : true,
                            }));
                            handleUpdatingConditions(
                                "Y",
                                newValue?.conditionID
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                label="Conditions"
                                helperText="Required*"
                                className="conditionInput"
                                error={conditionsTabData.groupByYConditionError}
                                {...params}
                            />
                        )}
                        disabled={pinnedChartData !== null}
                    />
                </div>
                <div className="manage-tab__input-group">
                    <span className="manage-tab__input-group__label">
                        <img src={XAxis} alt="" className="x-axis" />
                        Group By (X-Axis)
                    </span>
                    <Autocomplete
                        disablePortal
                        options={groupByXValues}
                        getOptionLabel={(option) => option.groupName}
                        inputValue={groupByXValue}
                        onInputChange={(event, newInputValue) => {
                            if (newInputValue.length > 0) {
                                setGroupByXValue(newInputValue);
                            }
                        }}
                        onChange={(e, newValue) => {
                            setGroupByYValues((prevGroups) =>
                                groupBy.filter(
                                    (group) =>
                                        group?.groupId != newValue?.groupId
                                )
                            );
                            setGroupByXConditionsActive(
                                conditions.filter(
                                    (condition) =>
                                        condition.groupDataType ===
                                        newValue?.groupDataType
                                )
                            );
                            setConditionsTabData((prevConditionsTabData) => ({
                                ...prevConditionsTabData,
                                groupByX: newValue?.groupId || "",
                                groupByXError: newValue ? false : true,
                            }));
                            setGroupXCondition("");
                            setGroupByXValue("");
                            if (
                                e.target
                                    .closest(".manage-tab__input-group")
                                    .querySelectorAll(
                                        ".conditionInput .MuiAutocomplete-clearIndicator"
                                    )[0]
                            ) {
                                e.target
                                    .closest(".manage-tab__input-group")
                                    .querySelectorAll(
                                        ".conditionInput .MuiAutocomplete-clearIndicator"
                                    )[0]
                                    .click();
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                label="Select Group by"
                                helperText="Required*"
                                error={conditionsTabData.groupByXError}
                                {...params}
                            />
                        )}
                        disabled={pinnedChartData !== null}
                    />
                    <Autocomplete
                        disablePortal
                        options={groupByXConditionsActive}
                        getOptionLabel={(option) => option.conditionTitle}
                        inputValue={groupXCondition}
                        onInputChange={(event, newInputValue) => {
                            if (newInputValue.length > 0) {
                                setGroupXCondition(newInputValue);
                            }
                        }}
                        onChange={(e, newValue) => {
                            if (newValue === null) {
                                setGroupXCondition("");
                            }
                            setConditionsTabData((prevConditionsTabData) => ({
                                ...prevConditionsTabData,
                                groupByXCondition: newValue?.conditionID || "",
                                groupByXConditionError: newValue ? false : true,
                            }));
                            handleUpdatingConditions(
                                "X",
                                newValue?.conditionID
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                label="Conditions"
                                className="conditionInput"
                                helperText="Required*"
                                error={conditionsTabData.groupByXConditionError}
                                {...params}
                            />
                        )}
                        disabled={pinnedChartData !== null}
                    />
                    {/* <ToastMessage toastProps={toastError} ref={ref} /> */}
                </div>
                <Snackbar
                    id="conditions-error-msg"
                    open={openToast}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        sx={{ width: "100%" }}>
                        Can't select the same conditions "{selectedCondition}",
                        please select different one!
                    </Alert>
                </Snackbar>
            </section>
        </>
    );
}

export default ConditionsTab;
