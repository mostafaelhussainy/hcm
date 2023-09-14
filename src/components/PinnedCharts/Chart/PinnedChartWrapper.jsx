import { useState, useEffect } from "react";
import CreateBtn from "./CreateBtn";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import SkeletonBarChart from "./Skeletons/SkeletonBarChart.jsx";
import Chart from "../../Chart/Chart";
import { useNavigate } from "react-router-dom";

function PinnedChartWrapper({
    id,
    toggleChartControl,
    setChartControlOpen,
    setCurrentTab,
}) {
    const navigate = useNavigate();

    const globalState = useSelector((state) => state);
    const [chartData, setChartData] = useState(null);
    const token = useSelector((state) => state.auth.userToken);
    const moduleId = useSelector(
        (state) => state.dashboardMain.selectedModuleId
    );
    const selectedLocations = useSelector(
        (state) => state.locationTree.selectedLocations
    ).join(",");
    const date = useSelector((state) => state.asOfDate.asOfDate).replaceAll(
        "/",
        "-"
    );

    const sendDate = date.substr(date.indexOf("-") + 1);
    useEffect(() => {
        if (selectedLocations && id && moduleId && date) {
            fetch(
                `${globalState.baseURL}/Dashboard/LoadChart?chartId=${id}&moduleId=${moduleId}&selectedLocations=${selectedLocations}&date=${sendDate}&Page=1`,
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

                    setChartData(data);
                });
        }
    }, [id, moduleId, selectedLocations, sendDate]);
    // const { data, isPending, error } = useFetch(
    //     isValidParams
    //         ? `${globalState.baseURL}/Dashboard/LoadChart?chartId=${id}&moduleId=${moduleId}&selectedLocations=${selectedLocations}&date=${sendDate}&Page=1`
    //         : null,
    //     "GET",
    //     {
    //         LangCode: globalState.auth.systemLang,
    //         UserToken: token,
    //     }
    // );

    // useEffect(() => {
    //     setChartData(data);
    // }, [isPending, data, error]);
    if (id === false) {
        return (
            <figure className="chart">
                <CreateBtn toggleChartControl={toggleChartControl} />
            </figure>
        );
    } else {
        return (
            <figure className="chart">
                {chartData ? (
                    <Chart
                        data={chartData}
                        isPinned={true}
                        setChartData={setChartData}
                        chartId={id}
                        exportBody=""
                        // setChartControlOpen={setChartControlOpen}
                        toggleChartControl={toggleChartControl}
                    />
                ) : (
                    <SkeletonBarChart />
                )}
            </figure>
        );
    }
}

export default PinnedChartWrapper;
