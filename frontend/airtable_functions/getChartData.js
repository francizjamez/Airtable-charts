import { blue } from "../colors";

export default function getChartData({ records, xField, yField }) {
  if (!records || !xField || !yField) {
    return null;
  }


  // const recordsByXValueString = new Map();
  const labels = [];
  for (const record of records) {
    const xValue = record.getCellValue(xField);
    const xValueString =
      xValue === null ? null : record.getCellValueAsString(xField);
    // if (!recordsByXValueString.has(xValueString)) {
    //   recordsByXValueString.set(xValueString, [record]);
    // } else {
    //   recordsByXValueString.get(xValueString).push(record);
    // }
    labels.push(xValueString);
  }

  const points = [];

  for (const record of records) {
    const yValue = record.getCellValue(yField);
    const yValueString =
      yValue === null ? null : record.getCellValueAsString(yField);

    points.push(yValueString);
  }


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

  const formattedLabels = [];

  for (const xValueString of labels) {
    const label = xValueString === null ? "Empty" : xValueString;

    const dayRegex = /\d{1,2}\/\d{1,2}\/\d\d\d\d/;
    const isDate = dayRegex.test(label);

    if (isDate) {
      let splittedDate = label.split("/");
      [splittedDate[0], splittedDate[1]] = [splittedDate[1], splittedDate[0]];
      const date = new Date(splittedDate.join("-"));
      const monthName = monthNames[date.getMonth()];
      const day = date.getDate();
      formattedLabels.push(`${monthName} ${day}`);
    } else {
      formattedLabels.push(label);
    }
  }

  const data = {
    labels: formattedLabels,
    datasets: [
      {
        backgroundColor: new Array(labels.length).fill(blue),
        borderColor: ["#6078FF"],
        data: points,
        pointRadius: 0,
        lineTension: 0.2,
        borderWidth: 3,
        fill: false,
      },
    ],
  };

  return data;
}
