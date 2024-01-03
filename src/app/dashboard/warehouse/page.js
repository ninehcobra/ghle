
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import WarehouseList from './_components/WarehouseList';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllUser, registerNewUser } from '@/app/services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { getAllProvince, getDistrictById } from '@/app/services/addressService';
import { createWarehouse, deleteWarehouse, getAllWWarehouse, getUnassignedWarehouseManagers } from '@/app/services/warehouseService';

const ITEMS_PER_PAGE = 5;

const WarehouseDashboard = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [arrProvince, setArrProvince] = useState([])
    const [arrDistrict, setArrDistrict] = useState([])
    const [selectedRole, setSelectedRole] = useState('all')
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0)
    const [showForm, setShowForm] = useState(false);
    const [newWarehouse, setNewWarehouse] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        provinceId: '',
        districtId: '',
        managerId: ''
    });

    const [provinceId, setProvinceId] = useState('')
    const [name, setName] = useState('')
    const [arrManager, setArrManager] = useState([])

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleEdit = (userId) => {
        // Logic for editing user
        console.log(`Edit user with ID: ${userId}`);
    };

    const handleDelete = async (id) => {
        // Logic for deleting user
        let res = await deleteWarehouse({ id: id })
        if (res && res.EC === 0) {
            toast('Xóa thành công')
            await fetchWarehouse()
        }
    };

    const handleAddWarehouse = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewWarehouse((prevWarehouse) => ({
            ...prevWarehouse,
            [name]: value,
        }));
    };

    const handleFormSubmit = async () => {

        if (isWarehouseValid(newWarehouse)) {
            let res = await createWarehouse(newWarehouse)
            if (res && res.EC === 0) {
                setNewWarehouse({
                    name: '',
                    address: '',
                    phoneNumber: '',
                    provinceId: '',
                    districtId: '',
                    managerId: ''
                });
                setShowForm(false)
                toast('Tạo tài khoản thành công')
                await fetchWarehouse()
                await fetchUnassignedWarehouseManagers()
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

    const fetchWarehouse = async () => {
        let res = await getAllWWarehouse(currentPage + 1, ITEMS_PER_PAGE, provinceId, name)

        if (res && res.EC === 0) {
            setTotalPage(res.DT.totalPages)
            setWarehouses(res.DT.warehouses)
        }
    }

    const fetchUnassignedWarehouseManagers = async () => {
        let res = await getUnassignedWarehouseManagers()
        if (res && res.EC === 0) {
            setArrManager(res.DT)
        }
    }

    useEffect(() => {
        fetchWarehouse()
        fetchProvince()
        fetchUnassignedWarehouseManagers()
    }, [currentPage, provinceId])

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
            setNewWarehouse((prevUser) => ({
                ...prevUser,
                ['districtId']: '',
            }));
        }
    }

    const isWarehouseValid = (user) => {
        // Kiểm tra từng trường và đảm bảo không trống
        if (!user.name || !user.address || !user.phoneNumber || !user.provinceId || !user.districtId || !user.managerId) {
            return false;
        }

        return true;
    };

    const onChangePicker = async (value, type) => {
        if (type === 'provinceId') {
            await fetchDistrict(value)
        }
        setNewWarehouse((prevWarehouse) => ({
            ...prevWarehouse,
            [type]: value,
        }));
    }


    return (
        <div className="container mt-5">
            <h1>Kho hàng</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '190px' }} className="mb-3">
                    <label htmlFor="roleFilter" className="form-label">
                        Lọc theo tỉnh thành:
                    </label>
                    <select
                        className="form-select"
                        id="roleFilter"
                        value={provinceId}
                        onChange={(e) => setProvinceId(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {arrProvince ?
                            arrProvince.map((item) => {
                                return (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                )
                            })
                            : ''
                        }


                    </select>
                </div>
                <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleAddWarehouse}>
                        Thêm kho
                    </button>
                </div>
            </div>
            <WarehouseList warehouses={warehouses} onEdit={handleEdit} onDelete={handleDelete} />

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



            <Modal show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo kho mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        {/* Add form fields for new user */}
                        <Form.Group controlId="formEmail">
                            <Form.Label>Tên Kho:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên kho"
                                name="name"
                                value={newWarehouse.name}
                                onChange={handleFormChange}
                                required
                            />
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập địa chỉ"
                                name="address"
                                value={newWarehouse.address}
                                onChange={handleFormChange}
                                required
                            />
                            <Form.Label>Số điện thoại:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập số điện thoại"
                                name="phoneNumber"
                                value={newWarehouse.phoneNumber}
                                onChange={handleFormChange}
                                required
                            />
                            <div>
                                <div>
                                    <Form.Label style={{ marginTop: '8px' }}>Tỉnh / Thành phố :</Form.Label>
                                    <select value={newWarehouse.provinceId} onChange={(e) => onChangePicker(e.target.value, 'provinceId')} style={{ marginLeft: '8px' }} >
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
                                    <select value={newWarehouse.districtId} onChange={(e) => onChangePicker(e.target.value, 'districtId')} style={{ marginLeft: '8px' }} >
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
                                    <Form.Label style={{ marginTop: '8px' }}>Người quản lý :</Form.Label>
                                    <select value={newWarehouse.managerId} onChange={(e) => onChangePicker(e.target.value, 'managerId')} style={{ marginLeft: '8px' }} >
                                        <option key={0} value={''}>Chọn nhân viên</option>
                                        {arrManager
                                            ?
                                            arrManager.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )
                                            }
                                            )
                                            :
                                            ''
                                        }
                                    </select>
                                </div>
                            </div>

                        </Form.Group>
                        {/* Repeat similar fields for other user properties */}
                        <Button onClick={handleFormSubmit} style={{ marginTop: '12px' }} variant="primary" type="submit">
                            Lưu
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default WarehouseDashboard;
