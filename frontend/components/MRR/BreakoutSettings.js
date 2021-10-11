import { Box, FieldPickerSynced, FormField } from "@airtable/blocks/ui";
import React from "react";
import ConfigKeys from "./config";

export default function BreakoutSettings({ table }) {
  return (
    <Box display="flex" marginY={3} paddingX={3}>
      <FormField label="Type" paddingRight={1} marginBottom={0} width="33.33%">
        <FieldPickerSynced
          marginRight={2}
          style={{
            backgroundColor: "white",
            border: "1px solid #e6e6ff",
            borderRadius: "6px",
          }}
          maxWidth="300px"
          table={table}
          globalConfigKey={ConfigKeys.BREAKOUT_TYPE_FIELD_ID}
        />
      </FormField>

      <FormField width="33.33%" label="Label" paddingRight={1} marginBottom={0}>
        <FieldPickerSynced
          marginRight={2}
          style={{
            backgroundColor: "white",
            border: "1px solid #e6e6ff",
            borderRadius: "6px",
          }}
          maxWidth="300px"
          table={table}
          globalConfigKey={ConfigKeys.BREAKOUT_LABELS_FIELD_ID}
        />
      </FormField>
      <FormField
        width="33.33%"
        label="Values"
        paddingRight={1}
        marginBottom={0}
      >
        <FieldPickerSynced
          marginRight={2}
          style={{
            backgroundColor: "white",
            border: "1px solid #e6e6ff",
            borderRadius: "6px",
          }}
          maxWidth="300px"
          table={table}
          globalConfigKey={ConfigKeys.BREAKOUT_VALUE_FIELD_ID}
        />
      </FormField>
    </Box>
  );
}
