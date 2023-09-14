import React from "react";
import employees from "../../assets/icons/wow-users-thumn1.svg";
import Skeleton from "@mui/material/Skeleton";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

function HeadCountChart({ isPending, data }) {
    return (
        <div id="head-count-chart" className="fixed-chart">
            {isPending && (
                <div className="fixed-chart__row">
                    <figure className="fixed-chart__figure">
                        <SupervisedUserCircleIcon className="head-count-img" />
                    </figure>
                    <div className="fixed-chart__status">
                        <h3>
                            <Skeleton
                                variant="rounded"
                                sx={{
                                    marginLeft: "auto",
                                }}
                                width={100}
                                height={10}
                            />
                        </h3>
                        <span
                            style={{
                                display: "flex",
                                columnGap: "10px",
                                flexDirection: "flex-end",
                                alignItems: "center",
                            }}>
                            <Skeleton
                                variant="rounded"
                                width={70}
                                height={15}
                            />
                            <Skeleton
                                variant="rounded"
                                width={90}
                                height={15}
                            />
                        </span>
                    </div>
                </div>
            )}
            {data && (
                <div className="fixed-chart__row">
                    <figure className="fixed-chart__figure">
                        <SupervisedUserCircleIcon className="head-count-img" />
                    </figure>
                    <div className="fixed-chart__status">
                        <h3>{data.data[0].chartName}</h3>
                        <span>{data.data[0].values[0]} Employees</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HeadCountChart;
