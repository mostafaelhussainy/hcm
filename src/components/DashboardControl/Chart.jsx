import { Bar, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLabel, Slice, VictoryLegend, Border, VictoryTooltip, Background } from 'victory';
import ContextMenuTest from "./ContextMenuTest"
import {
  contextMenu
} from "react-contexify";

function Chart() {

    const data = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000},
        {quarter: 5, earnings: 13000},
        {quarter: 6, earnings: 16500},
        {quarter: 7, earnings: 14250},
        {quarter: 8, earnings: 19000},
        {quarter: 9, earnings: 13000},
        {quarter: 10, earnings: 16500},
        {quarter: 11, earnings: 13000},
        {quarter: 12, earnings: 16500},
        {quarter: 13, earnings: 14250},
        {quarter: 14, earnings: 19000},
        {quarter: 15, earnings: 13000},
        {quarter: 16, earnings: 16500},
        {quarter: 17, earnings: 14250},
        {quarter: 18, earnings: 19000},
        {quarter: 19, earnings: 13000},
        {quarter: 20, earnings: 16500},
        {quarter: 21, earnings: 13000},
        {quarter: 22, earnings: 16500},
        {quarter: 23, earnings: 14250},
        {quarter: 24, earnings: 19000},
        {quarter: 25, earnings: 13000},
        {quarter: 26, earnings: 16500},
        {quarter: 27, earnings: 14250},
        {quarter: 28, earnings: 19000},
        {quarter: 29, earnings: 13000},
        {quarter: 30, earnings: 16500},
      ];
      function somewhere(e){
        contextMenu.show({
          id: "menu-id",
          event: e
        });
      }
      
  return (
    <div>
        <h1>Victory Tutorial</h1>
        <div style={{display:"flex"}}>
            <VictoryPie
                dataComponent={<Slice />}
                labels={({ datum }) => `${datum.y}`}
                labelComponent={<VictoryLabel />}
                colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                data={[
                    { x: "Cats", y: 1 },
                    { x: "Dogs", y: 1 },
                    { x: "Birds", y: 2 }
                ]}
                events={[
                    {
                      target: "data",
                      eventHandlers: {
                        onClick: () => {
                          return [{
                            target: "data",
                            mutation: (props) => {
                              console.log(props)
                            }
                          }];
                        }
                      }
                    }
                ]}
            />
            <VictoryChart
                theme={VictoryTheme.material} // adding the material theme provided with Victory
                domainPadding={20} // domainPadding will add space to each side of VictoryBar to prevent it from overlapping the axis
            >
                  <VictoryLegend x={100} y={0}
                    title="Legend"
                    centerTitle // make the title in the center
                    orientation="horizontal"
                    colorScale={[ "navy", "blue", "cyan" ]}
                    gutter={5}
                    style={{border: { stroke: "black" }, title: {fontSize: 20 } }}
                    data={[
                      { name: "One", symbol: { fill: "tomato", type: "star" } },
                      { name: "Two", symbol: { fill: "orange" } },
                      { name: "Three", symbol: { fill: "gold" } }
                    ]}
                    borderComponent={<Border width={150}/>}
                    borderPadding={{ top: 2, bottom: 2 }}
                  />
                <VictoryAxis
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                />
                <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickFormat={(x) => (`$${x / 1000}k`)}
                />
                <VictoryBar
                    dataComponent={
                      <Bar
                        events={{
                          // onClick: (evt) => somewhere(evt)
                        }}
                      />
                    }
                    data={data}
                    x="quarter" // data accessor for x values
                    y="earnings" // data accessor for y values
                    style={{
                        data: {
                        fill: 'orange'
                        }
                    }}
                    events={[
                        {
                          target: "data",
                          eventHandlers: {
                            onClick: (evt) => {
                              somewhere(evt)
                              return [{
                                target: "data",
                                mutation: (props) => {
                                  console.log(props);
                                }
                              }];
                            }
                            // onClick: () => {
                            //   return [{
                            //     target: "data",
                            //     mutation: (props) => {
                            //       console.log(props);
                            //     }
                            //   }];
                            // }
                          }
                        }
                    ]}
                />
            </VictoryChart>
            <ContextMenuTest />
        </div>
      </div>
  )
}

export default Chart