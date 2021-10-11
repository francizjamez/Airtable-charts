import { Box, FieldPickerSynced, ViewPickerSynced } from "@airtable/blocks/ui";
import React from "react";
import ConfigKeys from "./config";

export default function Settings({ table }) {
  return (
    <Box display="flex">

      <ViewPickerSynced
        marginRight={2}
        table={table}
        globalConfigKey={ConfigKeys.BREAKDOWN_VIEW_FIELD_ID}
        style={{
          backgroundColor: "white",
          border: "1px solid #e6e6ff",
          borderRadius: "6px",
        }}
        maxWidth="300px"
      />

      <FieldPickerSynced
        marginRight={2}
        style={{
          backgroundColor: "white",
          border: "1px solid #e6e6ff",
          borderRadius: "6px",
        }}
        maxWidth="300px"
        table={table}
        globalConfigKey={ConfigKeys.NAME_FIELD_ID}
      />

      <FieldPickerSynced
        style={{
          backgroundColor: "white",
          border: "1px solid #e6e6ff",
          borderRadius: "6px",
        }}
        maxWidth="300px"
        table={table}
        globalConfigKey={ConfigKeys.VALUE_FIELD_ID}
      />
    </Box>
  );
}
