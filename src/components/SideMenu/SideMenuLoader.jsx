import React from "react";
import { Skeleton } from "@mui/material";
function SideMenuLoader() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
            }}>
            <div
                style={{ 
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Skeleton variant="rectangular" width={210} height={10} />
                <Skeleton variant="rounded" width={15} height={15} />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Skeleton variant="rectangular" width={210} height={10} />
                <Skeleton variant="rounded" width={15} height={15} />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}> 
                <Skeleton variant="rectangular" width={210} height={10} />
                <Skeleton variant="rounded" width={15} height={15} />
            </div>
            <div
                style={{
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Skeleton variant="rectangular" width={210} height={10} />
                <Skeleton variant="rounded" width={15} height={15} />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Skeleton variant="rectangular" width={210} height={10} />
                <Skeleton variant="rounded" width={15} height={15} />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Skeleton variant="rectangular" width={210} height={10} />
                <Skeleton variant="rounded" width={15} height={15} />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Skeleton variant="rectangular" width={210} height={10} />
                <Skeleton variant="rounded" width={15} height={15} />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Skeleton variant="rectangular" width={210} height={10} />
                <Skeleton variant="rounded" width={15} height={15} />
            </div>
        </div>
    );
}

export default SideMenuLoader;
