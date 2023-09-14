// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

// const initialState = {
//     previewPopUpData: {},
//     isLoading: false,
//     error: null,
// };

// const globalState = useSelector((state) => state);
// const token = useSelector((state) => state.auth.userToken);

// const body = {
//     asOfDate: globalState.asOfDate.asOfDate.replaceAll("/", "-"),
//     moduleId: globalState.dashboardMain.selectedModuleId,
//     filter: globalState.chartControls.filter,
//     dateFilter: globalState.filterDate,
//     chartName: globalState.chartControls.chartName,
//     gridColumns: globalState.dashboardMain.gridColoumns.map(
//         (obj) => obj.groupId
//     ),
//     chartOrGrid: globalState.chartControls.chartOrGrid.toLowerCase(),
//     chartType: globalState.chartControls.chartType.toString(),
//     yAxis: globalState.chartControls.yAxis,
//     xAxis: globalState.chartControls.xAxis,
//     selectedLocations: globalState.locationTree.selectedLocations,
// };

// export const fetchPreviewData = createAsyncThunk(
//     "previewPopUp/fetchPreviewData",
//     async () => {
//         const res = await fetch(
//             "https://yasdemo.civilsoft.org/Dashboard/PreviewCahrt",
//             {
//                 method: "POST",
//                 headers: {
//                     LangCode: globalState.auth.systemLang,
//                     UserToken: token,
//                     Accept: "application.json",
//                     "content-Type": "application/json",
//                 },
//                 body: JSON.stringify(body),
//             }
//         );
//         const data = await res.data;
//         return data;
//     }
// );

// export const previewPopUpSlice = createSlice({
//     name: "previewPopUp",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchPreviewData.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(fetchPreviewData.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.previewPopUpData = action.payload;
//         });
//         builder.addCase(fetchPreviewData.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.error.message;
//         });
//     },
// });

// export default previewPopUpSlice.reducer;
