import {
  initializeBlock,
  useBase,
  useRecords,
  useGlobalConfig,
  Box,
} from "@airtable/blocks/ui";
import React from "react";
import GlobalConfigKeys from "./global.config";
import Settings from "./components/Settings";

import BarChart from "./components/BarChart";
import Breakdown from "./components/Breakdown";
import MRR from "./components/MRR";
import LineChart from "./components/Linechart";
import getChartData from "./airtable_functions/getChartData";

import { store } from "./redux/store";
import { Provider } from "react-redux";

function SimpleChartApp() {
  const base = useBase();
  const globalConfig = useGlobalConfig();

  const tableId = globalConfig.get(GlobalConfigKeys.TABLE_ID);
  const table = base.getTableByIdIfExists(tableId);

  const viewId = globalConfig.get(GlobalConfigKeys.VIEW_ID);
  const view = table ? table.getViewByIdIfExists(viewId) : null;

  const records = useRecords(view);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      flexDirection="column"
      backgroundColor="rgba(96, 120, 255, 0.1)"
      padding="10px"
      height="max-content"
    >
      <Settings table={table} />

      <Box display="flex" flexWrap="wrap">
        <LineChart table={table} />
        <BarChart
          table={table}
        />
        <Breakdown table={table} />
      </Box>
      <MRR table={table} records={records} />
    </Box>
  );
}

initializeBlock(() => (
  <Provider store={store}>
    <SimpleChartApp />
  </Provider>
));
