import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import "./skeleton-barchart.scss"
function SkeletonBarChart() {
    return (
        <div className="skeleton-bar-chart-wrapper">
          <Grid container wrap="nowrap"  sx={{ height:'350' }}>
          <Box width="10%"  sx={{ height:'350' ,margin:'0px 5px'}}>
              <Skeleton height="100%" />
            </Box>
            <Box width="10%"  sx={{ height:'350px',margin:'0px 5px' }}>
              <Skeleton   height="100%"/>
            </Box>
            <Box  width="10%"   sx={{ height:'350px',margin:'0px 5px' }}>
              <Skeleton  height="100%"/>
            </Box>
            <Box width="10%"  sx={{ height:'350px',margin:'0px 5px' }}>
              <Skeleton  height="100%"/>
            </Box>
            <Box width="10%"  sx={{ height:'350px',margin:'0px 5px' }}>
              <Skeleton  height="100%"/>
            </Box>
            <Box width="10%"  sx={{ height:'350px',margin:'0px 5px' }}>
              <Skeleton  height="100%"/>
            </Box>
            <Box width="10%"  sx={{ height:'350px',margin:'0px 5px' }}>
              <Skeleton  height="100%"/>
            </Box>
            <Box width="10%"  sx={{ height:'350px',margin:'0px 5px' }}>
              <Skeleton  height="100%"/>
            </Box>
            <Box width="10%"  sx={{ height:'350px' ,margin:'0px 5px'}}>
              <Skeleton  height="100%"/>
            </Box>
          </Grid>
        </div>
    );
}

export default SkeletonBarChart;
