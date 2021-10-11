import { Box, Text, useGlobalConfig } from "@airtable/blocks/ui";
import React from "react";
import getValuesInField from "../../airtable_functions/getValuesInField";
import { green, red } from "../../colors";
import formatDate from "../../helpers/formatDate";
import ConfigKeys from "./config";

const Breakout = ({ records, table }) => {
  const globalConfig = useGlobalConfig();

  const breakoutTypeField = getField(
    ConfigKeys.BREAKOUT_TYPE_FIELD_ID,
    table,
    globalConfig
  );

  let breakoutTypes =
    records && breakoutTypeField
      ? getValuesInField({
        records,
        fields: [{ field: breakoutTypeField, name: "type" }],
      })
      : [];

  breakoutTypes = breakoutTypes.map(({ type }) => (type ? type.name : "empty"));

  breakoutTypes = [...new Set(breakoutTypes)];

  const breakoutLabelsField = getField(
    ConfigKeys.BREAKOUT_LABELS_FIELD_ID,
    table,
    globalConfig
  );

  const breakoutLabels =
    records && breakoutLabelsField
      ? getValuesInField({
        records,
        fields: [{ field: breakoutLabelsField, name: "label" }],
      }) || []
      : [];


  const breakoutValuesField = getField(
    ConfigKeys.BREAKOUT_VALUE_FIELD_ID,
    table,
    globalConfig
  );

  const valueData = generateDataValues();


  return (
    <Box display="flex">
      <Box zIndex={1} boxShadow="5px 0px 3px rgba(161, 160, 159, 0.5)">
        <Text
          fontWeight={600}
          flex={1}
          paddingY={2}
          paddingX={4}
          border="1px solid #E6E6FF"
          backgroundColor="#FCFCFF"
          textColor="#7171A6"
          fontSize="12px"
        >
          BREAKOUT
        </Text>
        {breakoutTypes.map((name) => (
          <Text
            key={name}
            fontSize="16px"
            fontWeight={600}
            backgroundColor="white"
            paddingY={2}
            paddingX={4}
            border="1px solid #E6E6FF"
            borderTop="hidden"
            borderLeft="hidden"
            flex={1}
          >
            {name || "empty"}
          </Text>
        ))}
        <Text
          fontSize="16px"
          fontWeight={600}
          backgroundColor="white"
          flex={0}
          paddingY={2}
          paddingX={4}
          border="1px solid #E6E6FF"
          borderTop="hidden"
          flex={1}
        >
          Change
        </Text>
      </Box>

      {breakoutLabels.map(({ label }, i) => {
        const formattedLabel = formatDate(label);
        const totalChange = valueData ? calculateChange(valueData[i]) : 0;
        return (
          <Box flex={1} key={label}>
            <Text
              paddingY={2}
              paddingLeft={3}
              fontWeight={600}
              fontSize="12px"
              textColor="#7171A6"
              backgroundColor="#FCFCFF"
              border="1px solid #E6E6FF"
              borderRight="hidden"
              borderLeft="hidden"
            >
              {formattedLabel}
            </Text>
            {valueData &&
              valueData[i].map((val) => (
                <Text
                  key={val}
                  fontWeight={400}
                  paddingY={2}
                  paddingLeft={3}
                  border="1px solid #E6E6FF"
                  borderLeft="hidden"
                  borderRight="hidden"
                  borderTop="hidden"
                  textColor={val === 0 ? "black" : val > 0 ? green : red}
                >
                  {Number(val).toLocaleString("en")}
                </Text>
              ))}
            <Text
              fontWeight={400}
              paddingY={2}
              paddingLeft={3}
              border="1px solid #E6E6FF"
              borderLeft="hidden"
              borderRight="hidden"
              borderTop="hidden"
              textColor={
                totalChange === 0 ? "black" : totalChange > 0 ? green : red
              }
            >
              {Number(totalChange).toLocaleString("en")}
            </Text>
          </Box>
        );
      })}
    </Box>
  );

  function generateDataValues() {
    const data = generateData();

    if (!breakoutLabels.length || !breakoutTypes.length || !data || !records) return null;

    const valueData = new Array(breakoutLabels.length)
      .fill(0)
      .map(() => new Array(breakoutTypes.length).fill(0));

    data.forEach(({ type, label, value }) => {
      if (!type) return;
      const foundLabel = breakoutLabels.find(
        (breakoutLabel) => breakoutLabel.label === label
      );

      const i = breakoutLabels.indexOf(foundLabel);

      const foundType = breakoutTypes.find(
        (breakoutType) => breakoutType === type.name
      );
      const j = breakoutTypes.indexOf(foundType);
      valueData[i][j] = value || 0;
    });

    return valueData;
  }

  function generateData() {
    if (
      !records ||
      !breakoutTypeField ||
      !breakoutLabelsField ||
      !breakoutValuesField
    ) {

      return null;
    }

    const data = getValuesInField({
      records,
      fields: [
        {
          name: "type",
          field: breakoutTypeField,
        },
        {
          name: "label",
          field: breakoutLabelsField,
        },
        {
          name: "value",
          field: breakoutValuesField,
        },
      ],
    });

    return data;
  }
};

function calculateChange(arr) {
  return arr.reduce((acc, cur) => acc + cur);
}

function getField(keyId, table, globalConfig) {
  const fieldId = globalConfig.get(ConfigKeys[keyId]);
  const field = table ? table.getFieldByIdIfExists(fieldId) : null;
  return field;
}

export default Breakout;
