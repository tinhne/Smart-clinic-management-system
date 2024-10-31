import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaTimesCircle } from "react-icons/fa";
import "../../../style/Appointment/Appointment.scss";
import doctorPlaceholder from "../../../assets/img/customer01.png"; // Hình ảnh mặc định
import { getUserById } from "../../../utils/AuthAPI/AdminService";
import { getAppointmentPatient, deleteAppointment } from "../../../utils/AppointmentAPI/AppointmentService";
import Countdown from "./Countdown";
import ConfirmationDialog from "../../layout/ConfirmationDialog"; // Import hộp thoại xác nhận
import { toast } from "react-toastify";


const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctorsInfo, setDoctorsInfo] = useState({});
  const [patientInfo, setPatientInfo] = useState(null);
  const [countdownFinished, setCountdownFinished] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // State cho tìm kiếm
  const [showConfirmation, setShowConfirmation] = useState(false); // Trạng thái hiển thị hộp thoại
  const [appointmentToDelete, setAppointmentToDelete] = useState(null); // Lưu trữ lịch hẹn cần xóa

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointmentPatient();
        const appointmentData = response;

        if (Array.isArray(appointmentData) && appointmentData.length > 0) {
          setAppointments(appointmentData);
          handleSelectAppointment(appointmentData[0]); // Mặc định chọn lịch đầu tiên

          const doctorsPromises = appointmentData.map(async (appointment) => {
            const doctorResponse = await getUserById(
              appointment.doctor_id,
              "doctor"
            );
            return { id: appointment.doctor_id, info: doctorResponse.user };
          });

          const doctorsData = await Promise.all(doctorsPromises);
          const doctorsMap = doctorsData.reduce((acc, doctor) => {
            acc[doctor.id] = doctor.info;
            return acc;
          }, {});

          setDoctorsInfo(doctorsMap);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleSelectAppointment = async (appointment) => {
    setSelectedAppointment(appointment);
    try {
      const patientResponse = await getUserById(
        appointment.patient_id,
        "patient"
      );
      setPatientInfo(patientResponse.user);
    } catch (error) {
      console.error("Error fetching patient info:", error);
    }
  };

  const handleCountdownEnd = (appointmentId) => {
    console.log("Countdown finished for appointment:", appointmentId);
    setCountdownFinished((prev) => ({
      ...prev,
      [appointmentId]: true, // Đánh dấu countdown đã kết thúc
    }));
  };

  const parseAppointmentTime = (appointment) => {
    const timeSlot = appointment.time_slot.split("-");
    const startTime = timeSlot[0].trim();
    const appointmentDate = new Date(appointment.appointment_date);
    const [hours, minutes] = startTime.split(":").map(Number);
    return new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate(),
      hours,
      minutes
    );
  };

  const shouldShowButton = (appointment) => {
    const now = new Date();
    const appointmentTime = parseAppointmentTime(appointment);
    const oneHourBefore = new Date(appointmentTime.getTime() - 60 * 60 * 1000);
    return appointment.appointment_type === "online" && now >= oneHourBefore && !countdownFinished[appointment._id]; // Kiểm tra xem đã đủ 1 tiếng trước thời gian khám hay chưa
  };

  const handleCancelAppointment = async () => {
    try {
      await deleteAppointment(appointmentToDelete); // Xóa lịch hẹn đã chọn
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appt) => appt._id !== appointmentToDelete)
      );
      setSelectedAppointment(null); 
      toast.success("Lịch hẹn đã được hủy thành công.");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Có lỗi xảy ra khi hủy lịch hẹn.");
    } finally {
      setShowConfirmation(false); // Đóng hộp thoại
      setAppointmentToDelete(null);
    }
  };

  const openConfirmationDialog = (appointmentId) => {
    setAppointmentToDelete(appointmentId);
    setShowConfirmation(true); // Mở hộp thoại xác nhận
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setAppointmentToDelete(null);
  };

  const normalizeString = (str) => {
    return str
      .normalize("NFD") // Phân tách dấu
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
      .toLowerCase(); // Chuyển thành chữ thường
  };
  // Hàm lọc lịch hẹn dựa trên từ khóa tìm kiếm
  const filteredAppointments = appointments.filter((appointment) => {
    const doctorName = `${doctorsInfo[appointment.doctor_id]?.first_name || ""} ${doctorsInfo[appointment.doctor_id]?.last_name || ""}`;
    const normalizedSearchTerm = normalizeString(searchTerm);

    return (
      normalizeString(doctorName).includes(normalizedSearchTerm) ||
      normalizeString(appointment.appointment_type).includes(normalizedSearchTerm) ||
      normalizeString(appointment.time_slot).includes(normalizedSearchTerm) ||
      normalizeString(new Date(appointment.appointment_date).toLocaleDateString()).includes(normalizedSearchTerm) ||
      normalizeString(appointment._id).includes(normalizedSearchTerm) // Tìm kiếm theo ID
    );
  });


  return (
    <div className="appointment-container">
      <div className="appointment-list">
        <h2>Lịch khám</h2>
        <input
          type="text"
          placeholder="Mã giao dịch, tên dịch vụ, tên bệnh nhân..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
        />
        <div className="appointment-content">
          <ul>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <li
                  key={appointment._id}
                  className={`appointment-item ${
                    selectedAppointment &&
                    selectedAppointment._id === appointment._id
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleSelectAppointment(appointment)}
                >
                  <div>
                    <h3>
                      {doctorsInfo[appointment.doctor_id]
                        ? `${doctorsInfo[appointment.doctor_id].first_name} ${
                            doctorsInfo[appointment.doctor_id].last_name
                          }`
                        : "Bác sĩ không xác định"}
                    </h3>
                    <p>
                      {appointment.time_slot} -{" "}
                      {new Date(
                        appointment.appointment_date
                      ).toLocaleDateString()}
                    </p>
                    <h4 className="appointment-type">
                      {appointment.appointment_type}
                    </h4>
                    <span
                      className={`status ${
                        appointment.status === "cancelled" ? "cancelled" : ""
                      }`}
                    >
                      {appointment.status === "cancelled" ? (
                        <FaTimesCircle />
                      ) : (
                        <FaCalendarAlt />
                      )}
                      {appointment.status === "cancelled"
                        ? "Đã hủy"
                        : "Đã đặt lịch"}
                    </span>
                    <div className="countdown-container">
                      <Countdown
                        targetDate={parseAppointmentTime(appointment)}
                        onCountdownEnd={() =>
                          handleCountdownEnd(appointment._id)
                        }
                        isActive={!countdownFinished[appointment._id]}
                      />
                      {shouldShowButton(appointment) && (
                        <button
                          className="countdown"
                          onClick={() =>
                            window.open(appointment.video_call_link, "_blank")
                          }
                        >
                          Tham gia cuộc họp
                        </button>
                      )}
                    </div>
                    <div>
                      <button
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn không cho sự kiện onClick của li kích hoạt
                          openConfirmationDialog(appointment._id); // Mở hộp thoại xác nhận
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                  <span className="stt">STT: {appointment._id.slice(-2)}</span>
                </li>
              ))
            ) : (
              <p>Không có lịch hẹn nào</p>
            )}

{showConfirmation && (
        <ConfirmationDialog
          message="Bạn có chắc chắn muốn hủy lịch hẹn này không?"
          onConfirm={handleCancelAppointment}
          onCancel={handleCloseConfirmation}
        />
      )}
          </ul>
        </div>
      </div>

      {selectedAppointment && (
        <div className="appointment-details">
          <div className="appointment-info">
            <span className="stt">
              STT: {selectedAppointment._id.slice(-2)}
            </span>
            <span className="time">
              <FaCalendarAlt />{" "}
              {selectedAppointment.status === "confirmed"
                ? "Đã xác nhận"
                : "Đã đặt lịch"}
            </span>
          </div>
          <div className="details-header">
            <img
              src={
                doctorsInfo[selectedAppointment.doctor_id]?.imageUrl
                  ? `data:image/jpeg;base64,${
                      doctorsInfo[selectedAppointment.doctor_id].imageUrl
                    }`         
                  : doctorPlaceholder
              }
              alt="Doctor"
              className="doctor-img"
            />
            <div className="doctor-info-app">
              <h3>
                {doctorsInfo[selectedAppointment.doctor_id]
                  ? `${doctorsInfo[selectedAppointment.doctor_id].first_name} ${
                      doctorsInfo[selectedAppointment.doctor_id].last_name
                    }`
                  : "Bác sĩ không xác định"}
              </h3>
              <p>
                {doctorsInfo[selectedAppointment.doctor_id]?.address ||
                  "Địa chỉ không xác định"}
              </p>
            </div>
          </div>

          <div className="info-section">
            <h3>Thông tin đặt khám</h3>
            <div className="info-row">
              <p className="label">Mã phiếu khám:</p>
              <p className="value">{selectedAppointment._id}</p>
            </div>
            <div className="info-row">
              <p className="label">Ngày khám:</p>
              <p className="value">
                {new Date(
                  selectedAppointment.appointment_date
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="info-row">
              <p className="label">Loại khám:</p>
              <p className="value">{selectedAppointment.appointment_type}</p>
            </div>
            <div className="info-row">
              <p className="label">Ghi chú:</p>
              <p className="value">{selectedAppointment.note}</p>
            </div>
          </div>

          <div className="info-section">
            <h3>Thông tin bệnh nhân</h3>
            <div className="info-row">
              <p className="label">Mã bệnh nhân:</p>
              <p className="value">
                {patientInfo ? patientInfo._id : "Không xác định"}
              </p>
            </div>
            <div className="info-row">
              <p className="label">Họ và tên:</p>
              <p className="value">
                {patientInfo
                  ? `${patientInfo.first_name} ${patientInfo.last_name}`
                  : "Không xác định"}
              </p>
            </div>
            <div className="info-row">
              <p className="label">Giới tính:</p>
              <p className="value">{patientInfo?.gender || "Không xác định"}</p>
            </div>
            <div className="info-row">
              <p className="label">Năm sinh:</p>
              <p className="value">
              {new Date(
                  patientInfo?.birthdate
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="info-row">
              <p className="label">Điện thoại:</p>
              <p className="value">{patientInfo?.phone || "Không xác định"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
