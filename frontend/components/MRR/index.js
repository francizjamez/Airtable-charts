import { Box, Icon, Text, useGlobalConfig, useRecords } from "@airtable/blocks/ui";
import React from "react";
import {
  getFirstAndLastRecord,
  getMRRChartData,
} from "../../airtableFunctions";
import { opaqueGreen, opaqueRed, red, green } from "../../colors";
import ConfigKeys from "./config";
import Settings from "./Settings";
import LineChart from "./LineChart";
import BreakoutSettings from "./BreakoutSettings";
import Breakout from "./Breakout";

const MRR = ({ table }) => {
  const globalConfig = useGlobalConfig();

  const viewId = globalConfig.get(ConfigKeys.MRR_VIEW_ID);
  const view = table ? table.getViewByIdIfExists(viewId) : null;

  const records = useRecords(view);

  const xFieldId = globalConfig.get(ConfigKeys.MRR_X_FIELD_ID);
  const xField = table ? table.getFieldByIdIfExists(xFieldId) : null;

  const yFieldId = globalConfig.get(ConfigKeys.MRR_Y_FIELD_ID);
  const yField = table ? table.getFieldByIdIfExists(yFieldId) : null;

  const data =
    records && xField && yField
      ? getMRRChartData({ records, xField, yField })
      : null;

  const [first, last] =
    records && yField
      ? getFirstAndLastRecord({ records, yField })
      : [1, 0];

  let totalYield = (((last - first) / first) * 100).toFixed(2);

  if (isNaN(totalYield)) totalYield = 0;

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
    >
      <Box paddingTop={3}>
        <Box borderBottom={`1px solid #f2f2ff`} paddingY={3} paddingX={3}>
          <Settings table={table} />
        </Box>
        <Box paddingX={3}>
          <Text textColor="#7171a6" fontSize={16} marginTop={4}>
            MRR
          </Text>
          <Box
            display="flex"
            alignItems="baseline"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="baseline" marginY="25px">
              <Text fontSize={30} fontWeight={600} marginRight="8px">
                {!isNaN(Number(last)) && Number(last).toLocaleString("en")}
              </Text>
            </Box>
          </Box>

          <Box display="flex" alignItems="baseline" marginBottom={5}>
            <Box
              backgroundColor={
                totalYield > 0 ? opaqueGreen(0.2) : opaqueRed(0.2)
              }
              borderRadius={999}
              position="relative"
              top="1px"
            >
              {totalYield > 0 ? (
                <Icon name="up" size={16} fillColor={green} />
              ) : (
                <Icon
                  name="down"
                  size={16}
                  fillColor={red}
                  position="relative"
                  top="1px"
                />
              )}
            </Box>

            <Text
              marginLeft={2}
              fontSize={16}
              textColor={totalYield > 0 ? "#12c457" : "red"}
            >
              {Math.abs(totalYield)}%
            </Text>
          </Box>
        </Box>

        {data && (
          <Box marginBottom={4} paddingX={3}>
            <LineChart data={data} />
          </Box>
        )}

        <BreakoutSettings table={table} />
        <Breakout records={records} table={table} />
      </Box>
    </Box>
  );
};

export default MRR;
