import React, { useState } from "react";
import {
  Box,
  Text,
  Icon,
  useRecords,
  useBase,
  useGlobalConfig,
} from "@airtable/blocks/ui";
import { Line } from "react-chartjs-2";
import { green, opaqueGreen, opaqueRed, red } from "../../colors";
import Settings from "./Settings";
import ConfigKeys from "./ConfigKeys";
import DataClass from "./DataClass";

const LineChart = ({ table }) => {
  const base = useBase();
  const globalConfig = useGlobalConfig();
  const { LINE_TABLE_ID, LINE_VIEW_ID, LINE_X_FIELD_ID, LINE_Y_FIELD_ID } =
    ConfigKeys;

  // const tableId = globalConfig.get(LINE_TABLE_ID);
  // const table = base.getTableByIdIfExists(tableId);

  const viewId = globalConfig.get(LINE_VIEW_ID);
  const view = table ? table.getViewByIdIfExists(viewId) : null;

  const xFieldId = globalConfig.get(LINE_X_FIELD_ID);
  const xField = table ? table.getFieldByIdIfExists(xFieldId) : null;

  const yFieldId = globalConfig.get(LINE_Y_FIELD_ID);
  const yField = table ? table.getFieldByIdIfExists(yFieldId) : null;

  const records = useRecords(view);

  const DataInstance = new DataClass({ table, view, records, xField, yField });
  const data = DataInstance.getData();
  const [first, last] = DataInstance.getFirstAndLast()
  const totalYield = DataInstance.getTotalYield() || 0;

  return (
    <Box
      marginY="10px"
      backgroundColor="white"
      borderRadius="12px"
      display="flex"
      flex={1}
      marginRight={2}
      flexDirection="column"
      minWidth="400px"
      overflow="hidden"
    >
      <Settings DataInstance={DataInstance} />
      <Box padding={3}>
        <Text marginY="5px" textColor="#7171a6" fontSize={16}>
          {table?.name}
        </Text>
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="baseline" marginY="25px">
            <Text fontSize={24} fontWeight={600} marginRight="8px">
              {Number(last).toLocaleString("en")}
            </Text>
            <Text fontSize={20} textColor="#b8b8d9">
              from{" "}
              {Number(first).toLocaleString("en", {
                notation: "compact",
              })}
            </Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Box
              backgroundColor={
                totalYield > 0 ? opaqueGreen(0.2) : opaqueRed(0.2)
              }
              borderRadius={999}
              position="relative"
              top="1px"
            >
              {totalYield > 0 ? (
                <Icon name="up" size={20} fillColor={green} />
              ) : (
                <Icon
                  name="down"
                  size={20}
                  fillColor={red}
                  position="relative"
                  top="1px"
                />
              )}
            </Box>

            <Text
              marginLeft={2}
              fontSize={20}
              fontWeight={700}
              textColor={totalYield > 0 ? "#12c457" : "red"}
            >
              {Math.abs(totalYield).toFixed(2)}%
            </Text>
          </Box>
        </Box>

        {data && (
          <Box>
            <Line
              responsive={true}
              data={data}
              options={{
                hover: {
                  mode: "nearest",
                  intersect: false,
                },
                maintainAspectRatio: false,
                bezierCurve: false,
                legend: { display: false },
                scales: {
                  yAxes: [
                    {
                      gridLines: { display: false },
                      ticks: {
                        fontColor: "#CCC",
                        maxTicksLimit: 5,
                        callback: function (value, index, values) {
                          return value.toLocaleString("en-US", {
                            // style: "currency",
                            // currency: "USD",
                            compactDisplay: "short",
                            notation: "compact",
                            minimumSignificantDigits: 3,
                            maximumSignificantDigits: 3,
                          });
                        },
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: { display: false },
                      ticks: {
                        fontColor: "#CCC",
                      },
                    },
                  ],
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

function numberToCurrency(num, options = {}) {
  return Number(num).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    ...options,
  });
}

export default LineChart;
