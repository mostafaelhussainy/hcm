import React, { useEffect, useState } from "react";
import {
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import { useFilterContext } from "../FilterContext";

function FilterText({ option, optionList, pinnedChartData,setPinnedChartData }) {
    const { filterData, setFilterData } = useFilterContext();
    const [selectedNamesList, setSelectedNamesList] = useState(filterData?.map(filter => {
        if (filter.filterName === option.title) {
            return filter.filterValueNames
        }
    })[0]?.split(",") || []);
    const [selectedIdsList, setSelectedIdsList] = useState(filterData?.map(filter => {
        if (filter.filterName === option.title) {
            return filter.filterValue1
        }
    })[0]?.split(",") || []);
    const [CheckedId, SetCheckedId] = useState([]);
    
    /*const filterObj = pinnedChartData?.data?.filter?.find(
        (filterItem) => filterItem?.filterName === option?.title
    );*/
    useEffect(() => {
        if (
            pinnedChartData &&
            pinnedChartData.data.filter &&
            pinnedChartData.data.filter.length > 0
        ) {
            pinnedChartData.data.filter.map((filter) => {
                if (filter.filterValue1.includes(",")) {
                    let ids = filter.filterValue1.split(",");
                    let names = filter.filterValueNames.split(",");
                    // there's a problem in setting checkId array, there's wrong matching between id and name
                    ids.map((id) => {
                        names.map((name) => {
                            let option = {
                                id: id,
                                name: name,
                            };
                            SetCheckedId((oldArray) => [...oldArray, option]);
                        });
                    });
                } else {
                    let Option = {
                        id: filter.filterValue1,
                        name: filter.filterValueNames,
                    };
                    SetCheckedId((oldArray) => [...oldArray, Option]);
                }
            });
        }
    }, []);

    useEffect(() => {
        setFilterData((prevFilterData) => {
            return prevFilterData.map((filter) => {
                if (filter.filterName === "filterDate") {
                    return {
                        filterName: option.title,
                        filterId: option.id,
                        filterDataType: option.conditionType,
                        filterType: "value",
                        filterValue1: selectedIdsList.join(),
                        filterValue2: "",
                        filterValueNames: selectedNamesList.join(),
                    };
                } else {
                    return filter;
                }
            });
        });
        setFilterData((prevFilterData) => {
            const updatedFilterData = prevFilterData.map((filter) => {
                if (filter.filterName === option.title) {
                    return {
                        filterName: option.title,
                        filterId: option.id,
                        filterDataType: option.conditionType,
                        filterType: "value",
                        filterValue1: selectedIdsList.join(),
                        filterValue2: "",
                        filterValueNames: selectedNamesList.join(),
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
                    filterDataType: option.conditionType,
                    filterType: "value",
                    filterValue1: selectedIdsList.join(),
                    filterValue2: "",
                    filterValueNames: selectedNamesList.join(),
                });
            } else {
                console.log("updatedFilterData from else", updatedFilterData)
            }

            return updatedFilterData;
        });
        console.log("option",option)
        if (selectedNamesList.length === 0) {
            setFilterData(prevFilterData => prevFilterData.filter(filter => filter.filterName !== option.title))
        }
    }, [selectedNamesList, selectedIdsList]);

    const handleheck = (option) => {
        let isChecked =
            CheckedId.findIndex((checked) => checked.id == option.id) == "0"
                ? true
                : false;
        return isChecked;
    };
    const handleCheckChange = (event) => {
        const selectedValue = event.target.value; // Use the checkbox value
        const isChecked = event.target.checked;
        const SelecetedOption = optionList.filter(
            (option) => option.id == selectedValue
        );
        if (CheckedId.length == 0) {
            SetCheckedId((oldArray) => [...oldArray, SelecetedOption[0]]);
        } else {
            CheckedId.map((CheckedOption) => {
                if (CheckedOption.id == SelecetedOption[0].id) {
                    const Checked = CheckedId.filter(
                        (option) => option.id !== SelecetedOption[0].id
                    );
                    SetCheckedId(Checked);
                } else {
                    SetCheckedId((oldArray) => [
                        ...oldArray,
                        SelecetedOption[0],
                    ]);
                }
            });
        }

        const SelectedName = SelecetedOption[0].name;
        setSelectedIdsList((prevSelectedIdsList) =>
            isChecked
                ? [...prevSelectedIdsList, selectedValue]
                : prevSelectedIdsList.filter(
                      (option) => option !== selectedValue
                  )
        );
        setSelectedNamesList((prevselectedNamesList) => {
            if (isChecked) {
                return [...prevselectedNamesList, SelectedName]
            } else {
                return prevselectedNamesList.filter(
                    (option) => option !== SelectedName
                )}
            }
        );
    };

    /*
        1. [option.title]: This part is a dynamic property name in an object literal. 
        option.title refers to the name of the current filter option being processed. 
        It is used as the property name in the filterData object to which we are going to update the selected values.
        
        2. isChecked ? ... : ...: This is a ternary conditional expression. 
        If isChecked is true (meaning the checkbox is checked), the expression before the : is evaluated. 
        If isChecked is false (checkbox is unchecked), the expression after the : is evaluated.
        
        3. [(prevFilterData[option.title] || []), selectedValue]: If isChecked is true, this part creates a new array by 
        spreading the previous selected values for the current filter option (retrieved using prevFilterData[option.title] || []) 
        and appending the selectedValue to it. This effectively adds the newly selected value to the array of selected values.
        
        4. (prevFilterData[option.title] || []).filter((opt) => opt !== selectedValue): If isChecked is false, this part creates 
        a new array by filtering out the selectedValue from the previous array of selected values for the current filter option. 
        This effectively removes the unchecked value from the array of selected values.
    */


    return (
        <AccordionDetails>
            <FormGroup>
                {optionList?.map((option) => (
                    <FormControlLabel
                        key={option.id}
                        label={option.name}
                        value={option.id}
                        control={
                            <Checkbox
                                // checked={handleheck(option)}
                                checked={
                                    CheckedId?.findIndex(
                                        (checked) => checked.id == option.id
                                    ) == "-1"
                                        ? false
                                        : true
                                }
                                onChange={handleCheckChange}
                                onInputChange={(event, newInputValue) => {}}
                            />
                        }
                    />
                ))}
            </FormGroup>
        </AccordionDetails>
    );
}

export default FilterText;
