import React, { useEffect } from "react";
import CreateBtn from "./CreateBtn";
import { useState } from "react";

function Chart({ id, toggleChartControl }) {
    return (
        <figure className="chart">
            <CreateBtn toggleChartControl={toggleChartControl} />
        </figure>
    );
}

export default Chart;
