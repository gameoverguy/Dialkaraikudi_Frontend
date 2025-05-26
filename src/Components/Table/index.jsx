import React, { useState, useMemo } from "react";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaFileExport,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import { handleExportToExcel } from "../../utils/ExportToExcel";

const CustomTable = ({
  columns,
  data,
  allData,
  itemsPerPage = 10,
  addButton,
  onAddClick,
  searchPlaceholder = "Search...",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Search functionality
  const filteredData = useMemo(() => {
    return data?.filter((item) =>
      Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sorting functionality
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const paginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return <FaSort />;
    return sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />;
  };

  // const handleExportToExcel = () => {
  //   // Create worksheet from all data (not just filtered)
  //   const ws = XLSX.utils.json_to_sheet(
  //     data.map((item, index) => {
  //       const row = {};
  //       // Add S.No. as first column
  //       row["S.No."] = index + 1;

  //       columns.forEach((column) => {
  //         try {
  //           if (column.render) {
  //             // For rendered columns, get the actual data
  //             if (item[column.key] && typeof item[column.key] === "object") {
  //               // Handle nested objects (like category, business details etc)
  //               if (item[column.key].name) {
  //                 row[column.label] = item[column.key].name;
  //               } else if (item[column.key].businessName) {
  //                 row[column.label] = item[column.key].businessName;
  //               } else {
  //                 const nestedValues = Object.values(
  //                   item[column.key] || {}
  //                 ).filter((value) => value !== null && value !== undefined);
  //                 row[column.label] =
  //                   nestedValues.length > 0 ? nestedValues.join(" - ") : "";
  //               }
  //             } else {
  //               // Handle other rendered values with null check
  //               row[column.label] = item[column.key]
  //                 ? item[column.key].toString()
  //                 : "";
  //             }
  //           } else {
  //             // Handle direct values with null check
  //             row[column.label] = item[column.key] || "";
  //           }
  //         } catch (error) {
  //           // If any error occurs while processing a field, set it to empty string
  //           row[column.label] = "";
  //         }
  //       });
  //       return row;
  //     })
  //   );

  //   // Set column widths
  //   const colWidths = columns.map((col) => ({
  //     wch: Math.max(col.label.length, 15),
  //   }));
  //   ws["!cols"] = colWidths;

  //   // Create workbook and add the worksheet
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Data");

  //   // Generate timestamp for filename
  //   const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  //   // Save to file with timestamp
  //   XLSX.writeFile(wb, `data-export-${timestamp}.xlsx`);
  // };

  return (
    <div className="w-full p-6 bg-white mt-4 shadow rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-[50%]">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="pl-10 pr-4 py-2 border w-75 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none inline-block"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExportToExcel({ data: allData })}
            className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FaFileExport /> Export to Excel
          </button>
          {addButton && (
            <button
              onClick={onAddClick}
              className="bg-[#0A8A3D] text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-[#0A8A3D]/80 transition-colors"
            >
              {addButton}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => requestSort(column.key)}
                  className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-orange-100 border-b border-gray-500"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>{column.label}</span>
                    <span className="text-gray-400">
                      {getSortIcon(column.key)}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-green-100 text-center transition-colors duration-150 ease-in-out border-gray-400 border-b last:border-b-0"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm text-gray-800"
                  >
                    <div className="flex items-center justify-center">
                      {column.render
                        ? column.render(
                            item,
                            (currentPage - 1) * itemsPerPage + index
                          )
                        : item[column.key]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, sortedData?.length)} of{" "}
          {sortedData?.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="cursor-pointer  px-4 py-2 text-sm font-medium rounded border disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <FaArrowLeft />
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded border bg-blue-500 text-white border-blue-500">
            {currentPage}
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="cursor-pointer px-4 py-2 text-sm font-medium rounded border disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;

//how to use

// Example usage in another component
// import Table from '../Components/Table';

// const YourComponent = () => {
//   const columns = [
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     {
//       key: 'status',
//       label: 'Status',
//       render: (row) => (
//         <span className={`px-2 py-1 rounded ${
//           row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//         }`}>
//           {row.status}
//         </span>
//       )
//     }
//   ];

//   const data = [
//     { name: 'John Doe', email: 'john@example.com', status: 'active' },
//     // ... more data
//   ];

//   const handleAddClick = () => {
//     // Handle add button click
//   };

//   return (
//     <Table
//       columns={columns}
//       data={data}
//       itemsPerPage={10}
//       addButton="Add New"
//       onAddClick={handleAddClick}
//       searchPlaceholder="Search by name, email..."
//     />
//   );
// };
