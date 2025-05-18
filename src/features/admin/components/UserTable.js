import React from 'react';
import ActionButtons from './ActionButtons';

const UserTable = ({ users, onEdit, onDelete }) => (
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
                  onDelete={() => onDelete(user.id)}
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
  </div>
);

export default UserTable;
