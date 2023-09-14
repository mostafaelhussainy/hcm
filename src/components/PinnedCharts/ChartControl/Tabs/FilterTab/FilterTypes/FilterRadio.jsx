import React, { useState, useEffect } from "react";
import {
    AccordionDetails,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
} from "@mui/material";
import { useFilterContext } from "../FilterContext";

function FilterRadio({ option }) {
    const { filterData, setFilterData } = useFilterContext();
    const [value, setValue] = useState(""); 

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        setFilterData((prevFilterData) => ({
            ...prevFilterData,
            [option.id]: value,
        }));
    }, [value, setFilterData]); // Only run when 'value' changes

    return (
        <AccordionDetails> 
            <FormControl>
                <RadioGroup value={value} onChange={handleChange}>
                    {option.options.map((option) => (
                        <FormControlLabel
                            key={option.id}
                            value={option.id}
                            defaultValue={option.selected}
                            control={<Radio />}
                            label={option.title}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </AccordionDetails>
    );
}

export default FilterRadio;
