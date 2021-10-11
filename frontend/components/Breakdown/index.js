import {
  Box,
  Icon,
  Input,
  Text,
  useGlobalConfig,
  useRecords,
} from "@airtable/blocks/ui";
import React, { useRef, useState } from "react";
import { getBreakdowns } from "../../airtableFunctions";
import formatDate from "../../helpers/formatDate";
import { blue, grayText, green, red } from "../../colors";
import ConfigKeys from "./config";
import Settings from "./settings";

const storedValue = localStorage.getItem("breakdown_name");

const Breakdown = ({ table }) => {
  const globalConfig = useGlobalConfig();

  const viewFieldId = globalConfig.get(ConfigKeys.BREAKDOWN_VIEW_FIELD_ID);
  const viewField = table ? table.getViewByIdIfExists(viewFieldId) : null;

  const nameFieldId = globalConfig.get(ConfigKeys.NAME_FIELD_ID);
  const nameField = table ? table.getFieldByIdIfExists(nameFieldId) : null;

  const valueFieldId = globalConfig.get(ConfigKeys.VALUE_FIELD_ID);
  const valueField = table ? table.getFieldByIdIfExists(valueFieldId) : null;

  const records = useRecords(viewField);

  const breakdowns = getBreakdowns({ records, nameField, valueField })

  const total = breakdowns
    ? breakdowns.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0)
    : null;

  const [disabled, setDisabled] = useState(true);

  const [breakdownName, setBreakdownName] = useState(
    storedValue || "Breakdown"
  );

  const inputRef = useRef();

  const handleBreakdownChange = (e) => {
    localStorage.setItem("breakdown_name", e.target.value);
    setBreakdownName(e.target.value);
  };

  const onEditClick = () => {
    setDisabled(!disabled);
    if (disabled) {
      inputRef.current.focus();
    }
  };

  const inputStyle = {
    fontSize: "16px",
    fontWeight: "600",
    pointerEvents: disabled ? "none" : "auto",
    backgroundColor: disabled ? "white" : "rgba(45, 60, 150, 0.1)",
  };

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
      <Box
        display="flex"
        alignItems="center"
        borderBottom={`1px solid #f2f2ff`}
        justifyContent="space-between"
        paddingY={3}
        paddingX={3}
      >
        <Box display="flex">
          <Input
            flex={0}
            ref={inputRef}
            width={`${breakdownName.length + 3}ch`}
            readOnly={disabled}
            value={breakdownName}
            marginRight={1}
            onChange={handleBreakdownChange}
            style={inputStyle}
          />
          <Icon
            name={disabled ? "edit" : "check"}
            style={iconStyle}
            onClick={onEditClick}
          />
        </Box>
        <Settings table={table} />
      </Box>

      {breakdowns.map(({ count, name, value }) => {
        console.log(name);
        return (
          <Box
            key={name}
            display="flex"
            justifyContent="space-between"
            paddingY={2}
            paddingX={3}
            borderBottom={`1px solid #f2f2ff`}
          >
            <Box display="flex">
              <Text fontSize={16} marginX={2} textColor={blue} fontWeight={600}>
                {count}
              </Text>
              <Text fontSize={16} textColor={grayText}>
                {typeof name === "object" ? name.name : formatDate(name)}
              </Text>
            </Box>
            <Text
              fontSize={16}
              fontWeight={500}
              textColor={value > 0 ? green : red}
            >
              {value > 0 ? "+" : "-"}{" "}
              {Math.abs(Number(value)).toLocaleString("en", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </Box>
        )
      })}

      <Box
        display="flex"
        justifyContent="space-between"
        paddingY={2}
        paddingX={2}
      >
        <Text fontSize={16} fontWeight={500} padding={2}>
          Total Change:{" "}
        </Text>
        <Text
          fontSize={16}
          fontWeight={500}
          padding={2}
          textColor={total > 0 ? green : red}
        >
          {total > 0 ? "+" : "-"}{" "}
          {Math.abs(Number(total)).toLocaleString("en", {
            minimumFractionDigits: 2,
          })}
        </Text>
      </Box>
    </Box>
  );
};

const iconStyle = { cursor: "pointer" };

export default Breakdown;
