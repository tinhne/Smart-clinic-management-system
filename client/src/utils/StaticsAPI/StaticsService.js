import axios from "../../config/axios.customize";

export const getAppointmentCountBySpecialties =()=>{
    return axios.get("/api/statics/count-by-specialties")
 
}
