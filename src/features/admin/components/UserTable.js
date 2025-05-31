import React, { useState } from 'react';
import ActionButtons from './ActionButtons';
import ConfirmDelete from '../../../components/ui/ConfirmDelete';

const UserTable = ({ users, onEdit, onDelete }) => {
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
  };

  const handleConfirmDelete = () => {
    onDelete(userToDelete);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered text-center align-middle">
        <thead className="table-success">
          <tr>
            <th>Full name</th>
            <th>Email</th>
            {/* <th>Password</th> */}
            <th style={{ width: '120px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>{user.password}</td> */}
                <td>
                  <ActionButtons
                    onEdit={() => onEdit(user)}
                    onDelete={() => handleDeleteClick(user.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {userToDelete && (
        <ConfirmDelete
          title="Delete User"
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UserTable;
