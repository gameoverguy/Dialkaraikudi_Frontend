import * as XLSX from "xlsx";

const flattenObject = (obj, prefix = "") => {
  const flattened = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        !(value instanceof Date)
      ) {
        Object.assign(flattened, flattenObject(value, prefixedKey));
      } else {
        flattened[prefixedKey] =
          value instanceof Date ? value.toISOString() : value;
      }
    }
  }
  return flattened;
};

export const handleExportToExcel = ({ data }) => {
  if (!data || !Array.isArray(data)) return;

  const flattenedData = data.map((item, index) => {
    const flatItem = flattenObject(item);
    return {
      "S.No.": index + 1,
      ...flatItem,
    };
  });

  const allKeys = new Set();
  flattenedData.forEach((row) => {
    Object.keys(row).forEach((key) => allKeys.add(key));
  });

  const fullData = flattenedData.map((row) => {
    const filledRow = {};
    allKeys.forEach((key) => {
      filledRow[key] = row[key] !== undefined ? row[key] : "";
    });
    return filledRow;
  });

  const ws = XLSX.utils.json_to_sheet(fullData);

  const colWidths = [...allKeys].map((key) => ({
    wch: Math.max(key.length, 15),
  }));
  ws["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Export");

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  XLSX.writeFile(wb, `Dialkaraikudi-export-${timestamp}.xlsx`);
};
