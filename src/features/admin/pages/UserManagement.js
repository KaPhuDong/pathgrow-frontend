import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUserModal from '../../../components/admin/AddUser';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterName, setFilterName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/admin/users'
        );
        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Add new user or Update user
  const handleAddOrUpdateUser = async (userData) => {
    try {
      if (userData.id) {
        //Update user
        const response = await axios.put(
          `http://127.0.0.1:8000/api/admin/users/${userData.id}`,
          userData
        );
        if (response.data) {
          setUsers((prev) =>
            prev.map((user) => (user.id === userData.id ? response.data : user))
          );
        }
      } else {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/admin/users`,
          userData
        );
        if (response.data) {
          setUsers((prev) => [...prev, response.data]); // Cập nhật danh sách
        }
      }
      //Close Modal
      setShowAddUserModal(false);
      setUpdateUser(null);
    } catch (error) {
      console.error('Failed to add or edit user:', error);
    }
  };
  //Delete user
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  useEffect(() => {
    if (filterName.trim() === '') {
      setSearchName('');
    }
  }, [filterName]);
  const getUsers = () => {
    let filteredUsers = [...users];
    // Lọc theo role
    if (filterRole === 'teacher') {
      filteredUsers = filteredUsers.filter((user) => user.role === 'teacher');
    } else if (filterRole === 'student') {
      filteredUsers = filteredUsers.filter((user) => user.role === 'student');
    }

    // Lọc theo tên
    if (searchName.trim() !== '') {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Sắp xếp theo role
    return filteredUsers.sort((a, b) => {
      if (a.role === 'teacher' && b.role !== 'teacher') return -1;
      if (a.role === 'student' && b.role !== 'student') return 1;
      return 0;
    });
  };
  return (
    <div className="user-management container py-4">
      <div className="user-management__header">
        <h2 className="user-management__title">Users Management</h2>
        <button className="btn-logout">
          Log out
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="user-management__controls mb-3">
        <div className="dropdown">
          <button
            className="btn-filter"
            type="button"
            id="userTypeDropdown"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="btn-text">
              {filterRole === 'all' ? 'All users' : `All ${filterRole}s`}
            </span>
            <div className="btn-icon">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </button>
          <ul className="dropdown-menu" aria-labelledby="userTypeDropdown">
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilterRole('all')}
              >
                All users
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilterRole('teacher')}
              >
                All teachers
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilterRole('student')}
              >
                All students
              </button>
            </li>
          </ul>
        </div>

        <button
          className="btn-add-user text-white"
          onClick={() => setShowAddUserModal(true)}
        >
          <i class="fa-solid fa-plus"></i>New user
        </button>
        <div className="search-box d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control w-30 rounded-pill px-4"
            placeholder="Search..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
          <i
            class="fa-solid fa-magnifying-glass"
            onClick={() => setSearchName(filterName)}
          ></i>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-success">
            <tr>
              <th>Full name</th>
              <th>Email</th>
              <th>Password</th>
              <th className="th-action" style={{ width: '120px' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {getUsers().map((user, idx) => (
              <tr key={idx}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <div className="action-icons">
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setUpdateUser(user);
                        setShowAddUserModal(true);
                      }}
                    ></i>
                    <i
                      class="fa-solid fa-trash"
                      onClick={() => handleDeleteUser(user.id)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
            {getUsers().length === 0 && (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Add User Modal */}
      {(showAddUserModal || updateUser) && (
        <AddUserModal
          onAddUser={handleAddOrUpdateUser}
          onClose={() => {
            setShowAddUserModal(false);
            setUpdateUser(null);
          }}
          updateUser={updateUser}
        />
      )}
    </div>
  );
};

export default UserTable;
