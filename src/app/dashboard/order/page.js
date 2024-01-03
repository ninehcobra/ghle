
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ShipperList from './_components/ShipperList';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllUser, registerNewUser } from '@/app/services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { getAllProvince, getDistrictById } from '@/app/services/addressService';
import { addShipper, getShipper, getShipperOrder, getWarehouseAndShippers, removeShipper, updateStatus } from '@/app/services/warehouseService';


const MyWarehouse = () => {

    const [orders, setOrders] = useState([])

    const fetchShipperOrder = async () => {
        let res = await getShipperOrder()
        if (res && res.EC === 0) {
            setOrders(res.DT)
        }
    }

    useEffect(() => {
        fetchShipperOrder()
    }, [])

    const handleUpdateStatus = async (id) => {
        let res = await updateStatus(id)
        if (res && res.EC === 0) {
            toast("Cập nhật thành công")
            await fetchShipperOrder()
        }
    }

    return (
        orders ?
            <div className="container mt-5">

                <h1>Quản lý Đơn hàng</h1>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>


                </div>
                <div>
                    <ShipperList orders={orders} handleUpdateStatus={handleUpdateStatus} />
                </div>


            </div>
            :
            <div>
                <div>
                    Bạn không có đơn hàng nào cần giao
                </div>
            </div>
    );
};

export default MyWarehouse;
