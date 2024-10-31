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
  const getTodayAppointmentCount = async (req, res) => {
    try {
      const count = await appointmentService.getTodayAppointmentCount();
      res.status(200).json({ count });
    } catch (err) {
      console.error("Error fetching today's appointment count:", err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {
  getAppointmentCountBySpecialties,
  getTodayAppointmentCount
};
