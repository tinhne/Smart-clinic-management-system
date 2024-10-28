import React, { useState, useEffect } from "react";
import "../../style/DoctorFunction/DoctorInfor.scss";
import { getUserById } from "../../utils/AuthAPI/AdminService";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

function DoctorInfor() {
  const [doctorInfo, setDoctorInfo] = useState()
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const token = Cookies.get("access_token")
        if (!token) {
          toast.error("Không tìm thấy token.")
          return;
        }
        const userId = jwtDecode(token)._id
        const response = await getUserById(userId, Cookies.get("role"))
        console.log(response)
        if (response && response.user) {
          setDoctorInfo(response.user);
        } else {
          toast.error("Không thể tải bệnh nhân")
        }
      } catch (e) {
        console.error("Error fetch doctor infomation:", e)
        toast.error("Lỗi khi kết nối tới server.")
      }
    }
    fetchDoctorInfo()
  }, [])
  const formatDate = (dateString) => {
    if (!dateString) return "10/11/2003"; // Giá trị mặc định
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="doctor-infor">
      <div className="profile-header">
        <div className="doctor-left">
          <img
            src={
            doctorInfo && doctorInfo.imageUrl
                ? `data:image/jpeg;base64,${doctorInfo.imageUrl}`
                : "https://via.placeholder.com/150" // Optional: path to a default image
              }
            alt="Doctor"
            className="doctor-photo"
          />
          <h2 className="doctor-name">
            <strong>Bác sĩ: </strong> {doctorInfo?.first_name} {doctorInfo?.last_name}
          </h2>
        </div>
        <div className="doctor-right">
          <h1 className="page-title">Thông tin bác sĩ</h1>

          <p className="doctor-experience">
            <strong>Kinh nghiệm:</strong> {doctorInfo?.experience} năm
          </p>
          <p className="doctor-birthday">
            <strong>Ngày sinh:</strong> {formatDate(doctorInfo?.birthdate)}
          </p>
          <p className="doctor-gender">
            <strong>Giới tính:</strong> {doctorInfo?.gender}
          </p>
          <p className="doctor-address">
            <strong>Địa chỉ:</strong> {doctorInfo?.address}
          </p>
        </div>
      </div>

      <div className="specialty-section">
        <h3>Chuyên khoa: </h3>
        <div className="specialties">
          {doctorInfo?.specialties?.length > 0 ? (
            doctorInfo.specialties.map((specialty, index) => (
              <span key={index} className="specialty-tag">
                {specialty}
              </span>
            ))
          ) : (
            <span className="specialty-tag">Không có chuyên khoa</span>
          )}
        </div>
      </div>

      <div className="contact-section">
        <h3>Thông tin liên hệ</h3>
        <p className="clinic-name">Công tác tại Capstone 1 Clinic</p>
        <p className="contact-phone">
          <span className="icon">📞</span> {doctorInfo?.phone}
        </p>
        <p className="contact-email">
          <span className="icon">📧</span> {doctorInfo?.email}
        </p>
      </div>
    </div>
  );
}

export default DoctorInfor;
