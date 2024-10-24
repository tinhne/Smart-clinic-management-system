import axios from "../../config/axios.customize";
const BookingAppointment = (appointmentData) => {
    return axios.post(`/api/appointment/book-appointment`,appointmentData);
    
}
const checkDoctorSchedule = async ( doctorId) => {
   
    return axios.get(`/api/appointment/appointments/${doctorId}`);
  };
export  {BookingAppointment,checkDoctorSchedule}
 