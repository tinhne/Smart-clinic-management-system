import axios from "../../config/axios.customize";
const getScheduleDoctorById = (doctorID) => {
    return axios.get(`/api/schedule/get-schedual/${doctorID}`)
    
}
export default getScheduleDoctorById
