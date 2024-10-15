import React from "react";
import { NavLink } from "react-router-dom";
import "../../style/DoctorList/DoctorList.scss";
import ReactPaginate from "react-paginate";

const doctors = [
  {
    id: 1,
    name: "ThS. BS Anh Tuấn",
    specialties: ["Nam khoa", "Ngoại niệu"],
    address: "23 Nguyễn Văn Đậu, Phường 5, Quận Phú Nhuận, Hồ Chí Minh",
    img: "doctor1.png",
  },
  {
    id: 2,
    name: "TS. BS Đào Bùi Quý Quyên",
    specialties: ["Nội thận", "Ngoại tiết niệu"],
    address: "242 Nguyễn Chí Thanh, Phường 2, Quận 10, Hồ Chí Minh",
    img: "doctor2.png",
  },
  {
    id: 3,
    name: "PGS. TS. BS Nguyễn Thị Bích Đào",
    specialties: ["Nội tiết"],
    address: "215F Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Hồ Chí Minh",
    img: "doctor3.png",
  },
];

const categories = [
  { name: "Tất cả", path: "/dat-kham/bac-si" },
  { name: "Nhi khoa", path: "/dat-kham/nhi-khoa" },
  { name: "Sản phụ khoa", path: "/dat-kham/san-phu-khoa" },
  { name: "Da liễu", path: "/dat-kham/da-lieu" },
  { name: "Tiêu hoá", path: "/dat-kham/tieu-hoa" },
  { name: "Cơ xương khớp", path: "/dat-kham/co-xuong-khop" },
  { name: "Dị ứng - miễn dịch", path: "/dat-kham/di-ung" },
  { name: "Gây mê hồi sức", path: "/dat-kham/gay-me" },
  { name: "Tai - mũi - họng", path: "/dat-kham/tai-mui-hong" },
  { name: "Ung bướu", path: "/dat-kham/ung-buou" },
];

function DoctorList() {
  return (
    <div className="page-container">
      <aside className="sidebar">
        <nav>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <NavLink
                  to={category.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-item">
            <img src={doctor.img} alt={doctor.name} className="doctor-img" />
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p>
                {doctor.specialties.map((spec, index) => (
                  <span key={index} className="specialty">
                    {spec}
                  </span>
                ))}
              </p>
              <p>{doctor.address}</p>
            </div>
            <button className="appointment-btn">Đặt khám</button>
          </div>
        ))}
        <ReactPaginate
          nextLabel="next >"
          onPageChange={() => console.log(123)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={5}
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
