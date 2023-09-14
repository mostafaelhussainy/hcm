import { useEffect, useState } from "react";
import {
    AccordionDetails,
    Switch,
    Typography,
    TextField,
    FormControl,
} from "@mui/material";
import { useFilterContext } from "../FilterContext";

function FilterNumber({ option, pinnedChartData }) {
    const { filterData, setFilterData } = useFilterContext();

    const filterObj = pinnedChartData?.data?.filter?.find(
        (filterItem) => filterItem?.filterName === option?.title
    );

    const [inputValue, setInputValue] = useState({
        filterValue1: filterObj?.filterValue1 || "",
    });
    const [inputRange, setInputRange] = useState({
        filterValue1: filterObj?.filterValue1,
        filterValue2: filterObj?.filterValue2,
    });
    const [isRange, setIsRange] = useState(
        filterObj?.filterType.toLowerCase() === "range" || false
    );

    const handleSwitchChange = (event) => {
        setIsRange(event.target.checked);
        setInputValue({
            filterValue1: "",
        });
        setInputRange({
            filterValue1: "",
            filterValue2: "",
        });
        setFilterData((prevFilterData) =>
            prevFilterData.filter((filter) => filter.filterId != option.id)
        );
    };
    useEffect(() => {
        if (
            filterObj ||
            inputValue?.filterValue1?.length > 0 ||
            inputRange?.filterValue1?.length > 0
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
                                filterValue1: inputRange.filterValue1,
                                filterValue2: inputRange.filterValue2,
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
                            filterValue1: inputRange.filterValue1,
                            filterValue2: inputRange.filterValue2,
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
                                filterValue1: inputValue.filterValue1,
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
                            filterValue1: inputValue.filterValue1,
                            filterValue2: "",
                        });
                    }

                    return updatedFilterData;
                });
            }
        }
    }, [isRange, inputValue, inputRange, option.title, setFilterData]);

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
                        <TextField
                            label="From"
                            type="number"
                            value={inputRange.filterValue1}
                            inputProps={{ min: 0, max: 90 }}
                            onChange={(e) =>
                                setInputRange({
                                    ...inputRange,
                                    filterValue1: e.target.value,
                                })
                            }
                        />
                        <TextField
                            label="To"
                            type="number"
                            value={inputRange.filterValue2}
                            inputProps={{ min: 0, max: 90 }}
                            onChange={(e) =>
                                setInputRange({
                                    ...inputRange,
                                    filterValue2: e.target.value,
                                })
                            }
                        />
                    </div>
                ) : (
                    <TextField
                        label="Value"
                        type="number"
                        value={inputValue.filterValue1}
                        onChange={(e) =>
                            setInputValue({
                                ...inputValue,
                                filterValue1: e.target.value,
                            })
                        }
                        inputProps={{ min: 0, max: 90 }}
                    />
                )}
            </FormControl>
        </AccordionDetails>
    );
}

export default FilterNumber;
