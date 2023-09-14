import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useImperativeHandle } from 'react';
import { useState } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ToastMessage = forwardRef(({ toastProps: { type, message } }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        openToast(open) {
            setOpen(true);
        }
    }));
    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>

    );
})
export default ToastMessage;