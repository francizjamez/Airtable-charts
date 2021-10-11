import { Box, FieldPickerSynced, FormField, ViewPickerSynced } from "@airtable/blocks/ui";
import React from "react";
import ConfigKeys from "./config";

export default function Settings({ table }) {
  return (
    <Box display="flex">
      {table && (
        // <FormField label="View" width="33.33%" marginRight={1}>
        <ViewPickerSynced
          marginRight={2}
          width="33.33%"
          style={dropdownStyle}
          table={table}
          globalConfigKey={ConfigKeys.MRR_VIEW_ID}
        />
        // </FormField>
      )}
      <FieldPickerSynced
        marginRight={2}
        width="33.33%"
        style={{
          backgroundColor: "white",
          border: "1px solid #e6e6ff",
          borderRadius: "6px",
        }}
        maxWidth="300px"
        table={table}
        globalConfigKey={ConfigKeys.MRR_X_FIELD_ID}
      />

      <FieldPickerSynced
        width="33.33%"
        style={{
          backgroundColor: "white",
          border: "1px solid #e6e6ff",
          borderRadius: "6px",
        }}
        maxWidth="300px"
        table={table}
        globalConfigKey={ConfigKeys.MRR_Y_FIELD_ID}
      />
    </Box>
  );
}

const dropdownStyle = {
  backgroundColor: "white",
  border: "1px solid #e6e6ff",
  borderRadius: "6px",
};