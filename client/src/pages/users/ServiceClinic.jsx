import React from "react";
import ReactPaginate from "react-paginate";
import "../../style/ServiceClinic/ServiceClinic.scss";

const ServiceClinic = () => {
  return (
    <div className="container">
      <h2 className="text-center my-4">BẢNG GIÁ DỊCH VỤ</h2>

      <div className="d-flex justify-content-between mb-3">
        <input type="text" className="form-controll" placeholder="Search..." />
      </div>

      {/* Table structure */}
      <table className="table-service">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Tên dịch vụ</th>
            <th>Giá</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Chụp X-Quang</td>
            <td>150000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Khám cấp cứu ngoài giờ hành chính</td>
            <td>450000</td>
          </tr>
          {/* Bạn có thể thêm nhiều hàng hơn nếu muốn */}
        </tbody>
      </table>

      {/* Pagination (ReactPaginate) */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={5} // Tạm thời hiển thị 5 trang
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
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

export default ServiceClinic;
