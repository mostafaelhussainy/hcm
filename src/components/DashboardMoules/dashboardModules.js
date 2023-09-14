import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import "./dashboardModules.scss";
import { updateSlectedModule } from "../../features/dashboard/dashboardMainSlice";
import { update } from "../../features/dashboard/pinnedChartsSlice";
import { setMainLoader } from "../../features/shared/loadersSlice";
import { useNavigate } from "react-router-dom";

export default function DashboradModules() {
    const navigate = useNavigate();

    const moduleList = useSelector((state) => state.dashboardMain.modules);
    const selectedModule = useSelector(
        (state) => state.dashboardMain.selectedModuleId
    );
    const token = useSelector((state) => state.auth.userToken);
    const systemLang = useSelector((state) => state.auth.systemLang);
    const dispatch = useDispatch();
    const globalState = useSelector((state) => state);
    const updateSelectedModule = (moduleId) => {
        dispatch(update([]));
        dispatch(setMainLoader(true));
        fetch(
            `${globalState.baseURL}/Dashboard/SelectModule?moduleCode=` +
                moduleId,
            {
                method: "GET",
                headers: {
                    LangCode: systemLang,
                    UserToken: token,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (!data.isAuthorized) {
                    return navigate("/notAuthorized");
                }

                if (data) {
                    if (data.isAuthinticated) {
                        if (data.success) {
                            dispatch(update(data.data.charts));
                            dispatch(
                                updateSlectedModule({
                                    id: moduleId,
                                    data: data.data,
                                })
                            );
                        }
                    }
                    setTimeout(() => {
                        dispatch(setMainLoader(false));
                    }, 1000);
                } /*else{
                dispatch(update([]))
                dispatch(updateSlectedModule({id:moduleId,data:{
                    groups: [],
                    filter: [],
                    gridColoumns: [],
                    charts: []
                }}
                ))
            } */
            });
    };
    return (
        <>
            <div className="modulesCont">
                {moduleList ? (
                    <Stack direction="row" spacing={2}>
                        {moduleList.map((module, index) => (
                            <Button
                                className={
                                    selectedModule == module.moduleCode
                                        ? "active"
                                        : ""
                                }
                                onClick={(e) => {
                                    updateSelectedModule(module.moduleCode);
                                }}
                                id={module.moduleCode}
                                height={43}
                                variant="outlined"
                                key={index}>
                                {module.moduleName}
                            </Button>
                        ))}
                    </Stack>
                ) : (
                    <Box sx={{ width: "100%" }}>
                        <Skeleton animation="wave" width={"22%"} height={50} />
                        <Skeleton animation="wave" width={"22%"} height={50} />
                        <Skeleton animation="wave" width={"22%"} height={50} />
                        <Skeleton animation="wave" width={"22%"} height={50} />
                    </Box>
                )}
            </div>
        </>
    );
}
