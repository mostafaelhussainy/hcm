import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { pop } from "../../../features/dashboard/pinnedChartsSlice";
import { updateSnackMsg } from "../../../features/dashboard/customSnackbarSlice";
import { useNavigate } from "react-router-dom";

export default function UnPinAlert({
    open,
    setOpen,
    chartId,
    closeChartControl,
}) {
    const navigate = useNavigate();
    const globalState = useSelector((state) => state);
    const token = useSelector((state) => state.auth.userToken);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const handleUnPin = () => {
        fetch(
            `${globalState.baseURL}/Dashboard/UnPinChart?chartId=${chartId}`,
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
                if (!data.isAuthorized) {
                    return navigate("/notAuthorized");
                }
                dispatch(pop(chartId));
                setOpen(false);
                if (closeChartControl) {
                    closeChartControl();
                }
                dispatch(
                    updateSnackMsg({
                        open: true,
                        message: "Chart has been deleted!",
                        severity: "success",
                    })
                );
            });
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to unpin?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once you remove the chart from the dashboard, it will
                        become inaccessible, and you will need to recreate it if
                        you want to have it back.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleUnPin}
                        variant="outlined"
                        color="error"
                        autoFocus>
                        Remove from dashboard
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
