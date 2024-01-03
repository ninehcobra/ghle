// components/UserList.js
import React from 'react';

const UserList = ({ warehouses, onEdit, onDelete }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên kho hàng</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Người quản lý</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {warehouses.map(warehouse => (
                    <tr key={warehouse.id}>
                        <td>{warehouse.id}</td>
                        <td>{warehouse.name}</td>
                        <td>{warehouse.address}</td>
                        <td>{warehouse.phoneNumber}</td>
                        <td>{warehouse.User ? warehouse.User.name : ''}</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => onEdit(warehouse.id)}>
                                Sửa
                            </button>
                            <button style={{ marginLeft: '8px' }} className="btn btn-danger ml-2" onClick={() => onDelete(warehouse.id)}>
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;
