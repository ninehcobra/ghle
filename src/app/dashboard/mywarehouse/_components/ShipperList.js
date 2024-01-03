// components/UserList.js
import React from 'react';

const UserList = ({ shipper, onDelete }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Số đơn đã nhận</th>
                    <th></th>

                </tr>
            </thead>
            <tbody>
                {shipper.map(item => {
                    let shipper = item.User
                    return (
                        <tr key={shipper.id}>
                            <td>{shipper.id}</td>
                            <td>{shipper.name}</td>
                            <td>{shipper.email}</td>
                            <td>{shipper.address}</td>
                            <td>{shipper.phoneNumber}</td>
                            <td>{item.numberOfOrders}</td>
                            <td>
                                <button style={{ marginLeft: '8px' }} className="btn btn-danger ml-2" onClick={() => onDelete(shipper.id)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    )

                })}
            </tbody>
        </table>
    );
};

export default UserList;
