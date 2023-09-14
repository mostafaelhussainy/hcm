import React from "react";
import arrows from "../../assets/icons/Polygon2.svg";
import rate from "../../assets/icons/56311.svg";
import Skeleton from "@mui/material/Skeleton";
import MobiledataOffIcon from "@mui/icons-material/MobiledataOff";

function TurnOverRateChart({ isPending, data }) {
    return (
        <div id="turn-over-chart" className="fixed-chart">
            {isPending && (
                    <div className="fixed-chart__row turn-over-chart">
                        <figure className="fixed-chart__figure row">
                            <MobiledataOffIcon className="turn-over__figure" />
                            <figcaption>
                                <h3>
                                    <Skeleton
                                        variant="rounded"
                                        width={108}
                                        height={17}
                                    />
                                </h3>
                                <span>
                                    <Skeleton
                                        variant="rounded"
                                        width={44}
                                        height={18}
                                        sx={{ marginLeft: "auto" }}
                                    />
                                </span>
                            </figcaption>
                        </figure>
                    </div>
                )}
            {data &&
                <div className="fixed-chart__row turn-over-chart">
                    <figure className="fixed-chart__figure row">
                        <MobiledataOffIcon className="turn-over__figure" />
                        <figcaption>
                            <h3>{data.data[2].chartName}</h3>
                            <span>{data.data[2].values[0]}</span>
                        </figcaption>
                    </figure>
                </div>
                }
        </div>
    );
}

export default TurnOverRateChart;
