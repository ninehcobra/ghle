import axios from '../setup/axios'

const registerNewUser = async (data) => {
    try {
        let res = await axios.post("/api/register", data)
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'

        }
    }
}

const login = async (email, password) => {
    try {
        let res = await axios.post("/api/login", {
            email, password
        }
        )
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server',
            DT: error
        }
    }

}

const logout = async (email, password) => {
    try {
        let res = await axios.post("/api/logout")
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }
}

const getUserAccount = async () => {
    try {
        let res = await axios.get("/api/account")
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }

}

const getAllUser = async (page, limit, groupId) => {
    try {
        let res = await axios.get(`/api/users?groupId=${groupId === 'all' ? '' : groupId}&page=${page}&limit=${limit}`)
        return res
    }
    catch (error) {
        return {
            EC: -5,
            EM: 'Can not connect to server'
        }
    }

}

const deleteUser = async (id) => {
    try {
        let res = await axios.post(`/api/delete-user`, { id: id })
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
    registerNewUser,
    login,
    getUserAccount,
    logout,
    getAllUser,
    deleteUser
}