// services/appointmentService.js
const Appointment = require('../models/Appointment');
const User = require('../models/User');

const getAppointmentCountBySpecialties = async () => {
    // Tính toán khoảng thời gian 1 tháng trước từ ngày hiện tại
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
    // Bước 1: Đếm số lượng cuộc hẹn theo doctor_id trong vòng 1 tháng
    const appointmentsCount = await Appointment.aggregate([
      {
        $match: {
          appointment_date: { $gte: oneMonthAgo } // Lọc các cuộc hẹn trong 1 tháng
        }
      },
      {
        $group: {
          _id: "$doctor_id",
          count: { $sum: 1 }
        }
      }
    ]);
  
    // Bước 2: Lấy specialties của mỗi doctor từ User và tổng hợp dữ liệu
    const result = {};
    for (const item of appointmentsCount) {
      const doctor = await User.findById(item._id).select('specialties');
      if (doctor && doctor.specialties) {
        doctor.specialties.forEach(specialty => {
          result[specialty] = (result[specialty] || 0) + item.count;
        });
      }
    }
  
    return result;
  };
  
module.exports = {
  getAppointmentCountBySpecialties,
};
