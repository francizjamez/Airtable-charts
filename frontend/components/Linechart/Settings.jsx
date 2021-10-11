import {
  Box,
  FieldPickerSynced,
  FormField,
  TablePickerSynced,
  ViewPickerSynced,
} from "@airtable/blocks/ui";
import React from "react";
import ConfigKeys from "./ConfigKeys";

const Settings = ({ DataInstance }) => {
  const { LINE_TABLE_ID, LINE_VIEW_ID, LINE_X_FIELD_ID, LINE_Y_FIELD_ID } =
    ConfigKeys;

  const table = DataInstance.table;

  return (
    <Box
      display="flex"
      backgroundColor="white"
      marginBottom={2}
      paddingX={3}
      paddingTop={3}
      style={{
        borderBottom: "1px solid #f2f2ff",
      }}
    >
      {/* <FormField label="Table" width="25%" marginRight={1}>
        <TablePickerSynced
          style={dropdownStyle}
          globalConfigKey={LINE_TABLE_ID}
        />
      </FormField> */}
      {table && (
        <FormField label="View" width="33.33%" marginRight={1}>
          <ViewPickerSynced
            style={dropdownStyle}
            table={table}
            globalConfigKey={LINE_VIEW_ID}
          />
        </FormField>
      )}
      {table && (
        <FormField label="X-axis field" width="33.33%" marginRight={1}>
          <FieldPickerSynced table={table} globalConfigKey={LINE_X_FIELD_ID} />
        </FormField>
      )}
      {table && (
        <FormField label="Y-axis field" width="33.33%" marginRight={0}>
          <FieldPickerSynced table={table} globalConfigKey={LINE_Y_FIELD_ID} />
        </FormField>
      )}
    </Box>
  );
};

const dropdownStyle = {
  backgroundColor: "white",
  border: "1px solid #e6e6ff",
  borderRadius: "6px",
};

export default Settings;
