import { Accordion, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useEffect } from "react";
import FilterSpecialDate from "./FilterTypes/FilterSpecialDate";
import FilterText from "./FilterTypes/FilterText";
import FilterNumber from "./FilterTypes/FilterNumber";
import FilterDate from "./FilterTypes/FilterDate";
import { useSelector } from "react-redux";
import { useFilterContext } from "./FilterContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function FilterAccordion({ option, pinnedChartData, setPinnedChartData }) {
    const navigate = useNavigate();

    const globalState = useSelector((state) => state);
    const token = useSelector((state) => state.auth.userToken);
    const selectedModule = useSelector(
        (state) => state.dashboardMain.selectedModuleId
    );
    const [expanded, setExpanded] = useState(false);
    const [optionList, setOptionList] = useState([]);
    const handleChange = (panel, option) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        if (option.conditionType === "text" && optionList.length === 0) {
            fetch(
                `${globalState.baseURL}/DashBoard/FilterOptionList?groupid=${option.id}&ModuleCode=${selectedModule}`,
                {
                    method: "GET",
                    headers: {
                        LangCode: globalState.auth.systemLang,
                        UserToken: token,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    if (!data.isAuthorized) {
                        return navigate("/notAuthorized");
                    }
                    setOptionList(data?.data?.filterOptionList || []);
                });
        }
    };
    return (
        <Accordion
            key={option.id}
            className="manage-tab__accordion"
            expanded={expanded === option.name}
            onChange={handleChange(option.name, option)}>
            <AccordionSummary
                className="manage-tab__accordion__summary"
                expandIcon={<ArrowDropDownIcon />}>
                <span>
                    {option.type === "special-date"
                        ? option.name
                        : option.title}
                </span>
            </AccordionSummary>

            {optionList.length > 0 ||
            option?.options?.length > 0 ||
            option?.conditionType === "number" ||
            option?.conditionType === "date" ? (
                <>
                    {option.type === "special-date" && (
                        <FilterSpecialDate
                            option={option}
                            pinnedChartData={pinnedChartData}
                        />
                    )}

                    {option.conditionType === "text" && (
                        <FilterText
                            option={option}
                            optionList={optionList}
                            pinnedChartData={pinnedChartData}
                            setPinnedChartData={setPinnedChartData}
                        />
                    )}
                    {option.conditionType === "number" && (
                        <FilterNumber
                            option={option}
                            pinnedChartData={pinnedChartData}
                        />
                    )}
                    {option.conditionType === "date" && (
                        <FilterDate
                            option={option}
                            pinnedChartData={pinnedChartData}
                        />
                    )}
                </>
            ) : (
                <>
                    <Box sx={{ textAlign: "center" }}>
                        <CircularProgress />
                    </Box>
                </>
            )}
            {/* 
                                ****  W E    C U R R E N T L Y    D O N ' T    H A V E    I T  ****
                                {option.conditionType === "radio" && (
                                    <FilterRadio
                                        option={option}
                                    />
                                )} 
                            */}
        </Accordion>
    );
}

export default FilterAccordion;
