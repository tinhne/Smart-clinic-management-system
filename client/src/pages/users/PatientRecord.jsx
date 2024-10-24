import React, { useEffect, useState } from "react";
import "../../style/PatientRecord/PatientRecord.scss";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getUserById } from "../../utils/AuthAPI/AdminService"; // API lấy thông tin user
import { BookingAppointment } from "../../utils/AppointmentAPI/AppointmentService"; // API đặt lịch hẹn
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const PatientRecord = () => {
  const { idDoctor, idPatient } = useParams(); // Lấy doctorId và patientId từ URL
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const [note, setNote] = useState(""); // Lưu ghi chú từ bệnh nhân
  const location = useLocation();
  const { selectedDate, selectedSlot } = location.state || {};
  const navigate = useNavigate(); // Nhận dữ liệu được truyền từ route
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("vi-VN"); // Định dạng ngày theo kiểu Việt Nam
  };
  const dateFormat = formatDate(selectedDate);

  useEffect(() => {
    // Lấy thông tin bác sĩ
    const fetchDoctor = async () => {
      try {
        const doctorData = await getUserById(idDoctor, "doctor");
        setDoctor(doctorData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin bác sĩ:", error);
      }
    };

    // Lấy thông tin bệnh nhân
    const fetchPatient = async () => {
      try {
        const patientData = await getUserById(idPatient, "patient");
        setPatient(patientData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin bệnh nhân:", error);
      }
    };

    if (idDoctor) fetchDoctor();
    if (idPatient) fetchPatient();
  }, [idDoctor, idPatient]);

  const handleBooking = async (isOnline) => {
    const appointmentType = isOnline ? "online" : "in-person";
    const videoCallLink = isOnline ? `http://localhost:5173/room` : null;

    const appointmentData = {
      appointment_date: selectedDate,
      time_slot: selectedSlot,
      patient_id: idPatient,
      doctor_id: idDoctor,
      note: note || "Không có ghi chú",
      appointment_type: appointmentType,
      video_call_link: videoCallLink,
    };

    try {
      const response = await BookingAppointment(appointmentData);
      toast.success("Đặt lịch thành công!");

      console.log("Video Call Link:", videoCallLink); // Log the video call link

      // Navigate and log state
      navigate("/dat-kham/ho-so/thanh-cong", {
        state: {
          doctor,
          patient,
          selectedDate,
          selectedSlot,
          note,
          appointmentType,
          videoCallLink
        },
      });
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      toast.error("Đặt lịch thất bại.");
    }
};



  if (!doctor || !patient) {
    return <p>Loading...</p>; // Hiển thị loading khi dữ liệu chưa có
  }

  return (
    <div className="medical-record">
      <div className="patient-record">
        {/* Patient Header Section */}
        <div className="patient-header">
          <div className="avatar">
            <div className="avatar-text">{`${patient.user.first_name[0]}${patient.user.last_name[0]}`}</div>
          </div>
          <div className="header-info">
            <h3>
              {patient.user.first_name} {patient.user.last_name}
            </h3>
            <p>{patient.user.birthdate}</p>
          </div>
        </div>

        {/* Patient Info Section */}
        <div className="patient-info">
          <div className="info-item">
            <span className="label">Mã bệnh nhân:</span>
            <span>{patient.user._id}</span>
          </div>
          <div className="info-item">
            <span className="label">Họ và tên:</span>
            <span>
              {patient.user.first_name} {patient.user.last_name}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Giới tính:</span>
            <span>{patient.user.gender}</span>
          </div>
          <div className="info-item">
            <span className="label">Ngày sinh:</span>
            <span>{patient.user.birthdate}</span>
          </div>
          <div className="info-item">
            <span className="label">Số điện thoại:</span>
            <span>{patient.user.phone || "Chưa có số điện thoại"}</span>
          </div>
        </div>

        {/* Patient Note Section */}
        <div className="patient-note">
          <h4>Ghi chú </h4>
          <textarea
            placeholder="Triệu chứng..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Booking Information Section */}
      <div className="info-booking">
        <h4>Thông tin đặt khám</h4>

        {/* Doctor Information */}
        <div className="booking-doctor">
          <div className="doctor-img">
            <img
              src={`data:image/jpeg;base64,${doctor.user.imageUrl}`}
              alt="Doctor"
            />
          </div>
          <div className="infor-doctor">
            <div className="name-doctor">
              {doctor.user.first_name} {doctor.user.last_name}
            </div>
            <div className="address-doctor">
              {doctor.user.address || "Địa chỉ không có sẵn"}
            </div>
          </div>
        </div>

        {/* Booking Time Information */}
        <div className="booking-time">
          <div className="time-item">
            <span className="label">Ngày khám</span>
            <span>{dateFormat}</span>
          </div>
          <div className="time-item">
            <span className="label">Khung giờ</span>
            <span>{selectedSlot}</span>
          </div>
          <div className="time-item">
            <span className="label">Bệnh nhân</span>
            <span>
              {patient.user.first_name} {patient.user.last_name}
            </span>
          </div>
        </div>

        {/* Booking Buttons */}
        <button className="booking-button" onClick={() => handleBooking(false)}>
          Đặt lịch khám trực tuyến
        </button>
        <button className="booking-button" onClick={() => handleBooking(true)}>
          Đặt lịch khám online
        </button>
      </div>
    </div>
  );
};

export default PatientRecord;
