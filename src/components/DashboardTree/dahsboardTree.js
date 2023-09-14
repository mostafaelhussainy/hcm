import React , { useEffect } from "react";
import {forwardRef, useImperativeHandle, useRef} from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import LanguageIcon from '@mui/icons-material/Language';
import LocationTree from '../shared/locationTree/locationTree';
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import {changeSelectedNodeList} from '../../features/shared/locationTreeSlice';
import './DashboardTree.scss';
import ToastMessage from '../ui-components/toastMessage';

export default function DashboradTree() {
  const ref = useRef();
    const [locTreeDrawerOpen, setlocTreeDrawerOpen] = useState("closed");
    const [filterd, setFilterd] = useState(false);
    const dispatch = useDispatch();
    const selectedModuleId=useSelector((state) => state.dashboardMain.selectedModuleId);
    const nodeList=useSelector((state) => state.locationTree.currentSlecetedNods);
    let treeErrorMessage={type:"error",message:"You have to select at least 1 location"};

    const toggleLocTree = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        if(locTreeDrawerOpen=="opend"){
          setlocTreeDrawerOpen("closed");

        }else{
          setlocTreeDrawerOpen("opend");

        }
      };
      const applyLocTreeFilter=()=>{
        if(nodeList.length>0){
         dispatch(changeSelectedNodeList());
        setlocTreeDrawerOpen("closed");
        setFilterd(true)
        }else{
          ref.current.openToast(true)
        }

      };
      useEffect(() => {

    }, [selectedModuleId]);
      return ( 
    <>
    <button className={'locTreeBtn ' +locTreeDrawerOpen}  onClick={toggleLocTree(locTreeDrawerOpen)}>
        <LanguageIcon/>
        {filterd?('Filterd'):('All')}
        
        </button>

    <div
        id="treeDrawer"
        className={locTreeDrawerOpen}
      >
         <Box
          sx={{ width: '380px',height:'380px',overflowY: 'auto',overflowX: 'hidden'}}
          role="presentation"
          onClick={toggleLocTree(false)}
          onKeyDown={toggleLocTree(false)}
        >
          {selectedModuleId&&(
             <LocationTree moduleID={selectedModuleId}/>

          )}
        </Box>
        <div style={{textAlign:'center'}}>
                      <Button variant="contained"
                          id="treeDrawerApply"
                          className="btn succeseBtn"
                          onClick={(e) => applyLocTreeFilter()} style={{ margin: '10px 5px' }}>Apply</Button>

                      <Button style={{ margin: '10px 5px' }}
                          variant="outlined"
                          className="btn errorBtn"
                          id="treeDrawerClosed" color="error" onClick={(e) => setlocTreeDrawerOpen("closed")}>Cancel</Button>
        </div>
      </div>
   <ToastMessage toastProps={treeErrorMessage} ref={ref}/>

    </>
      )


}
