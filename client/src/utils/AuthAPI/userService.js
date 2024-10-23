import axios from "../../config/axios.customize";

export const  editUser = async (userUD, formData) => {
    return axios.put(`/api/user/edit-users/${userUD}`, formData)
}
export const getUserById = async (userID, role) => {
    return axios.get(`/api/user/users/${userID}?role=${role}`)
}