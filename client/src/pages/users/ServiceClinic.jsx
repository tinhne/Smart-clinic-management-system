import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../style/ServiceClinic/ServiceClinic.scss";
import { getAllServices } from "../../services/serviceAPI";

const ServiceClinic = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5; // Assuming you are showing 5 services per page

  const fetchServices = async (page) => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const data = await getAllServices(page, itemsPerPage);
      if (data) {
        setServices(data.services);
        setTotalPages(data.totalPages); // Set the total pages from response
      } else {
        setError("Không thể tải danh sách dịch vụ.");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Lỗi khi kết nối tới server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage]);

  // Pagination handler
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1); // ReactPaginate's page index starts at 0
  };

  return (
    <div className="container">
      <h2 className="text-center my-4 service-clinic">BẢNG GIÁ DỊCH VỤ</h2>

      <div className="d-flex justify-content-between mb-3">
        <input type="text" className="form-controll" placeholder="Search..." />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          {/* Table structure */}
          <table className="table-service">
            <thead className="thead-light">
              <tr>
                <th>STT</th> {/* Serial number (auto-incremented) */}
                <th>Tên dịch vụ</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service, index) => (
                  <tr key={service.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>{" "}
                    {/* Serial number */}
                    <td>{service.name}</td>
                    <td>{service.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination (ReactPaginate) */}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages} // Dynamic page count
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            forcePage={currentPage - 1} // Sync ReactPaginate with currentPage
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
        </>
      )}
    </div>
  );
};

export default ServiceClinic;
