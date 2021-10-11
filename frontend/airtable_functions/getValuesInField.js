export default function getValuesInField({ records, fields }, fallback) {
  if (!records || !fields) return [];
  const values = [];

  for (const record of records) {
    const newData = {};

    for (const field of fields) {
      const { name, field: airtableField } = field;

      const value = record.getCellValue(airtableField);

      if (value) {
        newData[name] = value;
      } else {
        newData[name] = fallback;
      }
    }

    values.push(newData);
  }

  return values;
}
