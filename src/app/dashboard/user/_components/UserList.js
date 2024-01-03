// components/UserList.js
import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {


    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => onEdit(user.id)}>
                                    Sửa
                                </button>
                                <button style={{ marginLeft: '8px' }} className="btn btn-danger ml-2" onClick={() => onDelete(user.id)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    );
};

export default UserList;
