import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "../Chart/Chart";
import "./chart-prev.scss";
import { useState, useEffect } from "react";
import { usePinnedChartsContext } from "../PinnedCharts/PinnedChartsContext.js";
import { useSelector, useDispatch } from "react-redux";
import { setMainLoader } from "../../features/shared/loadersSlice";
import { push, pop } from "../../features/dashboard/pinnedChartsSlice";
import { updateSnackMsg } from "../../features/dashboard/customSnackbarSlice";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function ChartPrev({
    openPreview,
    setOpenPreview,
    pinnedChartData = null,
    chartId = null,
    closeChartControl,
}) {
    const navigate = useNavigate();

    const globalState = useSelector((state) => state);
    const token = useSelector((state) => state.auth.userToken);
    const selectedModuleId = useSelector(
        (state) => state.dashboardMain.selectedModuleId
    );
    const pinnedCharts = useSelector((state) => state.pinnedCharts);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const { pinnedChart, setPinnedChart } = usePinnedChartsContext();

    useEffect(() => {
        openPreview ? setOpen(true) : setOpen(false);
    }, [openPreview]);

    const handleClickOpen = () => {
        setOpen(true);
        setOpenPreview(true);
    };
    const handleClose = () => {
        setOpen(false);
        setOpenPreview(false);
        console.log("handleClose Fired!");
    };
    const handlePin = () => {
        let body;
        let columnsArray = [];

        for (const col in pinnedChart.previewData.gridData["header"]) {
            columnsArray.push(
                pinnedChart.previewData.gridData["header"][col].id
            );
        }
        if (pinnedChartData === null) {
            body = {
                ...pinnedChart.previewData,
                moduleId: selectedModuleId,
                gridColumns: columnsArray,
            };
        } else {
            body = {
                ...pinnedChart.previewData,
                moduleId: selectedModuleId,
                chartId: chartId,
                gridColumns: columnsArray,
            };
        }
        fetch(`${globalState.baseURL}/Dashboard/PinChart`, {
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
                document
                    .querySelector(".create-mange-chart__heading__btn")
                    .click();
                let chartIndex = null;
                if (pinnedCharts.includes(data.data.chartId)) {
                    chartIndex = pinnedCharts.indexOf(data.data.chartId);
                }
                dispatch(pop(data.data.chartId));
                dispatch(setMainLoader(true));
                setTimeout(() => {
                    dispatch(
                        push({ id: data.data.chartId, index: chartIndex })
                    );
                }, 100);
                setTimeout(() => {
                    dispatch(setMainLoader(false));
                }, 3000);
                dispatch(
                    updateSnackMsg({
                        open: true,
                        message: "Chart has been saved!",
                        severity: "success",
                    })
                );
            });
        handleClose(); // need to be changed to reset drawer data
    };
    if (pinnedChart.previewData === "pending") {
        return (
            <>
                <BootstrapDialog
                    id="preview-popup"
                    onClose={handleClose}
                    open={open}
                    maxWidth="lg">
                    <BootstrapDialogTitle onClose={handleClose}>
                        loading .........
                    </BootstrapDialogTitle>
                    <DialogContent dividers>loading .........</DialogContent>
                    <DialogActions>
                        <Button variant="contained">Pin to dashboard</Button>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </>
        );
    }
    return (
        <>
            <BootstrapDialog
                id="preview-popup"
                onClose={handleClose}
                open={open}
                maxWidth="lg">
                <BootstrapDialogTitle onClose={handleClose}>
                    {pinnedChart.previewData.chartName.englishName}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Chart
                        data={pinnedChart.previewData}
                        isPinned={false}
                        chartId={chartId}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handlePin}>
                        {pinnedChartData === null
                            ? "Pin to dashboard"
                            : "Save changes"}
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}
