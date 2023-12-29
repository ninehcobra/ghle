
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import UserList from './_components/UserList';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllUser, registerNewUser } from '@/app/services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { getAllProvince, getDistrictById } from '@/app/services/addressService';

const ITEMS_PER_PAGE = 5;

const UserDashboard = () => {
    const [users, setUsers] = useState([

    ]);
    const [arrProvince, setArrProvince] = useState([])
    const [arrDistrict, setArrDistrict] = useState([])
    const [selectedRole, setSelectedRole] = useState('all')
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0)
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        name: '',
        address: '',
        phoneNumber: '',
        provinceId: '',
        districtId: '',
        roleId: ''
    });

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleEdit = (userId) => {
        // Logic for editing user
        console.log(`Edit user with ID: ${userId}`);
    };

    const handleDelete = (userId) => {
        // Logic for deleting user
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        console.log(`Delete user with ID: ${userId}`);
    };

    const handleAddUser = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleFormSubmit = async () => {
        console.log(newUser)

        if (isUserValid(newUser)) {
            let res = await registerNewUser({
                email: newUser.email,
                password: newUser.password,
                address: newUser.address,
                phoneNumber: newUser.phoneNumber,
                districtId: newUser.districtId,
                name: newUser.name,
                roleId: newUser.roleId
            })
            if (res && res.EC === 0) {
                setNewUser({
                    email: '',
                    password: '',
                    name: '',
                    address: '',
                    phoneNumber: '',
                    province: '',
                    district: '',
                });
                setShowForm(false)
                toast('Tạo tài khoản thành công')
                await fetchUsers()
            }
            else if (res.EC === 1) {
                toast.error('Email này đã tồn tại')
            }
            else {
                toast.error('Lỗi từ server')
            }
        }
        else {
            toast.error('Vui lòng nhập đầy đủ thông tin')
        }
    };

    const fetchUsers = async () => {
        let res = await getAllUser(currentPage + 1, ITEMS_PER_PAGE, selectedRole)

        if (res && res.EC === 0) {
            setTotalPage(res.DT.totalPages)
            setUsers(res.DT.users)
        }
    }

    useEffect(() => {
        fetchUsers()
        fetchProvince()
    }, [currentPage, selectedRole])

    const fetchProvince = async () => {
        let res = await getAllProvince()
        if (res && res.EC === 0) {
            setArrProvince(res.DT)
        }
    }

    const fetchDistrict = async (id) => {
        let res = await getDistrictById(id)
        if (res && res.EC === 0) {
            setArrDistrict(res.DT)
            setNewUser((prevUser) => ({
                ...prevUser,
                ['districtId']: '',
            }));
        }
    }

    const isUserValid = (user) => {
        // Kiểm tra từng trường và đảm bảo không trống
        if (!user.email || !user.password || !user.name || !user.address || !user.phoneNumber || !user.provinceId || !user.districtId || !user.roleId) {
            return false;
        }

        return true;
    };

    const onChangePicker = async (value, type) => {
        if (type === 'provinceId') {
            await fetchDistrict(value)
        }
        setNewUser((prevUser) => ({
            ...prevUser,
            [type]: value,
        }));
    }

    return (
        <div className="container mt-5">
            <h1>Quản lý tài khoản</h1>
            <div style={{ width: '190px' }} className="mb-3">
                <label htmlFor="roleFilter" className="form-label">
                    Lọc theo loại tài khoản:
                </label>
                <select
                    className="form-select"
                    id="roleFilter"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    <option value="all">Tất cả</option>
                    <option value="2">Khách hàng</option>
                    <option value="3">Shipper</option>
                    <option value="4">Quản lý kho hàng</option>
                    {/* Thêm các loại tài khoản khác nếu cần */}
                </select>
            </div>
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />

            <div className="mt-3">
                <ReactPaginate
                    pageCount={totalPage}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>

            <div className="mt-3">
                <button className="btn btn-primary" onClick={handleAddUser}>
                    Thêm người dùng
                </button>
            </div>

            <Modal show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo người dùng mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        {/* Add form fields for new user */}
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                name="email"
                                value={newUser.email}
                                onChange={handleFormChange}
                                required
                            />
                            <Form.Label>Mật khẩu:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                name="password"
                                value={newUser.password}
                                onChange={handleFormChange}
                                required
                            />
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập địa chỉ"
                                name="address"
                                value={newUser.address}
                                onChange={handleFormChange}
                                required
                            />
                            <Form.Label>Tên:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ và tên"
                                name="name"
                                value={newUser.name}
                                onChange={handleFormChange}
                                required
                            />
                            <Form.Label>Số điện thoại:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="nhập Số điện thoại"
                                name="phoneNumber"
                                value={newUser.phoneNumber}
                                onChange={handleFormChange}
                                required
                            />
                            <div>
                                <div>
                                    <Form.Label style={{ marginTop: '8px' }}>Tỉnh / Thành phố :</Form.Label>
                                    <select value={newUser.provinceId} onChange={(e) => onChangePicker(e.target.value, 'provinceId')} style={{ marginLeft: '8px' }} >
                                        <option key={0} value={''}>Chọn Tỉnh / Thành phố</option>
                                        {arrProvince ?
                                            arrProvince.map((province) => {
                                                return (
                                                    <option value={province.id} key={province.id}>{province.name}</option>
                                                )
                                            })
                                            : ''}
                                    </select>
                                </div>
                                <div>
                                    <Form.Label style={{ marginTop: '8px' }}>Quận / Huyện :</Form.Label>
                                    <select value={newUser.districtId} onChange={(e) => onChangePicker(e.target.value, 'districtId')} style={{ marginLeft: '8px' }} >
                                        <option key={0} value={''}>Chọn Quận / Huyện</option>
                                        {arrDistrict ?
                                            arrDistrict.map((district) => {
                                                return (
                                                    <option value={district.id} key={district.id}>{district.name}</option>
                                                )
                                            })
                                            : ''}
                                    </select>
                                </div>
                                <div>
                                    <Form.Label style={{ marginTop: '8px' }}>Quyền :</Form.Label>
                                    <select value={newUser.roleId} onChange={(e) => onChangePicker(e.target.value, 'roleId')} style={{ marginLeft: '8px' }} >
                                        <option key={0} value={''}>Chọn quyền</option>
                                        <option key={0} value={1}>Admin</option>
                                        <option key={0} value={2}>Khách hàng</option>
                                        <option key={0} value={3}>Shipper</option>
                                        <option key={0} value={4}>Quản lý kho</option>

                                    </select>
                                </div>
                            </div>

                        </Form.Group>
                        {/* Repeat similar fields for other user properties */}
                        <Button onClick={handleFormSubmit} style={{ marginTop: '12px' }} variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default UserDashboard;
