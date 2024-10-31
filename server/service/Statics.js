const Appointment = require('../models/Appointment');
const User = require('../models/User');

const getAppointmentCountBySpecialties = async () => {
  // Tính toán thời gian bắt đầu và kết thúc của tháng hiện tại
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Ngày đầu tiên của tháng
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Ngày cuối cùng của tháng

  // Bước 1: Đếm số lượng cuộc hẹn theo doctor_id trong tháng hiện tại
  const appointmentsCount = await Appointment.aggregate([
    {
      $match: {
        appointment_date: { $gte: startOfMonth, $lte: endOfMonth } // Lọc các cuộc hẹn trong tháng hiện tại
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

  // Thêm tháng hiện tại vào kết quả
  const currentMonth = now.getMonth() + 1; // Lấy tháng hiện tại (1 - 12)
  return { month: currentMonth, data: result };
};

const getTodayAppointmentCount = async () => {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Thời gian bắt đầu ngày hôm nay
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Thời gian bắt đầu ngày tiếp theo

  const todayAppointmentsCount = await Appointment.countDocuments({
    appointment_date: { $gte: startOfDay, $lt: endOfDay }
  });

  return todayAppointmentsCount;
};

module.exports = {
  getAppointmentCountBySpecialties,
  getTodayAppointmentCount
};
