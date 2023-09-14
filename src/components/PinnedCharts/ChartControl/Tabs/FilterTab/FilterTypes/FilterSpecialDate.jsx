import {
    AccordionDetails,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFilterContext } from "../FilterContext";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../../../../features/dashboard/dateFilterSlice";

function FilterSpecialDate({ option, pinnedChartData }) {
    const { filterData, setFilterData } = useFilterContext();
    const globalState = useSelector((state) => state);

    const [value, setValue] = useState(
        pinnedChartData?.data?.dateFilter?.filterId || ""
    );
    const filterObj = pinnedChartData?.data?.dateFilter;

    let day1 = "";
    let month1 = "";
    let year1 = "";
    let day2 = "";
    let month2 = "";
    let year2 = "";

    if (filterObj?.filterId === "Custom date") {
        [day1, month1, year1] = filterObj?.filterValue1?.split("/");
        [day2, month2, year2] = filterObj?.filterValue2?.split("/"); // Use filterValue2 here
    }

    const [startDate, setStartDate] = useState({
        date: day1 && month1 && year1 ? new Date(year1, month1 - 1, day1) : "", // new Date()
        // date: "",
        string: "",
    });

    const [endDate, setEndDate] = useState({
        date: day2 && month2 && year2 ? new Date(year2, month2 - 1, day2) : "",
        // date: "",
        string: "",
    });
    const [showCustomRange, setShowCustomRange] = useState(false);
    const specialDateDispatcher = useDispatch();
    const handleChange = (event) => {
        console.log("handleChange fired!");
        setValue(event.target.value);
        specialDateDispatcher(
            update({
                filterName: option.name,
                filterId: event.target.value,
                filterDataType: "special-date",
                filterType: "value",
                filterValue1: "",
                filterValue2: "",
            })
        );
    };

    useEffect(() => {
        if (value === "Custom date") {
            setShowCustomRange(true);
        } else {
            setShowCustomRange(false);
        }
    }, [value]);
    useEffect(() => {
        console.log("useEffect [startDate, endDate] fired!");
        if (startDate.string.length > 0 && endDate.string.length > 0) {
            specialDateDispatcher(
                update({
                    filterName: option.name,
                    filterId: value,
                    filterDataType: "special-date",
                    filterType: "range",
                    filterValue1: startDate.string,
                    filterValue2: endDate.string,
                })
            );
        }
    }, [startDate, endDate]);
    useEffect(() => {
        if (value === "Custom date") {
            console.log("if (value === 'Custom date') condition fired fired!");
            specialDateDispatcher(
                update({
                    filterName: option.name,
                    filterId: value,
                    filterDataType: "special-date",
                    filterType: "range",
                    filterValue1:
                        pinnedChartData?.data?.dateFilter?.filterValue1,
                    filterValue2:
                        pinnedChartData?.data?.dateFilter?.filterValue2,
                })
            );
        }
    }, [value]);

    return (
        <AccordionDetails>
            <FormControl>
                <RadioGroup value={value} onChange={handleChange}>
                    {option.options.map((option) => (
                        <FormControlLabel
                            key={option.id}
                            value={option.title}
                            defaultValue={option.selected}
                            checked={
                                option.title ===
                                globalState?.filterDate?.filterId
                            }
                            control={<Radio />}
                            label={option.title}
                        />
                    ))}
                </RadioGroup>
            </FormControl>

            {showCustomRange && (
                <div className="date-range">
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
            )}
        </AccordionDetails>
    );
}

export default FilterSpecialDate;
