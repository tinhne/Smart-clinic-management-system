import React, { useEffect, useState } from "react";
import "../../style/DoctorProfile/DoctorProfile.scss";
import { getUserById } from "../../utils/AuthAPI/AdminService";
import { NavLink, useParams } from "react-router-dom";
import getScheduleDoctorById from "../../utils/SchedualAPI/SchedualService";
import { checkDoctorSchedule } from "../../utils/AppointmentAPI/AppointmentService";
import Cookies from "js-cookie";

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [bookedList, setBookedList] = useState([]);
  const patientId = Cookies.get("id");

  useEffect(() => {
    const fetchDoctor = async () => {
      const doctorData = await getUserById(doctorId, "doctor");
      setDoctor(doctorData);
    };

    const fetchSchedule = async () => {
      try {
        const scheduleData = await getScheduleDoctorById(doctorId);
        console.log(`Schedule`, scheduleData);
        setSchedule(scheduleData);
        setSelectedDate(scheduleData[0]?.date);
      } catch (error) {
        console.error("Lỗi khi lấy lịch làm việc:", error);
      }
    };

    const fetchBookedDates = async () => {
      try {
        const appointments = await checkDoctorSchedule(doctorId);
        setBookedList(appointments);
        if (Array.isArray(appointments)) {
          const dates = appointments.map((app) => app.appointment_date);
          setBookedDates(dates);

          const slots = appointments.flatMap((app) => app.time_slots || []);
          setBookedSlots(slots);
        }
      } catch (error) {
        console.error("Lỗi khi lấy lịch hẹn:", error);
      }
    };

    fetchDoctor();
    fetchSchedule();
    fetchBookedDates();
  }, [doctorId, patientId]);
  useEffect(() => {
    console.log("Updated Booked List:", bookedList); // Kiểm tra dữ liệu sau khi bookedList thay đổi
  }, [bookedList]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log("Date clicked", date);
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    console.log("Slot clicked", slot);
  };

  const selectedDaySchedule = schedule?.find(
    (day) => day.date === selectedDate
  );

  const morningSlots = selectedDaySchedule?.available_slots.filter((slot) => {
    const hour = parseInt(slot.split(":")[0]);
    return hour < 12 && !bookedSlots.includes(slot);
  });

  const afternoonSlots = selectedDaySchedule?.available_slots.filter((slot) => {
    const hour = parseInt(slot.split(":")[0]);
    return hour >= 12 && !bookedSlots.includes(slot);
  });

  const formatDate = (dateString) => {
    const options = { weekday: "short", day: "2-digit", month: "2-digit" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const isSlotBooked = (date, slot) => {
    return bookedDates.includes(date) && bookedSlots.includes(slot);
  };

  if (!doctor) {
    return <p>Loading...</p>;
  }

  return (
    <div className="doctor-profile">
      <div className="doctor-header">
        <div className="doctor-img">
          <img
            src={`data:image/jpeg;base64,${doctor.user.imageUrl}`}
            className="doctor-img"
            alt={`${doctor.user.first_name} ${doctor.user.last_name}`}
          />
        </div>
        <div className="doctor-info">
          <h2 className="doctor-name">
            {doctor.user.first_name} {doctor.user.last_name}
          </h2>
          <div className="doctor-details">
            <span className="doctor-title">Bác sĩ</span>
            <span className="doctor-experience">10 năm kinh nghiệm</span>
          </div>
          <div className="doctor-specialty">
            <span>Chuyên khoa: </span>
            <a href="#">{doctor.user.specialties}</a>
          </div>
        </div>
      </div>

      <div className="note-container">
        <div className="note-header">
          <span className="note-icon">⚠️</span>
          <h3 className="note-title">Lưu ý</h3>
        </div>
        <p className="note-content">
          * Nếu bệnh nhân bận việc không đến khám được vui lòng hủy lịch khám đã
          đặt và đặt lại ngày khác. Xin cảm ơn!
        </p>
        <p className="note-content">
          * Đặt lịch phải trước 4h so với giờ khám. Xin cảm ơn!
        </p>
      </div>

      <div className="quick-booking">
        <h3 className="section-title">Đặt khám nhanh</h3>
        <div className="date-list">
          {schedule &&
            schedule.map((day, index) => {
              const isBooked = bookedDates.includes(day.date);
              return (
                <div
                  className="date-item"
                  key={index}
                  onClick={() => !isBooked && handleDateClick(day.date)}
                >
                  <span>{formatDate(day.date)}</span>
                  <span className="time-frame">
                    {day.available_slots.length} khung giờ
                  </span>
                </div>
              );
            })}
        </div>

        <div className="time-slot-section">
          <div className="time-slot-title">
            <span role="img" aria-label="morning">
              🌅
            </span>{" "}
            Buổi sáng
          </div>
          <div className="time-slot-list">
            {morningSlots && morningSlots.length > 0 ? (
              morningSlots.map((slot, index) => (
                <button
                  className={`time-slot ${
                    selectedSlot === slot ? "selected" : ""
                  } ${isSlotBooked(selectedDate, slot) ? "disabled" : ""}`}
                  key={index}
                  onClick={() =>
                    !isSlotBooked(selectedDate, slot) && handleSlotClick(slot)
                  }
                  disabled={isSlotBooked(selectedDate, slot)} // Disable button if booked
                >
                  {slot}
                </button>
              ))
            ) : (
              <p>Không có khung giờ nào vào buổi sáng.</p>
            )}
          </div>

          <div className="time-slot-title">
            <span role="img" aria-label="afternoon">
              🌇
            </span>{" "}
            Buổi chiều
          </div>
          <div className="time-slot-list">
            {afternoonSlots && afternoonSlots.length > 0 ? (
              afternoonSlots.map((slot, index) => (
                <button
                  className={`time-slot ${
                    selectedSlot === slot ? "selected" : ""
                  } ${isSlotBooked(selectedDate, slot) ? "disabled" : ""}`}
                  key={index}
                  onClick={() =>
                    !isSlotBooked(selectedDate, slot) && handleSlotClick(slot)
                  }
                  disabled={isSlotBooked(selectedDate, slot)} // Disable button if booked
                >
                  {slot}
                </button>
              ))
            ) : (
              <p>Không có khung giờ nào vào buổi chiều.</p>
            )}
          </div>
        </div>
      </div>

      <div className="description">
        <h3>Giới thiệu</h3>
        <p>
          Bác sĩ Chuyên khoa II Lê Thị Minh Hồng hiện đang là Phó Giám đốc Bệnh
          viện Nhi Đồng 2. Bác sĩ trực tiếp khám bệnh theo yêu cầu chất lượng
          cao tại Bệnh Viện Nhi Đồng 2 và phòng khám Nhi khoa (250 Nguyễn Xí,
          Phường 13, Bình Thạnh, TP.HCM).
        </p>
        <ul>
          <li>
            Khám và điều trị các bệnh lý Nhi khoa: tiêu hóa, hô hấp, thận,
            nhiễm, dị ứng, tai mũi họng,...
          </li>
          <li>Khám tư vấn dinh dưỡng và phát triển thể chất cho trẻ em.</li>
          <li>
            Khám và tư vấn về sức khỏe, phòng ngừa bệnh cho trẻ em và phụ nữ
            mang thai.
          </li>
          <li>
            Tham gia các chương trình tình nguyện, hướng dẫn cách chăm sóc trẻ
            sơ sinh, trẻ nhỏ.
          </li>
        </ul>
      </div>

      <div className="booking-footer">
        <span className="support-text">
          Hỗ trợ đặt khám <strong>0935038810</strong>
        </span>
        <NavLink
          to={{
            pathname: `/dat-kham/ho-so-lich/${doctor.user._id}/${patientId}`,
          }}
          state={{
            doctor,
            selectedDate,
            selectedSlot,
          }}
        >
          <button className="book-now-button">Đặt khám ngay</button>
        </NavLink>
      </div>
    </div>
  );
};

export default DoctorProfile;
