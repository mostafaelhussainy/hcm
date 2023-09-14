import React from "react";
import employees from "../../assets/icons/wow-users-thumn3.svg";
import Skeleton from "@mui/material/Skeleton";
import TodayIcon from "@mui/icons-material/Today";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";

function AvgAgeTenureChart({ isPending, data }) {
    return (
        <div id="avg-age-tenure-chart" className="fixed-chart">
            {isPending && (
                <div className="fixed-chart__row">
                    <figure className="fixed-chart__figure col">
                        <TodayIcon className="avg-age-tenure-img" />
                        <figcaption>
                            <h3>
                                <Skeleton
                                    variant="rounded"
                                    width={97}
                                    height={18}
                                />
                            </h3>
                            <span
                                style={{
                                    display: "flex",
                                }}>
                                <Skeleton
                                    variant="rounded"
                                    width={25}
                                    height={15}
                                    sx={{
                                        marginRight: "10px",
                                    }}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={40}
                                    height={15}
                                />
                            </span>
                        </figcaption>
                    </figure>
                    <figure className="fixed-chart__figure col">
                        <ManageHistoryIcon className="avg-age-tenure-img" />
                        <figcaption
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                columnGap: "10px",
                            }}>
                            <h3>
                                <Skeleton
                                    variant="rounded"
                                    width={180}
                                    height={15}
                                />
                            </h3>
                            <span>
                                <Skeleton
                                    variant="rounded"
                                    width={60}
                                    height={15}
                                />
                            </span>
                        </figcaption>
                    </figure>
                </div>
            )}
            {data && (
                <div className="fixed-chart__row">
                    <figure className="fixed-chart__figure col">
                        <TodayIcon className="avg-age-tenure-img" />
                        <figcaption>
                            <h3>Average Age</h3>
                            <span>{data.data[1].values[0]} Years</span>
                        </figcaption>
                    </figure>
                    <figure className="fixed-chart__figure col">
                        <ManageHistoryIcon className="avg-age-tenure-img" />
                        <figcaption>
                            <h3>Average Service Period</h3>
                            <span>
                                {data.data[1].values[1]
                                    ? data.data[1].values[1]
                                    : 0}{" "}
                            </span>
                        </figcaption>
                    </figure>
                </div>
            )}
        </div>
    );
}

export default AvgAgeTenureChart;
