import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  treeObject:[],
  selectedLocations:[],
  currentSlecetedNods:[],
};

export const locationTreeSlice = createSlice({
  name: "locationTree",
  initialState,
  reducers: {
    changeCurrentSlecetedNods:(state, action)=>{

              state.currentSlecetedNods.push(parseInt(action.payload));

    },
    addToCurrentSlecetedNods:(state, action)=>{
      state.currentSlecetedNods.push(parseInt(action.payload));

    },
    removeAllCurrentSlecetedNods:(state, action)=>{
      state.currentSlecetedNods=[];

    },
    removeSlectedList:(state,action)=>{
      state.selectedLocations=[];
    },
    addSelectedNodeID: (state, action) => {
      state.selectedLocations.push(action.payload);
      },
   changeSelectedNodeList: (state, action) => {
    state.selectedLocations=state.currentSlecetedNods;
    },   
  removeSelectedNodeID: (state, action) => {
    
    const index = state.currentSlecetedNods.indexOf(parseInt(action.payload));
    if(state.currentSlecetedNods.length==1||index==0){
      state.currentSlecetedNods.splice(index,1);
    }else{
      state.currentSlecetedNods.splice(index,index);
    }
  },
  },
});

export const {removeAllCurrentSlecetedNods,changeSelectedNodeList,addToCurrentSlecetedNods, addSelectedNodeID,removeSelectedNodeID,removeSlectedList,changeCurrentSlecetedNods } = locationTreeSlice.actions;

export default locationTreeSlice.reducer;
