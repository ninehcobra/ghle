import axios from '../setup/axios';

const getAllProvince = async () => {
    try {
        const response = await axios.get('api/get-all-province')
        const responseData = response
        return responseData
    } catch (error) {
        console.log('loi', error)
    }

}

const getDistrictById = async (id) => {
    try {
        const response = await axios.get(`api/get-district-by-id?provinceId=${id}`)
        const responseData = response
        return responseData
    } catch (error) {
        console.log('loi', error)
    }
}

export {
    getAllProvince,
    getDistrictById
}   