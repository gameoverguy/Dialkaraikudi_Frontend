import React, { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import CustomTable from "../../../Components/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../../Components/ConfirmationModal";
import { API } from "../../../../config/config";
import axios from "axios";
import CustomModal from "../../../Components/modal";
import Loader from "../../../Components/Loader";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
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

      const response = await axios.get(`${API}/user`);
      console.log(response.data);
      setUsers(response.data);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
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
      setUsers(users.filter((u) => u._id !== userToDelete._id));
      setShowModal(false);
      setShowConfirmModal(false);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleBlockToggle = async (userId, currentStatus) => {
    try {
      const response = await axios.put(`${API}/user/${userId}`, {
        isBlocked: !currentStatus
      });
      
      if (response.data) {
        // Update local state
        const updatedUsers = users.map(user => {
          if (user._id === userId) {
            return { ...user, isBlocked: !currentStatus };
          }
          return user;
        });
        setUsers(updatedUsers);
        setAllUsers(updatedUsers);
        
        toast.success(`User ${!currentStatus ? 'blocked' : 'unblocked'} successfully`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "phone",
      label: "Mobile Number",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "block",
      label: "Block Status",
      render: (row) => (
        <div className="flex items-center justify-center space-x-3">
          {/* <div className="relative inline-block w-14 h-7">
            <input
              type="checkbox"
              checked={row.isBlocked}
              onChange={() => handleBlockToggle(row._id, row.isBlocked)}
              className="sr-only peer"
            />
            <div
              className={`absolute inset-0 rounded-full transition duration-300 cursor-pointer
                ${row.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}
            />
            <div
              className={`absolute inset-y-0 left-0 w-5 h-5 m-1 rounded-full bg-white transition-all duration-300
                ${row.isBlocked ? 'translate-x-7' : 'translate-x-0'}`}
            />
          </div> */}


          <div className="flex justify-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={row.isBlocked}
              onChange={() => handleBlockToggle(row._id, row.isBlocked)}
            />
             <div className={`w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all ${row.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
             {/* <div
              className={`absolute inset-0 rounded-full transition duration-300 cursor-pointer
                ${row.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}
            />
            <div
              className={`absolute inset-y-0 left-0 w-3 h-3 m-0.5 rounded-full bg-white transition-all duration-300
                ${row.isBlocked ? 'translate-x-7' : 'translate-x-0'}`}
            /> */}
          </label>
        </div>


          <span className="text-sm font-medium text-gray-700">
            {row.isBlocked ? 'Blocked' : 'Active'}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex space-x-2 text-center justify-center">
          <FaEye
            size={16}
            onClick={() => handleView(row)}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            title="View Details"
          />
        </div>
      ),
    },
  ];

  const Modal = ({ user, onClose }) => {
    if (!user) return null;

    return (
      <CustomModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setFormData({ name: "", image: null });
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
          <div>
            <label className="font-semibold">Blocked:</label>
           {user.isBlocked && <p>Yes</p> }
           {!user.isBlocked && <p>No</p> }
          </div>
        </div>
        {/* <div className="mt-6 flex  justify-end">
          <button
            onClick={() => handleDelete(user)}
            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete User
          </button>
        </div> */}
      </CustomModal>
    );
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="shadow bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <span>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui atque
          iure reprehenderit harum tempora ex voluptas dolor recusandae aliquam
          nostrum mollitia totam deleniti reiciendis consequuntur odio, nam
          eaque voluptatibus eius maxime. Repellat alias quas distinctio
          voluptatem molestiae quasi nulla nemo!
        </span>
      </div>
      <CustomTable
        columns={columns}
        data={users}
        allData={allUsers}
        itemsPerPage={10}
        searchPlaceholder="Search User Details"
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

      {/* <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      /> */}
    </div>
  );
};

export default UserTable;
