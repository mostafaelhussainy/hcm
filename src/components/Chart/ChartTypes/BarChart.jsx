import {
    Bar,
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTheme,
    VictoryTooltip,
    VictoryZoomContainer,
    VictoryLabel,
    VictoryLegend,
    VictoryVoronoiContainer,
} from "victory";
import { useEffect } from "react";

function BarChart({
    data,
    somewhere,
    fontSizeNum,
    heightNum,
    labelFontSize,
    axisLabelPadding,
}) {
    // const xLabels = [
    //     { xValue: "masr", yValue: 2 },
    //     { xValue: "a7md", yValue: 0 },
    //     { xValue: "test", yValue: 8 },
    //     { xValue: "sd", yValue: 3 },
    //     { xValue: "123", yValue: 2 },
    //     { xValue: "dasd", yValue: 5 },
    //     { xValue: "asd", yValue: 0 },
    //     { xValue: "qwe", yValue: 0 },
    //     { xValue: "qse", yValue: 0 },
    //     { xValue: "axac", yValue: 10 },
    // ];
    data.data.map((ele) => {
        ////check string is number or text
        if (!isNaN(+ele.yValue)) {
            ele.yValue = parseInt(ele.yValue);
        } else {
            ele.yValue = `${
                ele.yValue.length > 8
                    ? ele.yValue.slice(0, 8) + "..."
                    : ele.yValue
            }`;
        }
        if (!isNaN(+ele.xValue)) {
            ele.xValue = parseInt(ele.xValue);
        } else {
            ele.xValue = `${
                ele.xValue.length > 8
                    ? ele.xValue.slice(0, 8) + "..."
                    : ele.xValue
            }`;
        }
    });
    return (
        <VictoryChart
            minDomain={0}
            padding={{ top: 20, bottom: 100, left: 200, right: 100 }}
            containerComponent={<VictoryZoomContainer />}
            theme={VictoryTheme.material} // adding the material theme provided with Victory
            domainPadding={70} // domainPadding will add space to each side of VictoryBar to prevent it from overlapping the axis
            width={1500}
            height={heightNum}>
            <VictoryAxis
                dependentAxis
                label={data.yAxisName}
                labelComponent={<VictoryLabel textAnchor="end" />}
                style={{
                    axisLabel: { fontSize: fontSizeNum + 20, padding: 180 },
                    tickLabels: {
                        angle: 0,
                        fontSize: fontSizeNum,
                        padding: 10,
                    },
                }}
                fixLabelOverlap
            />
            <VictoryAxis
                tickLabelComponent={<VictoryLabel dy={0} dx={100} />}
                padding={{ top: 200, bottom: 60, left: 100, right: 100 }}
                style={{
                    axisLabel: {
                        fontSize: fontSizeNum + 20,
                        padding: axisLabelPadding,
                    },
                    tickLabels: { angle: 60, fontSize: fontSizeNum },
                    ticks: { stroke: "grey", size: 5 },
                }}
                label={data.xAxisName}
                fixLabelOverlap
            />
            <VictoryBar
                className="asdasdas"
                data={data.data}
                padding={20}
                labels={true}
                labelComponent={
                    ((
                        <VictoryLabel
                            dy={-15}
                            text={({ datum }) => [` ${datum.yValue}`]}
                            style={[
                                {
                                    fontSize: labelFontSize,
                                    fontWeight: 100,
                                    fontFamily: "auto",
                                },
                            ]}
                        />
                    ),
                    (<VictoryTooltip />))
                }
                x="xValue" // data accessor for x values
                y="yValue" // data accessor for y values
                style={{
                    data: {
                        fill: "#FFC6AC",
                        width: 30,
                    },
                    labels: { fontSize: 35 },
                }}
                events={[
                    {
                        target: "data",
                        eventHandlers: {
                            // onClick: (evt) => {
                            //     somewhere(evt);
                            //     return [
                            //         {
                            //             target: "data",
                            //             mutation: (props) => {},
                            //         },
                            //     ];
                            // },
                        },
                    },
                ]}
            />
        </VictoryChart>
    );
}

export default BarChart;
