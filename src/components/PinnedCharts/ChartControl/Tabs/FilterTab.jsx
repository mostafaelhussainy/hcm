import React from "react";
import { TextField, MenuItem, Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function FilterTab() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <section className="condition-tab manage-tab">
            <div className="manage-tab__heading">
                <TuneIcon />
                <h4>Filter By</h4>
            </div>
            <Accordion
                className="manage-tab__accordion"
                expanded={expanded === "date"}
                onChange={handleChange("date")}>
                <AccordionSummary
                    className="manage-tab__accordion__summary"
                    expandIcon={<ArrowDropDownIcon />}>
                    <span>Date</span>
                </AccordionSummary>
                <AccordionDetails>lasdkalskdlqwkelqwk</AccordionDetails>
            </Accordion>
            <Accordion
                className="manage-tab__accordion"
                expanded={expanded === "age"}
                onChange={handleChange("age")}>
                <AccordionSummary
                    className="manage-tab__accordion__summary"
                    expandIcon={<ArrowDropDownIcon />}>
                    <span>Age</span>
                </AccordionSummary>
                <AccordionDetails>lasdkalskdlqwkelqwk</AccordionDetails>
            </Accordion>
        </section>
    );
}

export default FilterTab;
