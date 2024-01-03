
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ShipperList from './_components/ShipperList';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllUser, registerNewUser } from '@/app/services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { getAllProvince, getDistrictById } from '@/app/services/addressService';
import { addShipper, getShipper, getWarehouseAndShippers, removeShipper } from '@/app/services/warehouseService';


const MyWarehouse = () => {

    const [warehouse, setWarehouse] = useState()
    const [shipper, setShipper] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [availableShipper, setAvailableShipper] = useState([])
    const [selectedShipper, setSelectedShipper] = useState('')

    const fetchWarehouseAndShipper = async () => {
        let res = await getWarehouseAndShippers()

        if (res && res.EC === 0) {
            setWarehouse(res.DT.warehouse)
            setShipper(res.DT.shippers)
        }
    }

    const fetchAvailableShipper = async () => {
        let res = await getShipper()

        if (res && res.EC === 0) {
            setAvailableShipper(res.DT)
        }
    }

    useEffect(() => {
        fetchWarehouseAndShipper()
        fetchAvailableShipper()
    }, [])

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleAddShipper = () => {
        setShowForm(true);
    }


    const handleFormSubmit = async () => {
        if (warehouse && selectedShipper) {
            let res = await addShipper({ userId: selectedShipper, warehouseId: warehouse.id })
            if (res && res.EC === 0) {
                toast('Thêm thành công')
                await fetchWarehouseAndShipper()
                await fetchAvailableShipper()
                setSelectedShipper('')
                setShowForm(false);
            }
        }
        else {
            toast.error('Vui lòng chọn nhân viên')
        }
    };

    const onDelete = async (id) => {
        if (warehouse) {
            let res = await removeShipper({ userId: id, warehouseId: warehouse.id })
            if (res && res.EC === 0) {
                toast('Xóa thành công thành công')
                await fetchWarehouseAndShipper()
                await fetchAvailableShipper()
                setSelectedShipper('')
            }
        }
    }
    return (
        warehouse ?
            <div className="container mt-5">
                <div style={{ marginBottom: '8px', border: '1px solid #80808033', padding: 10, width: '300px', borderRadius: '15px' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Thông tin chi tiết kho</div>
                    <div><strong>Kho:</strong>    {warehouse.name}</div>
                    <div> <strong>Hotline:</strong>    {warehouse.phoneNumber}</div>
                    <div> <strong>Địa chỉ:</strong>    {warehouse.address}</div>
                </div>
                <h1>Quản lý shipper</h1>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    <div className="mt-3">
                        <button className="btn btn-primary" onClick={handleAddShipper}>
                            Thêm nhân viên
                        </button>
                    </div>
                </div>
                <div>
                    <ShipperList onDelete={onDelete} shipper={shipper} />
                </div>
                <Modal show={showForm} onHide={handleCloseForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm nhân viên mới</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                            {/* Add form fields for new user */}
                            <Form.Group controlId="formEmail">

                                <div>
                                    <Form.Label style={{ marginTop: '8px' }}>Chọn nhân viên:</Form.Label>
                                    <select value={selectedShipper} onChange={(e) => setSelectedShipper(e.target.value)} style={{ marginLeft: '8px' }} >
                                        <option key={0} value={''}>Chọn nhân viên</option>
                                        {
                                            availableShipper ?
                                                availableShipper.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    )
                                                })
                                                : ''
                                        }

                                    </select>
                                </div>


                            </Form.Group>
                            {/* Repeat similar fields for other user properties */}
                            <Button onClick={handleFormSubmit} style={{ marginTop: '12px' }} variant="primary" type="submit">
                                Lưu
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>

            </div> :
            <div>
                <div>
                    Bạn chưa được cấp quyền quản lý bất kỳ kho nào vui lòng liên hệ với admin.
                </div>
            </div>
    );
};

export default MyWarehouse;
