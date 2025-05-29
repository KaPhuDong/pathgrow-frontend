import React, { useEffect, useState } from 'react';
import userApi from '../../../api/admin/api';
import Main from './Main';
import AddUserModal from '../components/AddUser';
import FilterDropdown from '../components/FilterDropdown';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import { NavLink } from 'react-router-dom';
import ToastNotification from '../../../components/ui/ToastNotification';
import Pagination from '../../../components/ui/Pagination';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterName, setFilterName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await userApi.fetchUsers();
        if (Array.isArray(data)) {
          setUsers(data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    getUsers();
  }, []);

  const handleAddOrUpdateUser = async (userData) => {
    try {
      if (userData.id) {
        const updated = await userApi.updateUser(userData.id, userData);
        setUsers((prev) =>
          prev.map((user) => (user.id === userData.id ? updated : user))
        );
        setToastMessage('User updated successfully!');
      } else {
        const added = await userApi.addUser(userData);
        setUsers((prev) => [...prev, added]);
        setToastMessage('User added successfully!');
      }
      setShowToast(true);
      setShowAddUserModal(false);
      setUpdateUser(null);
    } catch (error) {
      console.error('Failed to add or update user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await userApi.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  useEffect(() => {
    if (filterName.trim() === '') setSearchName('');
  }, [filterName]);

  const getUsers = () => {
    let filtered = [...users];
    if (filterRole !== 'all') {
      filtered = filtered.filter((u) => u.role === filterRole);
    }
    if (searchName.trim()) {
      filtered = filtered.filter((u) =>
        u.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    return filtered.sort((a, b) => (a.role === 'teacher' ? -1 : 1));
  };

  const filteredUsers = getUsers();
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Main>
      <div className="main-classesManagement">
        <div className="title-class">
          <h1 className="mb-4">Users Management</h1>
          <NavLink to="/logout" className="logout">
            Log out →
          </NavLink>
        </div>
        <div className="user-management__controls d-flex gap-3 align-items-center justify-content-between mb-4">
          <div className="d-flex gap-3 align-items-center">
            <FilterDropdown
              filterRole={filterRole}
              setFilterRole={(role) => {
                setFilterRole(role);
                setCurrentPage(1);
              }}
            />
            <button
              className="btn btn-add-user btn-admin-add-user"
              onClick={() => setShowAddUserModal(true)}
            >
              + New user
            </button>
          </div>
          <SearchBar
            filterName={filterName}
            setFilterName={setFilterName}
            setSearchName={(name) => {
              setSearchName(name);
              setCurrentPage(1);
            }}
          />
        </div>
        <UserTable
          users={currentItems}
          onEdit={(user) => {
            setUpdateUser(user);
            setShowAddUserModal(true);
          }}
          onDelete={handleDeleteUser}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
        {(showAddUserModal || updateUser) && (
          <AddUserModal
            users={users}
            onAddUser={handleAddOrUpdateUser}
            onClose={() => {
              setShowAddUserModal(false);
              setUpdateUser(null);
            }}
            updateUser={updateUser}
          />
        )}
      </div>
      {showToast && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </Main>
  );
};

export default UserManagement;
