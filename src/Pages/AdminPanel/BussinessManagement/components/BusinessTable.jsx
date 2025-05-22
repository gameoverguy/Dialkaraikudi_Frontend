import React from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import CustomTable from '../../../../Components/Table/index';

const BusinessTable = ({ businesses, handleView, handleEdit, handleDelete, handleVerifiedToggle }) => {
    const columns = [
        {
          key: 'serialNo',
          label: 'S.No',
          render: (_, index) => index + 1
        },
        {
          key: 'name',
          label: 'Business Name'
        },
        {
          key: 'category',
          label: 'Category',
          render: (row) => row.category?.displayName || 'N/A'
        },
        {
          key: 'phone',
          label: 'Phone'
        },
        {
          key: 'email',
          label: 'Email'
        },
    
        {
          key: 'verified',
          label: 'Verified',
          render: (row) => (
            <div className="flex justify-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={row.verified}
                  onChange={() => handleVerifiedToggle(row)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )
        },
    
        {
          key: 'actions',
          label: 'Actions',
          render: (row) => (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleView(row)}
                className="p-2 text-blue-500 transition-colors"
                title="View"
              >
                <FaEye className="text-sm cursor-pointer" />
              </button>
              <button
                onClick={() => handleEdit(row)}
                className="p-2 text-green-500 transition-colors"
                title="Edit"
              >
                <FaEdit className="text-sm cursor-pointer" />
              </button>
              <button
                onClick={() => handleDelete(row)}
                className="p-2 text-red-500 transition-colors"
                title="Delete"
              >
                <FaTrashAlt className="text-sm cursor-pointer" />
              </button>
            </div>
          )
        }
      ];

  return (
    <CustomTable
      columns={columns}
      data={businesses}
      itemsPerPage={10}
      searchPlaceholder="Search by business detail"
    />
  );
};

export default BusinessTable;