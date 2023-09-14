// import { createSlice } from "@reduxjs/toolkit";

// const menuDummyItems = [
//     {
//         id: 1,
//         label: "Home",
//         url: "/",
//         subItems: [],
//     },
//     {
//         id: 2,
//         label: "About Us",
//         url: "",
//         subItems: [
//             {
//                 id: 3,
//                 label: "Our Story",
//                 url: "/about/story",
//                 subItems: [],
//             },
//             {
//                 id: 4,
//                 label: "Team",
//                 url: "",
//                 subItems: [
//                     {
//                         id: 5,
//                         label: "Management",
//                         url: "/about/team/management",
//                         subItems: [],
//                     },
//                     {
//                         id: 6,
//                         label: "Staff",
//                         url: "/about/team/staff",
//                         subItems: [],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: 7,
//         label: "Services",
//         url: "",
//         subItems: [
//             {
//                 id: 8,
//                 label: "Web Design",
//                 url: "/services/web-design",
//                 subItems: [],
//             },
//             {
//                 id: 9,
//                 label: "App Development",
//                 url: "",
//                 subItems: [
//                     {
//                         id: 10,
//                         label: "iOS",
//                         url: "/services/app-development/ios",
//                         subItems: [],
//                     },
//                     {
//                         id: 11,
//                         label: "Android",
//                         url: "/services/app-development/android",
//                         subItems: [],
//                     },
//                 ],
//             },
//             {
//                 id: 12,
//                 label: "SEO",
//                 url: "/services/seo",
//                 subItems: [],
//             },
//         ],
//     },
// ];

// const initialState = {
//     // sideMenu: [{id:, label, url, subItems: [{id, label, url, subItems}, ...]}, ...],
//     sideMenu: menuDummyItems, // It'll be replaced with empty array this is dummy data
// };

// const sideMenuSlice = createSlice({
//     name: "sideMenu",
//     initialState,
//     reducers: {
//         updateModules: (state, action) => {
//             return { ...state, ...action.payload };
//         },
//         updateSelectedModule: (state, action) => {
//             return { ...state, ...action.payload };
//         },
//     },
// });

// export const { update } = sideMenuSlice.actions;
// export default sideMenuSlice.reducer;
