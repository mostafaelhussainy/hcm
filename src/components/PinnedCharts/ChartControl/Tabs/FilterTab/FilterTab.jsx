import React from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { useState, useEffect } from "react";
import FilterAccordion from "./FilterAccordion";
import { useSelector } from "react-redux";
import { Chip, Stack, Tooltip } from "@mui/material";
import { useFilterContext } from "./FilterContext";

function FilterTab({
    pinnedChartData,
    appliedFilterArray,
    setPinnedChartData,
}) {
    const { filterData, setFilterData } = useFilterContext();
    // useEffect(() => {
    //     console.log("filterData from FilterTab", filterData);
    //     console.log("pinnedChartData from FilterTab", pinnedChartData);
    // }, [filterData]);
    useEffect(() => {
        if (pinnedChartData !== null) {
            setFilterData(pinnedChartData.data.filter);
        }
    }, [pinnedChartData]);
    const specialDateOption = {
        name: "Date",
        type: "special-date",
        id: "1AS87Q",
        options: [
            { title: "Last week", id: "AJKsd123", selected: false },
            { title: "Month to date", id: "SD1adwAF23", selected: false },
            { title: "Last month", id: "ZXDLqweK123", selected: false },
            { title: "Last 3 months", id: "9ADsdw2123", selected: false },
            { title: "Year to date", id: "A047xczxYRT3", selected: false },
            { title: "Last year", id: "78WDA5vedrJUI23", selected: false },
            { title: "Custom date", id: "0A32qwerqweTU54K", selected: true },
        ],
    };

    const globalState = useSelector((state) => state);
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    useEffect(() => {
        setFilterOptions(globalState.dashboardMain.filter);
    }, [globalState, filterOptions]);

    return (
        <section className="condition-tab manage-tab">
            <div className="manage-tab__heading">
                <TuneIcon />
                <h4>Filter By</h4>
            </div>
            <div
                style={{
                    marginBottom: "60px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "20px",
                }}>
                {/* {pinnedChartData?.data && (
                    <Stack direction="row" spacing={1}>
                        {pinnedChartData?.data?.filter?.length > 0 &&
                            pinnedChartData.data.filter.map((filter) => (
                                <Tooltip title={filter.filterValueNames}>
                                    <Chip label={filter.filterName} />
                                </Tooltip>
                            ))}
                        {pinnedChartData?.data?.dateFilter && (
                            <Tooltip
                                title={
                                    pinnedChartData.data.dateFilter.filterId ===
                                    "Custom date"
                                        ? pinnedChartData.data.dateFilter
                                              .filterId +
                                          ": " +
                                          pinnedChartData.data.dateFilter
                                              .filterValueNames
                                        : pinnedChartData.data.dateFilter
                                              .filterId
                                }>
                                <Chip label="Date" fullWidth="false" />
                            </Tooltip>
                        )}
                    </Stack>
                )} */}
                <Stack direction="row" spacing={1}>
                    {filterData?.map(
                        (filter) =>
                            filter?.filterValue1?.length > 0 && (
                                <Tooltip
                                    title={
                                        filter?.filterValue2?.length > 0
                                            ? filter?.filterValue1 +
                                              ", " +
                                              filter?.filterValue2
                                            : filter?.filterValueNames ||
                                              filter?.filterValue1
                                    }>
                                    <Chip label={filter.filterName} />
                                </Tooltip>
                            )
                    )}
                    {pinnedChartData?.data &&
                        pinnedChartData.data.filter &&
                        pinnedChartData.data.filter.length > 0 &&
                        pinnedChartData.data.filter.map(
                            (element) =>
                                element.filterName && (
                                    // Resolving duplication
                                    // <Tooltip
                                    //     key={element.filterId}
                                    //     title={element.filterValueNames}>
                                    //     <Chip
                                    //         label={element.filterName}
                                    //        /* onDelete={() =>
                                    //             handleDelete(element.filterId)
                                    //         }*/
                                    //     />
                                    // </Tooltip>
                                    <></>
                                )
                        )}
                    {globalState?.filterDate?.filterId?.length > 0 && (
                        <Tooltip
                            title={
                                globalState?.filterDate?.filterValue2?.length >
                                0
                                    ? globalState?.filterDate?.filterValue1 +
                                      ", " +
                                      globalState?.filterDate?.filterValue2
                                    : globalState?.filterDate?.filterValue1
                            }>
                            <Chip label={globalState?.filterDate?.filterId} />
                        </Tooltip>
                    )}
                </Stack>
            </div>
            <FilterAccordion
                option={specialDateOption}
                key={specialDateOption.id}
                pinnedChartData={pinnedChartData}
                setPinnedChartData={setPinnedChartData}
            />
            {filterOptions?.length > 0 ? (
                filterOptions.map((option) => (
                    <FilterAccordion
                        option={option}
                        key={option.id}
                        pinnedChartData={pinnedChartData}
                        setPinnedChartData={setPinnedChartData}
                    />
                ))
            ) : (
                <></>
            )}
        </section>
    );
}

export default FilterTab;
