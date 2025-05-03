import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import CustomTable from '../../../Components/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from '../../../Components/ConfirmationModal';
import { API } from '../../../../config/config'
import axios from 'axios';
import CustomModal from '../../../Components/modal';


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

      const response = await axios.get(`${API}/user`)
      console.log(response.data);
      setUsers(response.data);
    }
    catch (error) {
      console.error('Error fetching users:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = async (user) => {
    setShowModal(false);
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Implement delete API call here
      setUsers(users.filter(u => u._id !== userToDelete._id));
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
      key: 'phone',
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
            title="View Details" />
        </div>
      )
    }
  ];

  const Modal = ({ user, onClose }) => {
    if (!user) return null;

    return (
      <CustomModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setFormData({ name: '', image: null });
          setImagePreview(null);
          setErrors({});
        }}
        title={"User Details"}
      >
        <div className="space-y-3">
          <div>
            <label className="font-semibold">Name:</label>
            <p>{user.name}</p>
          </div>
          <div>
            <label className="font-semibold">Mobile Number:</label>
            <p>{user.phone}</p>
          </div>
          <div>
            <label className="font-semibold">Email:</label>
            <p>{user.email}</p>
          </div>
          {/* <div>
            <label className="font-semibold">Password:</label>
            <p>{user.password}</p>
          </div> */}
        </div>
        <div className="mt-6 flex  justify-end">
          <button
            onClick={() => handleDelete(user)}
            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete User
          </button>
        </div>
      </CustomModal>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <ToastContainer />
      <div className='shadow bg-white p-6 rounded-lg'>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui atque iure reprehenderit harum tempora ex voluptas dolor recusandae aliquam nostrum mollitia totam deleniti reiciendis consequuntur odio, nam eaque voluptatibus eius maxime. Repellat alias quas distinctio voluptatem molestiae quasi nulla nemo!</span>
      </div>
      <CustomTable
        columns={columns}
        data={users}
        itemsPerPage={10}
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