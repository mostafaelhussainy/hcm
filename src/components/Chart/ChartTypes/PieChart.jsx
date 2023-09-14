import React from "react";
import {
    VictoryPie,
    VictoryTooltip,
    VictoryAxis,
    VictoryLabel,
    Slice,
    VictoryLegend,
    VictoryContainer,
} from "victory";

function PieChart({ data, somewhere }) {
    // var xAxisName = data.xAxisName.split("(")[0]
    // var yAxisName = data.yAxisName.split("(")[0]
    var xAxisName = data.xAxisName;
    var yAxisName = data.yAxisName;
    var legendTitle = `${yAxisName} : ${xAxisName}`;
    var colorScale = [
        "#9FD3C1",
        "#FFC0A8",
        "#FFF4D2",
        "#C5C3A6",
        "#7FAF94",
        "#AFCFE6",
        "#FFA8B4",
        "#E9E5D0",
        "#B2CB7E",
        "#E3DAC6",
        "#B6D7E2",
        "#F1CA8A",
        "#A5D4B0",
        "#F3D1B1",
        "#C3E5EC",
        "#D4CEB7",
        "#E7E3D4",
        "#B2D1DB",
        "#FFDDC6",
        "#EAE0BC",
        "#ADC3E3",
        "#D8F0D9",
        "#B0B0C9",
        "#F2D6D1",
        "#B1A99F",
        "#D5A88E",
        "#A9BDCB",
        "#DDECEA",
        "#E4DFCF",
        "#B9C1C0",
        "#A4D1C0",
        "#F5E8D2",
        "#FFBFA2",
        "#FFF1B9",
        "#C6C5A7",
        "#83B08E",
        "#A7D5E3",
        "#FF94A1",
        "#EAE5BF",
        "#A4CC76",
        "#E8D8C1",
        "#B1C7E2",
        "#D2A47A",
        "#A1B6C9",
        "#DAE8E4",
        "#E3DFD0",
        "#C0C9C7",
        "#DBDCCE",
        "#FFD8B2",
        "#EFE1AD",
        "#A4C7E2",
        "#D9EFDD",
        "#B4B4C5",
        "#F2D8CE",
        "#B1A297",
        "#D1A782",
        "#A8BBC9",
        "#DDE7E5",
        "#E2DFD0",
        "#B7C2C1",
        "#BFD9D8",
        "#FFDDB7",
        "#E8E0B6",
        "#A9C1E1",
        "#D6EDD9",
        "#B3B3C5",
        "#F2D9D4",
        "#B4AA9E",
        "#D2A887",
        "#A6B8C8",
        "#DBE6E3",
        "#E1DED3",
        "#B8C1C0",
        "#A0B5BD",
        "#C4E3F2",
        "#FFDAC0",
        "#E9E0B6",
        "#AAC1E1",
        "#D7EFD6",
        "#B3B3C4",
        "#F0D5D0",
        "#B2A99E",
        "#D2A87B",
        "#A6B9C8",
        "#DBE7E4",
        "#E2DED4",
        "#B8C1C1",
    ];
    var colorIdex = 0,
        colorCount = colorScale.length;
    const legendData = [];
    data.data.map((ele) => {
        var legend =
            `${
                ele?.yValue?.length > 10
                    ? ele.yValue.slice(0, 10) + "..."
                    : ele.yValue
            }` +
            ":" +
            `${
                ele?.xValue?.length > 10
                    ? ele.xValue.slice(0, 10) + "..."
                    : ele.xValue
            }`;
        legendData.push({
            name: legend,
            color: colorScale[colorIdex],
            tooltip: ele.label,
        });
        if (colorCount - 1 == colorIdex) {
            colorIdex = 0;
        } else {
            colorIdex = colorIdex + 1;
        }
    });
    return (
        <div className="pieChart">
            <VictoryPie
                origin={{ y: 150, x: 180 }}
                //standalone={false}
                dataComponent={<Slice />}
                // labels={({ datum }) => `${datum.y}`}
                colorScale={[
                    "#9FD3C1",
                    "#FFC0A8",
                    "#FFF4D2",
                    "#C5C3A6",
                    "#7FAF94",
                    "#AFCFE6",
                    "#FFA8B4",
                    "#E9E5D0",
                    "#B2CB7E",
                    "#E3DAC6",
                    "#B6D7E2",
                    "#F1CA8A",
                    "#A5D4B0",
                    "#F3D1B1",
                    "#C3E5EC",
                    "#D4CEB7",
                    "#E7E3D4",
                    "#B2D1DB",
                    "#FFDDC6",
                    "#EAE0BC",
                    "#ADC3E3",
                    "#D8F0D9",
                    "#B0B0C9",
                    "#F2D6D1",
                    "#B1A99F",
                    "#D5A88E",
                    "#A9BDCB",
                    "#DDECEA",
                    "#E4DFCF",
                    "#B9C1C0",
                    "#A4D1C0",
                    "#F5E8D2",
                    "#FFBFA2",
                    "#FFF1B9",
                    "#C6C5A7",
                    "#83B08E",
                    "#A7D5E3",
                    "#FF94A1",
                    "#EAE5BF",
                    "#A4CC76",
                    "#E8D8C1",
                    "#B1C7E2",
                    "#D2A47A",
                    "#A1B6C9",
                    "#DAE8E4",
                    "#E3DFD0",
                    "#C0C9C7",
                    "#DBDCCE",
                    "#FFD8B2",
                    "#EFE1AD",
                    "#A4C7E2",
                    "#D9EFDD",
                    "#B4B4C5",
                    "#F2D8CE",
                    "#B1A297",
                    "#D1A782",
                    "#A8BBC9",
                    "#DDE7E5",
                    "#E2DFD0",
                    "#B7C2C1",
                    "#BFD9D8",
                    "#FFDDB7",
                    "#E8E0B6",
                    "#A9C1E1",
                    "#D6EDD9",
                    "#B3B3C5",
                    "#F2D9D4",
                    "#B4AA9E",
                    "#D2A887",
                    "#A6B8C8",
                    "#DBE6E3",
                    "#E1DED3",
                    "#B8C1C0",
                    "#A0B5BD",
                    "#C4E3F2",
                    "#FFDAC0",
                    "#E9E0B6",
                    "#AAC1E1",
                    "#D7EFD6",
                    "#B3B3C4",
                    "#F0D5D0",
                    "#B2A99E",
                    "#D2A87B",
                    "#A6B9C8",
                    "#DBE7E4",
                    "#E2DED4",
                    "#B8C1C1",
                ]}
                data={data.data}
                x="xValue" // data accessor for x values
                y="yValue" // data accessor for y values
                // labelComponent={<VictoryLabel />}
                // labelPosition={({ index }) => (index ? "centroid" : "startAngle")}
                // labelPlacement={"parallel"}
                labelComponent={<VictoryTooltip />}
                //labels={({ datum }) => datum.y}
                // labelComponent={
                //  <VictoryLabel
                //      text={({ datum }) => [` ${datum.yValue}`]}
                //      style={[
                //         { fontSize: 20, fontWeight: 100, fontFamily : 'auto'   }
                //      ]} />
                // }

                labelRadius={({ innerRadius }) => innerRadius + 100}
                events={[
                    {
                        target: "data",
                        eventHandlers: {
                            // onClick: (event) => {
                            //     somewhere(event);
                            //     return [
                            //         {
                            //             target: "data",
                            //             mutation: (props) => {
                            //                 console.log(props);
                            //             },
                            //         },
                            //     ];
                            // },
                        },
                    },
                ]}>
                <VictoryAxis dependentAxis />
                <VictoryAxis
                    style={{ tickLabels: { angle: 45 } }}
                    // tickValues={xLabels}
                />
            </VictoryPie>
            {/*<VictoryLegend standalone={false}*/}
            {/*    colorScale={['#C8E4B2', "#9ED2BE", "#FFC6AC", "#FFF6DC", "#C4C1A4","#7EAA92"]}*/}
            {/*    x={380} y={0}*/}
            {/*    gutter={20}*/}
            {/*    title={legendTitle}*/}
            {/*    centerTitle*/}
            {/*    style={{ border: { stroke: "#b5b5b5", rx: "10", ry: "10" } }}*/}
            {/*    borderPadding={10}*/}
            {/*    data={legendData}*/}
            {/*/>*/}
            <div className="pieLegend">
                <p className="legendTitle">{legendTitle}</p>
                <div className="legendItems">
                    {legendData?.map((legendItem) => (
                        <p class="tooltip">
                            <span
                                style={{ background: legendItem.color }}
                                className={legendItem.color}></span>
                            <span class="tooltiptext">
                                {legendItem.tooltip}
                            </span>
                            {legendItem.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PieChart;
