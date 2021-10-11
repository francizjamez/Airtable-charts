import { blue } from "./colors";

export function getFirstAndLastRecord({ records, yField }) {
  // const recordsByYValueString = new Map();


  const points = [];
  for (const record of records) {
    const yValue = record.getCellValue(yField);
    const yValueString =
      yValue === null ? null : record.getCellValueAsString(yField);

    points.push(yValueString);
    // if (!recordsByYValueString.has(yValueString)) {
    //   recordsByYValueString.set(yValueString, [record]);
    // } else {
    //   recordsByYValueString.get(yValueString).push(record);
    // }
  }

  // const points = [];
  // for (const [yValueString, records] of recordsByYValueString.entries()) {
  //   const point = yValueString === null ? 0 : yValueString;
  //   points.push(point);
  // }

  return [points[0], points[points.length - 1]];
}

export function getBreakdowns({ records, nameField, valueField }) {

  if (!records || !nameField || !valueField) return [];
  const breakdowns = {};

  for (const record of records) {

    const name = record.getCellValue(nameField);
    const value = record.getCellValue(valueField);
    const newBreakdown = { name, value, count: 1 };

    if (!name || !value) return [];

    if (typeof name === "object") {

      const id = name.id;
      if (breakdowns[id]) {
        breakdowns[id].count++;
        breakdowns[id].value += newBreakdown.value;
      } else {
        newBreakdown.name = name.name
        breakdowns[name.id] = newBreakdown;
      }
    }
    else {
      if (breakdowns[name]) {
        breakdowns[name].count++;
        breakdowns[name].value += newBreakdown.value;
      }
      else {
        breakdowns[name] = newBreakdown;
      }
    }
  }

  const formatted = Object.entries(breakdowns).map(([key, value]) => ({
    id: key,
    ...value,
  }));


  return formatted;
}

export function getMRRChartData({ records, xField, yField }) {
  // const recordsByXValueString = new Map();
  const recordsByXValueString = []
  for (const record of records) {
    const xValue = record.getCellValue(xField);
    const xValueString =
      xValue === null ? null : record.getCellValueAsString(xField);
    // if (!recordsByXValueString.has(xValueString)) {
    //   recordsByXValueString.set(xValueString, [record]);
    // } else {
    //   recordsByXValueString.get(xValueString).push(record);
    // }
    recordsByXValueString.push(xValueString)
  }

  const points = [];

  for (const record of records) {
    const yValue = record.getCellValue(yField);
    const yValueString =
      yValue === null ? null : record.getCellValueAsString(yField);

    points.push(yValueString);
  }

  const labels = [];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (const xValueString of recordsByXValueString) {
    const label = xValueString === null ? "Empty" : xValueString;

    const dayRegex = /\d{1,2}\/\d{1,2}\/\d\d\d\d/;
    const isDate = dayRegex.test(label);

    if (isDate) {
      let splittedDate = label.split("/");
      [splittedDate[0], splittedDate[1]] = [splittedDate[1], splittedDate[0]];
      const date = new Date(splittedDate.join("-"));
      const monthName = monthNames[date.getMonth()];
      const day = date.getDate();
      labels.push(`${monthName} ${day}`);
    } else {
      labels.push(label);
    }
  }

  const data = {
    labels,
    datasets: [
      {
        backgroundColor: new Array(labels.length).fill(
          "rgba(96, 120, 255, 0.1)"
        ),
        pointBackgroundColor: "white",
        pointBorderColor: blue,
        pointHoverBorderWidth: 2,
        pointHoverRadius: 10,
        borderColor: ["#6078FF"],
        fillColor: "#ffff00",
        data: points,
        pointRadius: 0,
        lineTension: 0.1,
        borderWidth: 5,
      },
    ],
  };

  return data;
}
