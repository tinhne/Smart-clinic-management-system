import axios from "../../config/axios.customize";
const BookingAppointment = (appointmentData) => {
  return axios.post(`/api/appointment/book-appointment`, appointmentData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const checkDoctorSchedule = async (doctorId) => {
  return axios.get(`/api/appointment/appointments/${doctorId}`);
};
const getAppointmentPatient = async (patientId) => {
  return axios.get(`/api/appointment/patient/${patientId}`)
}
export { BookingAppointment, checkDoctorSchedule, getAppointmentPatient };
