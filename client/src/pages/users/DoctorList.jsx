import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../style/DoctorList/DoctorList.scss";
import ReactPaginate from "react-paginate";
import { getAllUserByRole, getAllDoctorsBySpecialty } from "../../utils/AuthAPI/AdminService";

const categories = [
  { name: "Tất cả" },
  { name: "Nhi khoa" },
  { name: "Sản phụ khoa" },
  { name: "Da liễu" },
  { name: "Tiêu hoá" },
  { name: "Cơ xương khớp" },
  { name: "Dị ứng - miễn dịch" },
  { name: "Gây mê hồi sức" },
  { name: "Tai - mũi - họng" },
  { name: "Ung bướu" },
];

function DoctorList() {
  const [doctorList, setDoctorList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Tất cả"); 
  const fetchDoctors = async (specialty = null) => {
    let data;
    
    if (specialty === "Tất cả") {
      data = await getAllUserByRole("doctor", 1, 1000); // Lấy tất cả bác sĩ
      console.log(data.users); // Kiểm tra dữ liệu trả về

    } else {
      // Gọi API với cách gửi dữ liệu phù hợp
      data = await getAllDoctorsBySpecialty({ specialty }); // Gửi một đối tượng có specialty
    }
  
    if (data) {
      setDoctorList(data.doctors || data.users);
    } else {
      setDoctorList([]);
    }
  };
  

  useEffect(() => {
    fetchDoctors(currentCategory); // Gọi hàm lấy bác sĩ khi component mount hoặc khi currentCategory thay đổi
  }, [currentCategory]); // Chỉ gọi lại khi currentCategory thay đổi

  // Hàm xử lý khi người dùng chọn chuyên khoa
const handleChange = (categoryName) => {
  setCurrentCategory(categoryName); // Cập nhật chuyên khoa hiện tại
  fetchDoctors(categoryName); // Gọi lại fetchDoctors khi thay đổi chuyên khoa
};


  return (
    <div className="page-container">
      <aside className="sidebar">
        <nav>
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleChange(category.name)}>
                <NavLink to="" className={({ isActive }) => (isActive ? "active" : "")}>
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="doctor-list">
        {doctorList.length > 0 ? (
          doctorList.map((doctor) => (
            <div key={doctor.id} className="doctor-item">
              <img  src={`data:image/jpeg;base64,${doctor.imageUrl}`} className="doctor-img" />
             
              <div className="doctor-info">
                <h3>{doctor.first_name} {doctor.last_name}</h3>
                <p>
                  {doctor.specialties.map((spec, index) => (
                    <span key={index} className="specialty">
                      {spec}
                    </span>
                  ))}
                </p>
                <p>{doctor.address}</p>
              </div>
              <NavLink to={`/dat-kham/bac-si/${doctor._id}?role=${doctor.role}`}> <button className="appointment-btn">Đặt khám</button></NavLink>
             
            </div>
          ))
        ) : (
          <p>Không tìm thấy bác sĩ nào.</p>
        )}

        <ReactPaginate
          nextLabel="next >"
          onPageChange={() => console.log(123)} // Hàm xử lý khi thay đổi trang
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={5} // Bạn có thể tính toán số trang dựa trên số lượng bác sĩ
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </main>
    </div>
  );
}

export default DoctorList;
