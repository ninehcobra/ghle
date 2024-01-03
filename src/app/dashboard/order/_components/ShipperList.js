// components/UserList.js
import React from 'react';
import { toast } from 'react-toastify';

const UserList = ({ orders, handleUpdateStatus }) => {



    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Địa chỉ gửi</th>
                    <th>SĐT người gửi</th>
                    <th>Địa chỉ nhận</th>
                    <th>SĐT người nhận</th>
                    <th>Trạng thái</th>
                    <th></th>

                </tr>
            </thead>
            <tbody>
                {orders.map(item => {
                    let order = item.Order
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{order.senAddress}</td>
                            <td>{order.senPhoneNumber}</td>
                            <td>{order.recAddress}</td>
                            <td>{order.recPhoneNumber}</td>
                            <td>{item.status === 'S3' ? 'Đang lấy hàng' : item.status === 'S8' ? 'Đang giao hàng' : ''}</td>
                            <td>
                                <button onClick={() => handleUpdateStatus(item.id)} style={{ marginLeft: '8px' }} className="btn btn-success ml-2">
                                    {item.status === 'S3' ? 'Lấy hàng thành công' : item.status === 'S8' ? 'Giao hàng thành công' : ''}
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
