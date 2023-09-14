import React, { useEffect } from "react";
import {
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import { useFilterContext } from "../FilterContext";

function FilterCheckBox({ option }) {
    const { filterData, setFilterData } = useFilterContext();

    const handleCheckChange = (event) => {
        const selectedValue = event.target.value;
        const isChecked = event.target.checked;

        setFilterData((prevFilterData) => ({
            ...prevFilterData,
            [option.name]: isChecked
                ? [...(prevFilterData[option.name] || []), selectedValue]
                : (prevFilterData[option.name] || []).filter(
                      (opt) => opt !== selectedValue
                  ),
        }));
    };
    /*
        1. [option.name]: This part is a dynamic property name in an object literal. 
        option.name refers to the name of the current filter option being processed. 
        It is used as the property name in the filterData object to which we are going to update the selected values.
        
        2. isChecked ? ... : ...: This is a ternary conditional expression. 
        If isChecked is true (meaning the checkbox is checked), the expression before the : is evaluated. 
        If isChecked is false (checkbox is unchecked), the expression after the : is evaluated.
        
        3. [(prevFilterData[option.name] || []), selectedValue]: If isChecked is true, this part creates a new array by 
        spreading the previous selected values for the current filter option (retrieved using prevFilterData[option.name] || []) 
        and appending the selectedValue to it. This effectively adds the newly selected value to the array of selected values.
        
        4. (prevFilterData[option.name] || []).filter((opt) => opt !== selectedValue): If isChecked is false, this part creates 
        a new array by filtering out the selectedValue from the previous array of selected values for the current filter option. 
        This effectively removes the unchecked value from the array of selected values.
    */

    return (
        <AccordionDetails>
            <FormGroup>
                {option.options.map((option) => (
                    <FormControlLabel
                        key={option.id}
                        label={option.title}
                        value={option.title}
                        control={<Checkbox onChange={handleCheckChange} />}
                    />
                ))}
            </FormGroup>
        </AccordionDetails>
    );
}

export default FilterCheckBox;
