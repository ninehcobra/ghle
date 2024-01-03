import axios from '../setup/axios'

const getAllWWarehouse = async (page, limit, provinceId, name) => {
    try {
        let res = await axios.get(`/api/warehouse?page=${page}&limit=${limit}&name=${name}&provinceId=${provinceId}`)
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }

}

const getUnassignedWarehouseManagers = async () => {
    try {
        let res = await axios.get(`/api/get-wh-manager`)
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }
}

const createWarehouse = async (data) => {
    try {
        let res = await axios.post(`/api/create-warehouse`, data)
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }
}

const getWarehouseAndShippers = async () => {
    try {
        let res = await axios.get(`/api/get-own-wh`)
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }
}

const getShipper = async () => {
    try {
        let res = await axios.get(`/api/get-shipper`)
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }
}

const addShipper = async (data) => {
    try {
        let res = await axios.post(`/api/create-shipper`, data)
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }
}

const removeShipper = async (data) => {
    try {
        let res = await axios.post(`/api/remove-shipper`, data)
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }
}

const deleteWarehouse = async (data) => {
    try {
        let res = await axios.post(`/api/remove-warehouse`, data)
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }
}

const getShipperOrder = async () => {
    try {
        let res = await axios.get(`/api/get-shipper-order`)
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }
}

const updateStatus = async (id) => {
    try {
        let res = await axios.post(`/api/update-status`, { id: id })
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }
}

export {
    getAllWWarehouse,
    getUnassignedWarehouseManagers,
    createWarehouse,
    getWarehouseAndShippers,
    getShipper,
    addShipper,
    removeShipper,
    deleteWarehouse,
    getShipperOrder,
    updateStatus
}