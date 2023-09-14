import { TextField, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pop } from "../../../../features/dashboard/pinnedChartsSlice";
import UnPinAlert from "../../UnPinAlert/UnPinAlert";

function GeneralTab({
    generalTabData,
    setGeneralTabData,
    setConditionsTabData,
    pinnedChartData = null,
    closeChartControl = closeChartControl,
}) {
    const [openUnPinAlert, setOpenUnPinAlert] = useState(false);
    const globalState = useSelector((state) => state);
    const token = useSelector((state) => state.auth.userToken);
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            pinnedChartData &&
            pinnedChartData !== null &&
            pinnedChartData.data
        ) {
            setGeneralTabData((prevGeneralTabData) => ({
                ...prevGeneralTabData,
                chartName: {
                    englishName: pinnedChartData?.data?.chartName?.englishName,
                    arabicName: "",
                },
                chartNameError: false,
                chartOrGrid: pinnedChartData?.data?.chartOrGrid,
                chartOrGridError: false,
            }));
            // setConditionsTabData((prevConditionsTabData) => ({
            //     ...prevConditionsTabData,
            //     isDisabled: false,
            // }));
        }
    }, [pinnedChartData]);
    const handleUnPin = () => {
        console.log("chartId", pinnedChartData.data.chartId);
        fetch(
            `${globalState.baseURL}/Dashboard/UnPinChart?chartId=${pinnedChartData.data.chartId}`,
            {
                method: "POST",
                headers: {
                    LangCode: globalState.auth.systemLang,
                    UserToken: token,
                    Accept: "application.json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                dispatch(pop(pinnedChartData.data.chartId));
                closeChartControl();
            });
    };
    return (
        <section className="general-tab manage-tab">
            <TextField
                error={generalTabData.chartNameError}
                fullWidth
                label="Chart Name"
                helperText="Required*"
                variant="outlined"
                defaultValue={
                    pinnedChartData
                        ? pinnedChartData?.data?.chartName?.englishName
                        : ""
                }
                onChange={(e) => {
                    setGeneralTabData((prevGeneralTabData) => ({
                        ...prevGeneralTabData,
                        chartName: {
                            englishName: e.target.value || "",
                            arabicName: "",
                        },
                    }));
                    if (e.target.value.length > 0) {
                        setGeneralTabData((prevGeneralTabData) => ({
                            ...prevGeneralTabData,
                            chartNameError: false,
                        }));
                        if (
                            !generalTabData.chartNameError &&
                            !generalTabData.chartOrGridError
                        ) {
                            setConditionsTabData((prevConditionsTabData) => ({
                                ...prevConditionsTabData,
                                isDisabled: false,
                            }));
                        }
                    }
                    if (e.target.value.length === 0) {
                        setGeneralTabData((prevGeneralTabData) => ({
                            ...prevGeneralTabData,
                            chartNameError: true,
                        }));
                        setConditionsTabData((prevConditionsTabData) => ({
                            ...prevConditionsTabData,
                            isDisabled: true,
                        }));
                    }
                }}
            />
            <TextField
                error={generalTabData.chartOrGridError}
                select
                label="Chart / Grid"
                defaultValue={
                    pinnedChartData ? pinnedChartData?.data?.chartOrGrid : ""
                }
                fullWidth
                helperText="Required*"
                onChange={(e) => {
                    setGeneralTabData((prevGeneralTabData) => ({
                        ...prevGeneralTabData,
                        chartOrGrid: e.target.value,
                        chartOrGridError: false,
                    }));
                }}>
                <MenuItem key="chart" value="chart">
                    chart
                </MenuItem>
                <MenuItem key="grid" value="grid">
                    grid
                </MenuItem>
            </TextField>
            {pinnedChartData && (
                <>
                    <Button
                        className="unpin-btn"
                        variant="outlined"
                        color="error"
                        onClick={() => setOpenUnPinAlert(true)}>
                        Remove from dashboard
                    </Button>
                    <UnPinAlert
                        open={openUnPinAlert}
                        setOpen={setOpenUnPinAlert}
                        chartId={pinnedChartData.data.chartId}
                        closeChartControl={closeChartControl}
                    />
                </>
            )}
        </section>
    );
}

export default GeneralTab;
