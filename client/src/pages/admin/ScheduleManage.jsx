import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ModalCreateSchedule from "../../components/admin/Schedule/ModalCreateSchedule";
import ModalDeleteSchedule from "../../components/admin/Schedule/ModalDeleteSchedule";
import ModalViewSchedule from "../../components/admin/Schedule/ModalViewSchedule";
import ModalUpdateSchedule from "../../components/admin/Schedule/ModalUpdateSchedule";
import "../../style/adminStyle/ScheduleManage.scss";
import ReactPaginate from "react-paginate";

const ScheduleManage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    doctor_id: "",
    date: "",
    start_time: "",
    end_time: "",
    slot_duration: "",
    available_slots: [],
    booked_slots: [],
  });

  const doctors = [
    { id: "1", name: "Bác sĩ A" },
    { id: "2", name: "Bác sĩ B" },
    { id: "3", name: "Bác sĩ C" },
  ];

  const schedules = [
    {
      doctor_id: {
        first_name: "Bác sĩ A",
        last_name: "Nguyễn",
        email: "bacsi.a.nguyen@example.com",
        phone: "0123456789",
        specialties: ["Ngoại khoa"],
        experience: "5 năm kinh nghiệm",
      },
      date: "2024-11-01",
      working_hours: {
        start_time: "08:00",
        end_time: "12:00",
      },
      slot_duration: 30,
      available_slots: ["08:00", "08:30", "09:00"],
      booked_slots: [],
    },
    {
      doctor_id: {
        first_name: "Bác sĩ A",
        last_name: "Nguyễn",
        email: "bacsi.a.nguyen@example.com",
        phone: "0123456789",
        specialties: ["Nội khoa"],
        experience: "5 năm kinh nghiệm",
      },
      date: "2024-11-01",
      working_hours: {
        start_time: "08:00",
        end_time: "12:00",
      },
      slot_duration: 30,
      available_slots: ["08:00", "08:30", "09:00"],
      booked_slots: [],
    },
  ];

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedSchedule(null); // Reset thông tin khi đóng modal
  };
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedSchedule(null); // Reset thông tin khi đóng modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Saving schedule:", formData);
    handleCloseCreateModal(); // Đóng modal sau khi lưu
  };

  const handleUpdate = () => {
    console.log("Updating schedule:", formData);
    handleCloseUpdateModal(); // Đóng modal sau khi cập nhật
  };

  const handleDeleteUser = () => {
    console.log("Deleting user with id:", selectedUser?.id);
    handleCloseDeleteModal(); // Đóng modal sau khi xóa
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleOpenViewModal = (schedule) => {
    setSelectedSchedule(schedule);
    setShowViewModal(true);
  };
  const handleOpenUpdateModal = (schedule) => {
    setFormData({
      doctor_id:
        schedule.doctor_id.first_name + " " + schedule.doctor_id.last_name, // Lấy tên bác sĩ
      date: schedule.date,
      start_time: schedule.working_hours.start_time,
      end_time: schedule.working_hours.end_time,
      slot_duration: schedule.slot_duration,
    });
    setSelectedSchedule(schedule);
    setShowUpdateModal(true);
  };

  return (
    <div>
      <ModalCreateSchedule
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        handleSave={handleSave}
        formData={formData}
        handleChange={handleChange}
        doctors={doctors} // Truyền danh sách bác sĩ vào modal
      />

      <ModalDeleteSchedule
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDeleteUser}
        selectedUser={selectedUser} // Truyền thông tin người dùng đã chọn
      />

      <ModalViewSchedule
        show={showViewModal}
        handleClose={handleCloseViewModal}
        schedule={selectedSchedule}
      />

      <ModalUpdateSchedule
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        handleUpdate={handleUpdate}
        formData={formData}
        handleChange={handleChange}
        doctors={doctors}
      />

      <Table
        striped
        bordered
        hover
        style={{
          width: "95%",
          margin: "20px",
          marginTop: "80px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Bác sĩ</th>
            <th>Chuyên Khoa</th>
            <th>Ngày</th>
            <th>Giờ Bắt Đầu</th>
            <th>Giờ Kết Thúc</th>
            <th>Thời Gian Mỗi Slot</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index}>
              <td>
                {schedule.doctor_id.first_name} {schedule.doctor_id.last_name}
              </td>
              <td>{schedule.doctor_id.specialties}</td>
              <td>{schedule.date}</td>
              <td>{schedule.working_hours.start_time}</td>
              <td>{schedule.working_hours.end_time}</td>
              <td>{schedule.slot_duration} phút</td>
              <td>
                <Button
                  onClick={handleOpenCreateModal}
                  style={{ marginRight: "10px" }}
                >
                  Tạo Lịch
                </Button>
                <Button
                  onClick={() => handleOpenViewModal(schedule)}
                  variant="info"
                  style={{ marginRight: "10px" }}
                >
                  Xem
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleOpenUpdateModal(schedule)}
                  style={{ marginRight: "10px" }}
                >
                  Cập Nhật
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleOpenDeleteModal(schedule)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={5} // Dynamic page count
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={() => {}}
        forcePage={1} // Sync ReactPaginate with currentPage
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ScheduleManage;
