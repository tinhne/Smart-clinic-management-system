import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/adminStyle/ScheduleManage.scss";
import ReactPaginate from "react-paginate";

import {
  getScheduleDoctorByDate,
  deleteDoctorSchedules,
  editDoctorSchedules,
  createDoctorSchedule,
} from "../../utils/SchedualAPI/SchedualService";
import ModalDeleteSchedule from "../../components/admin/Schedule/ModalDeleteSchedule";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalUpdateSchedule from "../../components/admin/Schedule/ModalUpdateSchedule";
import ModalCreateSchedule from "../../components/admin/Schedule/ModalCreateSchedule";
import { CiCirclePlus } from "react-icons/ci";

const ScheduleManage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [noSchedulesMessage, setNoSchedulesMessage] = useState(false);

  const fetchSchedules = async (date) => {
    setLoading(true);
    setNoSchedulesMessage(false); // Reset the message before fetching

    try {
      const response = await getScheduleDoctorByDate(date);
      if (response.success) {
        setSchedules(response.data);

        // Set noSchedulesMessage only if there are no schedules returned
        if (response.data.length === 0) {
          setNoSchedulesMessage(true);
        } else {
          setNoSchedulesMessage(false); // Reset in case there are schedules
        }
      } else {
        setSchedules([]);
        setNoSchedulesMessage(true); // Handle the case where the API indicates an error
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setNoSchedulesMessage(true); // Display the message if an error occurs
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    // Create a new date object to avoid mutating the original date
    const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    setSelectedDate(newDate); // Set the selected date mà không bị lệch múi giờ
    const formattedDate = newDate.toISOString().split("T")[0];
    console.log("Selected date", formattedDate);
    fetchSchedules(formattedDate);
  };

  const handleFetchDataClick = () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    fetchSchedules(formattedDate);
  };

  const handleOpenDeleteModal = (schedule) => {
    setSelectedSchedule(schedule);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedSchedule(null);
  };
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setSelectedSchedule(null);
  };

  const handleOpenEditModal = (schedule) => {
    setSelectedSchedule(schedule);
    setShowEditModal(true);
  };
  const handleOpenCreateModal = (schedule) => {
    setSelectedSchedule(schedule);
    setShowCreateModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedSchedule(null);
  };

  const handleDeleteSchedule = async () => {
    if (selectedSchedule) {
      try {
        const response = await deleteDoctorSchedules(
          selectedSchedule.schedule_id
        );
        if (response.success) {
          toast.success("Xóa lịch khám thành công!");
          setSchedules((prevSchedules) =>
            prevSchedules.filter(
              (schedule) =>
                schedule.schedule_id !== selectedSchedule.schedule_id
            )
          );

          // Fetch schedules again after deletion
          const formattedDate = selectedDate.toISOString().split("T")[0];
          fetchSchedules(formattedDate);

          handleCloseDeleteModal();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting schedule:", error);
        toast.error("Có lỗi xảy ra khi xóa lịch.");
      }
    }
  };

  const handleUpdateSchedule = async (updatedSchedule) => {
    try {
      const response = await editDoctorSchedules(
        updatedSchedule._id,
        updatedSchedule
      );
      if (response.success) {
        toast.success("Cập nhật lịch khám thành công!");

        // Fetch schedules again after updating
        const formattedDate = selectedDate.toISOString().split("T")[0];
        fetchSchedules(formattedDate);

        // Close the edit modal and reset selected schedule
        setShowEditModal(false);
        setSelectedSchedule(null);
      } else {
        toast.error(response.message || "Cập nhật thất bại.");
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
      toast.error("Có lỗi xảy ra khi cập nhật lịch.");
    }
  };

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    console.log(">>>>>>>>", formattedDate);
    fetchSchedules(formattedDate);
  }, [selectedDate]);

  return (
    <div>
      <div className="datepiker-addbtn">
        <div
          className="date-picker-container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <label style={{ marginRight: "10px" }}>Chọn Ngày:</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy" // This will format the date shown in the input
            className="form-control"
            style={{ marginRight: "10px" }}
          />

          <Button variant="primary" onClick={handleFetchDataClick}>
            Lấy Dữ Liệu
          </Button>
        </div>
        <div className="add-schedual">
          <Button variant="primary" onClick={handleOpenCreateModal}>
            <CiCirclePlus className="ic" />
            Thêm lịch
          </Button>
        </div>
      </div>
      <Table striped bordered hover style={{ marginTop: "20px" }}>
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
          {loading ? (
            <tr>
              <td colSpan="7">Đang tải dữ liệu...</td>
            </tr>
          ) : schedules.length > 0 ? (
            schedules.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.doctor_name}</td>
                <td>{schedule.specialties.join(", ")}</td>
                <td>
                  {new Date(schedule.date)
                    .getDate()
                    .toString()
                    .padStart(2, "0") +
                    "-" +
                    (new Date(schedule.date).getMonth() + 1)
                      .toString()
                      .padStart(2, "0") +
                    "-" +
                    new Date(schedule.date).getFullYear()}
                </td>
                <td>{schedule.start_time}</td>
                <td>{schedule.end_time}</td>
                <td>{schedule.slot_duration} phút</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleOpenEditModal(schedule)}
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
            ))
          ) : noSchedulesMessage ? (
            <tr>
              <td colSpan="7">Không có lịch khám nào cho ngày đã chọn.</td>
            </tr>
          ) : null}
        </tbody>
      </Table>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={5}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        containerClassName={"pagination-container"}
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

      {/* Modal Xóa Lịch */}
      <ModalDeleteSchedule
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDeleteSchedule}
        selectedSchedule={selectedSchedule}
      />

      {/* Modal Cập Nhật Lịch */}
      <ModalUpdateSchedule
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleUpdate={handleUpdateSchedule}
        selectedSchedule={selectedSchedule}
      />
      <ModalCreateSchedule
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        onScheduleCreated={handleFetchDataClick}
      />
    </div>
  );
};

export default ScheduleManage;
