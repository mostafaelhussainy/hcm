import { useState, forwardRef, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./custom-snackbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateSnackMsg } from "../../../features/dashboard/customSnackbarSlice";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar() {
    const { open, message, severity } = useSelector(
        (state) => state
    ).customSnack;
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(open, message, severity);
    }, [open, message, severity]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(
            updateSnackMsg({
                open: false,
                message: "",
                severity: "",
            })
        );
    };

    return (
        <Stack
            className="customized-snackbar"
            spacing={2}
            sx={{ width: "100%" }}>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                open={open}
                autoHideDuration={5000}
                direction="TransitionRight"
                TransitionComponent={"SlideTransition"}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{
                        backgroundColor:
                            severity === "success" ? "#90EE90" : "",
                        color: "#000",
                    }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
