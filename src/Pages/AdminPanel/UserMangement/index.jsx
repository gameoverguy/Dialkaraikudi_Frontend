import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import CustomTable from '../../../Components/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from '../../../Components/ConfirmationModal';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Replace with your actual API call
      setUsers([
        {
          id: 1,
          name: 'John Doe',
          mobile: '+91 9876543210',
          email: 'john@example.com',
          password: '********',
        },
        {
          id: 2,
          name: 'Jane Smith',
          mobile: '+91 9876543211',
          email: 'jane@example.com',
          password: '********',
        },
        {
          id: 3,
          name: 'Mike Johnson',
          mobile: '+91 9876543212',
          email: 'mike@example.com',
          password: '********',
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = async (user) => {
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Implement delete API call here
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setShowModal(false);
      setShowConfirmModal(false);
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const columns = [
    { 
      key: 'name',
      label: 'Name'
    },
    { 
      key: 'mobile',
      label: 'Mobile Number'
    },
    { 
      key: 'email',
      label: 'Email'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex space-x-2 text-center justify-center">
                   <FaEye size={16}
             onClick={() => handleView(row)}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            title="View Details"/>
        </div>
      )
    }
  ];

  const Modal = ({ user, onClose }) => {
    if (!user) return null;

    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <div className="space-y-3">
            <div>
              <label className="font-semibold">Name:</label>
              <p>{user.name}</p>
            </div>
            <div>
              <label className="font-semibold">Mobile Number:</label>
              <p>{user.mobile}</p>
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <p>{user.email}</p>
            </div>
            <div>
              <label className="font-semibold">Password:</label>
              <p>{user.password}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => handleDelete(user)}
              className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete User
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <CustomTable
        columns={columns}
        data={users}
        itemsPerPage={5}
        searchPlaceholder="Search..."
      />
      {showModal && (
        <Modal
          user={selectedUser}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
        />
      )}
      
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
};

export default UserTable;