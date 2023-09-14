import React, { useState, useEffect } from "react";
import {
    AccordionDetails,
    FormControl,
    Switch,
    Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFilterContext } from "../FilterContext";

function FilterDate({ option, pinnedChartData }) {
    const { filterData, setFilterData } = useFilterContext();
    const filterObj = pinnedChartData?.data?.filter?.find(
        (filterItem) => filterItem?.filterName === option?.title
    );
    // const [day, month, year] = filterObj?.filterValue1.split("-");
    let day1 = "";
    let month1 = "";
    let year1 = "";
    let day2 = "";
    let month2 = "";
    let year2 = "";

    if (filterObj?.filterType === "value") {
        [day1, month1, year1] = filterObj?.filterValue1.split("-");
    } else if (filterObj?.filterType === "range") {
        [day1, month1, year1] = filterObj?.filterValue1.split("-");
        [day2, month2, year2] = filterObj?.filterValue2.split("-"); // Use filterValue2 here
    }
    const [isRange, setIsRange] = useState(
        filterObj?.filterType.toLowerCase() === "range" || false
    );

    const [valueDate, setValueDate] = useState({
        date: new Date(year1, month1 - 1, day1),
        string: filterObj?.filterValue1 || "", // new Date()
    });
    const [startDate, setStartDate] = useState({
        date: new Date(year1, month1 - 1, day1), // new Date()
        string: filterObj?.filterValue1 || "",
    });
    const [endDate, setEndDate] = useState({
        date: new Date(year2, month2 - 1, day2), // new Date()
        string: filterObj?.filterValue2 || "",
    });
    const handleSwitchChange = (event) => {
        setIsRange(event.target.checked);
        setValueDate({
            date: "",
            string: "",
        });
        setStartDate({
            date: "",
            string: "",
        });
        setEndDate({
            date: "",
            string: "",
        });
        setFilterData((prevFilterData) =>
            prevFilterData.filter((filter) => filter.filterId != option.id)
        );
    };
    useEffect(() => {
        if (
            filterObj ||
            valueDate.string.length > 0 ||
            startDate.string.length > 0 ||
            endDate.string.length > 0
        ) {
            if (isRange) {
                setFilterData((prevFilterData) => {
                    const updatedFilterData = prevFilterData.map((filter) => {
                        if (filter.filterName === option.title) {
                            return {
                                filterName: option.title,
                                filterId: option.id,
                                filterType: "range",
                                filterDataType: option.conditionType,
                                filterValue1: startDate.string.replaceAll(
                                    "/",
                                    "-"
                                ),
                                filterValue2: endDate.string.replaceAll(
                                    "/",
                                    "-"
                                ),
                            };
                        } else {
                            return filter;
                        }
                    });

                    // Check if an existing filter with the same name was found
                    const existingFilter = updatedFilterData.find(
                        (filter) => filter.filterName === option.title
                    );

                    // If no existing filter was found, add a new filter
                    if (!existingFilter) {
                        updatedFilterData.push({
                            filterName: option.title,
                            filterId: option.id,
                            filterType: "range",
                            filterDataType: option.conditionType,
                            filterValue1: startDate.string.replaceAll("/", "-"),
                            filterValue2: endDate.string.replaceAll("/", "-"),
                        });
                    }
                    return updatedFilterData;
                });
            } else {
                setFilterData((prevFilterData) => {
                    const updatedFilterData = prevFilterData.map((filter) => {
                        if (filter.filterName === option.title) {
                            return {
                                filterName: option.title,
                                filterId: option.id,
                                filterType: "value",
                                filterDataType: option.conditionType,
                                filterValue1: valueDate.string.replaceAll(
                                    "/",
                                    "-"
                                ),
                                filterValue2: "",
                            };
                        } else {
                            return filter;
                        }
                    });

                    // Check if an existing filter with the same name was found
                    const existingFilter = updatedFilterData.find(
                        (filter) => filter.filterName === option.title
                    );

                    // If no existing filter was found, add a new filter
                    if (!existingFilter) {
                        updatedFilterData.push({
                            filterName: option.title,
                            filterId: option.id,
                            filterType: "value",
                            filterDataType: option.conditionType,
                            filterValue1: valueDate.string.replaceAll("/", "-"),
                            filterValue2: "",
                        });
                    }
                    return updatedFilterData;
                });
            }
        }
    }, [isRange, valueDate, startDate, endDate, option.name, setFilterData]);
    return (
        <AccordionDetails>
            <FormControl>
                <div className="switch">
                    <Typography>Value</Typography>
                    <Switch
                        checked={isRange}
                        label="Label"
                        onChange={handleSwitchChange}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                    <Typography>Range</Typography>
                </div>
                {isRange ? (
                    <div className="switch-row">
                        <DatePicker
                            selected={startDate.date}
                            onChange={(date) => {
                                const dt = new Date(date);
                                const selectedDate = `${dt.getDate()}/${
                                    dt.getMonth() + 1
                                }/${dt.getFullYear()}`;

                                setStartDate({
                                    date: date,
                                    string: selectedDate,
                                });
                            }}
                            selectsStart
                            startDate={startDate.date}
                            endDate={endDate.date}
                            dateFormat="dd/MM/yyyy"
                        />
                        <DatePicker
                            selected={endDate.date}
                            onChange={(date) => {
                                const dt = new Date(date);
                                const selectedDate = `${dt.getDate()}/${
                                    dt.getMonth() + 1
                                }/${dt.getFullYear()}`;

                                setEndDate({
                                    date: date,
                                    string: selectedDate,
                                });
                            }}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate.date}
                            minDate={startDate.date}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                ) : (
                    <DatePicker
                        selected={valueDate.date}
                        onChange={(date) => {
                            const dt = new Date(date);
                            const selectedDate = `${dt.getDate()}/${
                                dt.getMonth() + 1
                            }/${dt.getFullYear()}`;

                            setValueDate({
                                date: date,
                                string: selectedDate,
                            });
                        }}
                        selectsStart
                        startDate={valueDate.date}
                        dateFormat="dd/MM/yyyy"
                    />
                )}
            </FormControl>
        </AccordionDetails>
    );
}

export default FilterDate;
