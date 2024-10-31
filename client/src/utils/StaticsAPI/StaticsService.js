import axios from "../../config/axios.customize";

export const getAppointmentCountBySpecialties =()=>{
    return axios.get("/api/statics/count-by-specialties")
 
}
export const getTodayAppointmentCount=()=>{
    return axios.get("/api/statics/today/count")
 
}
