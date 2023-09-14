import React, { useEffect } from "react";
// import DashboardController from "../components/DashboardControl/DashboardController";
import FixedCharts from "../components/FixedCharts/FixedCharts";
import PinnedCharts from "../components/PinnedCharts/PinnedCharts";
import FilterDate from "../components/FilterDate/FilterDate";
import DashboradTree from "../components/DashboardTree/dahsboardTree";
import DashboradModules from "../components/DashboardMoules/dashboardModules";
import Typography from "@mui/material/Typography";
import DashboardGrid from "../components/DashboardGrid/dashboardGrid";
import { useFetch } from "../hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { updateDashboardMain } from "../features/dashboard/dashboardMainSlice";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { updateChartIds } from "../features/dashboard/dashboardMainSlice";
import { update } from "../features/dashboard/pinnedChartsSlice";
import { PinnedChartsProvider } from "../components/PinnedCharts/PinnedChartsContext";
import "../assets/styles/scss/3-components/dashboard.scss";
import CustomSnackbar from "../components/ui-components/CustomSnackbar/CustomSnackbar";

function Dashboard() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.userToken);
    const systemLang = useSelector((state) => state.auth.systemLang);
    const selectedModule = useSelector(
        (state) => state.dashboardMain.selectedModuleId
    );
    const dispatch = useDispatch();
    const globalState = useSelector((state) => state);

    const { data, isPending, error } = useFetch(
        `${globalState.baseURL}/DashBoard/PageLoad`,
        "GET",
        { LangCode: systemLang, UserToken: token }
    );
    useEffect(() => {
        if (data) {
            if (data.isAuthinticated) {
                dispatch(updateDashboardMain(data.data));
                dispatch(update(data.data.charts));
            } else {
                navigate("/notAuthorized");
            }
        }
    }, [data, isPending]);

    return (
        <>
            {data ? (
                <>
                    <div style={{ textAlign: "center" }}>
                        <Typography
                            variant="h4"
                            style={{ float: "left" }}
                            display="inline-block"
                            gutterBottom>
                            HR Dashboard
                        </Typography>
                        <FilterDate />
                    </div>
                    {selectedModule == "CS0001" && <FixedCharts />}
                    {/* <DashboardGrid/> */}
                    <PinnedChartsProvider>
                        <PinnedCharts />
                    </PinnedChartsProvider>
                    <DashboradTree />
                    <DashboradModules moduleList={data.data.modules} />
                    <CustomSnackbar />
                </>
            ) : (
                <>
                    <Grid container wrap="nowrap">
                        <Box key={1} xs={4}>
                            <Skeleton variant="rectangular" height={118} />
                        </Box>
                        <Box key={2} xs={4}>
                            <Skeleton variant="rectangular" height={118} />
                        </Box>
                        <Box key={3} xs={4}>
                            <Skeleton variant="rectangular" height={118} />
                        </Box>
                    </Grid>
                    <Grid container wrap="nowrap">
                        <Box key={1} xs={6}>
                            <Skeleton variant="rectangular" height={400} />
                        </Box>
                        <Box key={1} xs={6}>
                            <Skeleton variant="rectangular" height={400} />
                        </Box>
                    </Grid>
                    <Grid container wrap="nowrap">
                        <Box key={1} xs={6}>
                            <Skeleton variant="rectangular" height={400} />
                        </Box>
                        <Box key={1} xs={6}>
                            <Skeleton variant="rectangular" height={400} />
                        </Box>
                    </Grid>
                </>
            )}
        </>
    );
}

export default Dashboard;
