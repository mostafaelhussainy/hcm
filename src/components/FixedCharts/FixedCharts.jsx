import { useState, useEffect } from "react";
import HeadCountChart from "./HeadCountChart";
import AvgAgeTenureChart from "./AvgAgeTenureChart";
import TurnOverRateChart from "./TurnOverRateChart";
import "./fixed-charts.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FixedCharts() {
    const navigate = useNavigate();
    const globalState = useSelector((state) => state);
    const token = useSelector((state) => state.auth.userToken);
    const selectedLocations = useSelector(
        (state) => state.locationTree.selectedLocations
    );
    const asOfDate = useSelector((state) => state.asOfDate.asOfDate);
    const selectedModule = useSelector(
        (state) => state.dashboardMain.selectedModuleId
    );
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState(null);

    const sendDate = asOfDate.substr(asOfDate.indexOf("-") + 1);
    useEffect(() => {
        if (
            token !== null &&
            asOfDate &&
            selectedModule &&
            selectedLocations.length > 0
        ) {
            fetch(
                `${globalState.baseURL}/Dashboard/StaticEmployeeChart?modulecode=${selectedModule}&AsOfDate=${sendDate}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        LangCode: globalState.auth.systemLang,
                        UserToken: token,
                    },
                    body: JSON.stringify(selectedLocations),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.isAuthorized === false) {
                        console.log("asldklaskdlaske");
                        navigate("/notAuthorized");
                    }

                    setIsPending(false);
                    setData(data);
                });
        }
    }, [token, asOfDate, selectedModule, selectedLocations]);

    return (
        <section id="fixed-charts">
            <HeadCountChart isPending={isPending} data={data} />
            <AvgAgeTenureChart isPending={isPending} data={data} />
            <TurnOverRateChart isPending={isPending} data={data} />
        </section>
    );
}

export default FixedCharts;
