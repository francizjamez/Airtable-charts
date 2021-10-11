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

const dayRegex = /\d\d\d\d-\d\d-\d\d/;

export default function (date) {
  if (!date) return "empty";

  const isDate = dayRegex.test(date);
  if (!isDate) return date;

  let splittedDate = date.split("/");
  [splittedDate[0], splittedDate[1]] = [splittedDate[1], splittedDate[0]];
  const formattedDate = new Date(splittedDate.join("-"));
  const monthName = monthNames[formattedDate.getMonth()];
  const day = formattedDate.getDate();
  return `${monthName} ${day}`;
}
