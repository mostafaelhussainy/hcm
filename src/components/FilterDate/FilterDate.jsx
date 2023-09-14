import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../features/dashboard/asOfDateSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    styled,
    Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import "./filter-date.scss";
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

function FilterDate() {
    const [open, setOpen] = useState(false);
    const [isRange, setIsRange] = useState(false);
    const [yearValue, setYearValue] = useState(new Date());
    // const [monthValue, setMonthValue] = useState(new Date());
    const [monthValue, setMonthValue] = useState("");
    const today = new Date();
    const [modified, setModified] = useState(false);
    const dateState = useSelector((state) => state.asOfDate.asOfDate);
    const dateDispatcher = useDispatch();

    const handleSwitchChange = (event) => {
        setIsRange(event.target.checked);
    };
    const handleApply = () => {
        setModified(true);

        if (isRange) {
            const date = `${
                monthValue.getMonth() + 1
            }-${yearValue.getFullYear()}`;
            dateDispatcher(update({ asOfDate: date.toString() }));
        } else {
            const date = yearValue.getFullYear();
            dateDispatcher(update({ asOfDate: date.toString() }));
        }
        setOpen(false);
    };
    // const handleChange = () => {
    //     if (isRange) {
    //         const date = `${yearValue.getFullYear()}-${
    //             monthValue.getMonth() + 1
    //         }`;
    //         // dateDispatcher(update({ asOfDate: date }));
    //     } else {
    //         const date = yearValue.getFullYear();
    //         // dateDispatcher(update({ asOfDate: date }));
    //     }
    // };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const renderYearContent = (year) => {
        const tooltipText = `Tooltip for year: ${year}`;
        return <span title={tooltipText}>{year}</span>;
    };

    const renderMonthContent = (month, shortMonth, longMonth) => {
        const tooltipText = `Tooltip for month: ${shortMonth}`;
        return <span title={tooltipText}>{shortMonth}</span>;
    };

    return (
        <>
            <Button
                id="date-filter-btn"
                variant="outlined"
                onClick={handleClickOpen}>
                {!modified ? "As of today " : "As of "}
                {dateState.replaceAll("-", "/")} <EditIcon />
            </Button>
            <BootstrapDialog
                id="date-popup"
                onClose={handleClose}
                open={open}
                maxWidth="lg">
                <BootstrapDialogTitle onClose={handleClose}>
                    Filter Dashboard Date
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="wrapper">
                        <label>Date By</label>
                        <div className="col">
                            <div className="switch">
                                <span className={isRange ? "" : "active"}>
                                    Year
                                </span>
                                <Switch
                                    checked={isRange}
                                    label="Label"
                                    onChange={handleSwitchChange}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                                <span className={isRange ? "active" : ""}>
                                    Year & Month
                                </span>
                            </div>
                            {isRange ? (
                                <div className="switch-row">
                                    <span>Year</span>
                                    <DatePicker
                                        selected={yearValue}
                                        onChange={(date) => {
                                            setYearValue(date);
                                            // handleChange();
                                        }}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        selectsStart
                                        renderYearContent={renderYearContent}
                                    />
                                    <span>The end of month</span>
                                    <DatePicker
                                        selected={monthValue}
                                        onChange={(date) => {
                                            setMonthValue(date);
                                            // handleChange();
                                        }}
                                        renderMonthContent={renderMonthContent}
                                        showMonthYearPicker
                                        dateFormat="MM"
                                    />
                                </div>
                            ) : (
                                <div className="switch-row">
                                    <span>Year</span>
                                    <DatePicker
                                        selected={yearValue}
                                        onChange={(date) => {
                                            setYearValue(date);
                                            // handleChange();
                                        }}
                                        showYearPicker
                                        dateFormat="yyyy"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleApply}>
                        Apply
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}

export default FilterDate;
