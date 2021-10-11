import {
  Box,
  FieldPickerSynced,
  FormField,
  TablePickerSynced,
  ViewPickerSynced,
} from "@airtable/blocks/ui";
import GlobalConfigKeys from "../global.config";
import React from "react";

export default function Settings({ table }) {
  return (
    <Box
      display="flex"
      padding={3}
      borderBottom="thick"
      backgroundColor="white"
    >
      <FormField label="Table" width="100%" paddingRight={1} marginBottom={0}>
        <TablePickerSynced globalConfigKey={GlobalConfigKeys.TABLE_ID} />
      </FormField>
      {/* {table && (
        <FormField label="View" width="33.33%" paddingX={1} marginBottom={0}>
          <ViewPickerSynced
            table={table}
            globalConfigKey={GlobalConfigKeys.VIEW_ID}
          />
        </FormField>
      )}
      {table && (
        <FormField
          label="X-axis field"
          width="33.33%"
          paddingLeft={1}
          marginBottom={0}
        >
          <FieldPickerSynced
            table={table}
            globalConfigKey={GlobalConfigKeys.X_FIELD_ID}
          />
        </FormField>
      )}
      {table && (
        <FormField
          label="Y-axis field"
          width="33.33%"
          paddingLeft={1}
          marginBottom={0}
        >
          <FieldPickerSynced
            table={table}
            globalConfigKey={GlobalConfigKeys.Y_FIELD_ID}
          />
        </FormField>
      )} */}
    </Box>
  );
}
