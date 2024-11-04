import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from "prop-types";
import { useState } from "react";
import { createDoctorSchedule } from '../../../utils/SchedualAPI/SchedualService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalCreateScheduleByDoctor = ({ show, handleClose, doctor, onScheduleCreated  }) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotDuration, setSlotDuration] = useState(30);

  const validateTimeFormat = (time) => {
    // Regular expression for validating HH:mm format
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timePattern.test(time);
  };

  const validateDateFormat = (date) => {
    // Regular expression for validating DD-MM-YYYY format
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    return datePattern.test(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate date
    if (!date) {
      toast.error("Ngày không được để trống!");
      return;
    }
    if (!validateDateFormat(date)) {
      toast.error("Ngày phải theo định dạng dd-mm-yyyy!");
      return;
    }
  
    // Validate time
    if (!validateTimeFormat(startTime) || !validateTimeFormat(endTime)) {
      toast.error("Thời gian phải theo định dạng hh:mm và nằm trong khung 24 giờ!");
      return;
    }
  
    // Validate that slot duration is not less than 10 minutes
    if (slotDuration < 10) {
      toast.error("Thời Gian Mỗi Slot không được nhỏ hơn 10 phút!");
      return;
    }
  
    // Convert date from dd-mm-yyyy to yyyy-mm-dd
    const [day, month, year] = date.split("-");
    const formattedDate = `${year}-${month}-${day}`; // Rearrange to yyyy-mm-dd
  
    // Prepare schedule data
    const scheduleData = {
      doctor_id: doctor._id, // Use the selected doctor's ID
      date: formattedDate, // Use the converted date
      working_hours: {
        start_time: startTime,
        end_time: endTime,
      },
      slot_duration: slotDuration,
    };
  
    try {
        const response = await createDoctorSchedule(scheduleData);
        if (response.success) {
          toast.success(response.msg);
          onScheduleCreated(); // Call the callback to notify schedule creation
          handleClose(); // Close the modal after creating the schedule
        } else {
          toast.error("Không thể tạo lịch: " + response.msg);
        }
      } catch (error) {
        console.error("Error creating schedule:", error);
        toast.error(error.response.data.msg);
      }
  };
  

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Tạo Lịch Làm Việc Cho Bác Sĩ {doctor?.first_name} {doctor?.last_name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="scheduleDate" className="form-label">Ngày</label>
              <input
                type="text"
                className="form-control"
                id="scheduleDate"
                placeholder="dd-mm-yyyy"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <small className="form-text text-muted">Vui lòng nhập ngày theo định dạng dd-mm-yyyy.</small>
            </div>
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">Thời Gian Bắt Đầu (hh:mm)</label>
              <input
                type="text"
                className="form-control"
                id="startTime"
                placeholder="hh:mm"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <small className="form-text text-muted">Vui lòng nhập thời gian theo định dạng 24 giờ (hh:mm).</small>
            </div>
            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">Thời Gian Kết Thúc (hh:mm)</label>
              <input
                type="text"
                className="form-control"
                id="endTime"
                placeholder="hh:mm"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
              <small className="form-text text-muted">Vui lòng nhập thời gian theo định dạng 24 giờ (hh:mm).</small>
            </div>
            <div className="mb-3">
              <label htmlFor="slotDuration" className="form-label">Thời Gian Mỗi Slot (phút)</label>
              <input
                type="number"
                className="form-control"
                id="slotDuration"
                value={slotDuration}
                onChange={(e) => setSlotDuration(Number(e.target.value))}
                min="10" // Set minimum to 10
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary" className="me-2">
                Tạo Lịch
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

    </div>
  );
};

// PropTypes validation
ModalCreateScheduleByDoctor.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  doctor: PropTypes.object,
  onScheduleCreated: PropTypes.func.isRequired, // Add prop type for the callback

};

export default ModalCreateScheduleByDoctor;
