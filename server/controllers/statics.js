// controllers/appointmentController.js
const appointmentService = require('../service/Statics');

const getAppointmentCountBySpecialties = async (req, res) => {
    try {
      const result = await appointmentService.getAppointmentCountBySpecialties();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching appointment count by specialties" });
    }
  };

module.exports = {
  getAppointmentCountBySpecialties,
};
