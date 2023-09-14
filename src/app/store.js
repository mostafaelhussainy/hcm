import { configureStore } from "@reduxjs/toolkit";
import locationTreeReducer from "../features/shared/locationTreeSlice";
import chartControlReducer from "../features/dashboard/chartControlSlice";
import fixedChartsReducer from "../features/dashboard/fixedChartsSlice";
import pinnedChartsReducer from "../features/dashboard/pinnedChartsSlice";
import asOfDateReducer from "../features/dashboard/asOfDateSlice";
// import sideMenuReducer from "../features/shared/sideMenuSlice";
import loaderReducer from "../features/shared/loadersSlice";
import authReducer from "../Authontcation/authSlice";
import dateFilterReducer from "../features/dashboard/dateFilterSlice";
import dashboardMainReducer from "../features/dashboard/dashboardMainSlice";
// import previewPopUpReducer from "../features/dashboard/previewPopUpSlice";
import baseURLReducer from "../features/shared/baseURLSlice";
import customSnackReducer from "../features/dashboard/customSnackbarSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        locationTree: locationTreeReducer,
        chartControls: chartControlReducer,
        fixedCharts: fixedChartsReducer,
        pinnedCharts: pinnedChartsReducer,
        asOfDate: asOfDateReducer,
        filterDate: dateFilterReducer,
        // sideMenu: sideMenuReducer,
        loader: loaderReducer,
        dashboardMain: dashboardMainReducer,
        baseURL: baseURLReducer,
        customSnack: customSnackReducer,
        // previewPopUp: previewPopUpReducer,
    },
});
