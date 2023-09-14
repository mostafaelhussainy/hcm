import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const pinnedChartsSlice = createSlice({
    name: "pinnedCharts",
    initialState,
    reducers: {
        update: (state, action) => {
            return action.payload;
        },
        push: (state, action) => {
            if(action.payload.index!==null){
                state.splice(action.payload.index, 0, action.payload.id);
                //return state={...newrray}
                //return [...state];

            }else{
              return [...state, action.payload.id];

            }

            
        },
        pop: (state, action) => {
            return state.filter((id) => id !== action.payload);
        },
    },
});

export const { update, push, pop } = pinnedChartsSlice.actions;
export default pinnedChartsSlice.reducer;
