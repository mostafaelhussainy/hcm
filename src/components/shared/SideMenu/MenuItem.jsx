import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

function MenuItem({ item }) {
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    if (item.screenLink !== null) {
        return (
            <a className="menu-item menu-link" href={item.screenLink}>
                {item.screenName}
            </a>
        );
    }
    if (item.screenLink === null && item.children && item.children.length > 0) {
        return (
            <Accordion
                onClick={(e) => {
                    stopPropagation(e);
                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <span className="menu-item">{item.screenName}</span>
                </AccordionSummary>
                <AccordionDetails>
                    {item.children.map((subItem) => (
                        <MenuItem key={subItem.screenName} item={subItem} />
                    ))}
                </AccordionDetails>
            </Accordion>
        );
    }
}

export default MenuItem;
