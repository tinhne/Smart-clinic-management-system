import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../style/ServiceClinic/ServiceClinic.scss";
import { getAllServices } from "../../services/serviceAPI";

const ServiceClinic = () => {
  const [services, setServices] = useState([]); // All services fetched from the server
  const [filteredServices, setFilteredServices] = useState([]); // Services after search filter
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const itemsPerPage = 10;

  // Fetch services from the server
  const fetchServices = async (page) => {
    try {
      setLoading(true);
      setError(null); // Clear old errors
      const data = await getAllServices(page, itemsPerPage);
      if (data) {
        setServices(data.services); // Set all services
        setFilteredServices(data.services); // Initialize filtered services
        setTotalPages(data.totalPages);
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
    fetchServices(currentPage); // Fetch services when component mounts
  }, [currentPage]);

  // Pagination handler
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1); // ReactPaginate starts at 0
  };

  // Search handler
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter the services list based on search term
    if (term === "") {
      setFilteredServices(services); // Show all services if search term is empty
    } else {
      const filtered = services.filter(
        (service) => service.name.toLowerCase().includes(term) // Match the service name with the search term
      );
      setFilteredServices(filtered);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4 service-clinic">BẢNG GIÁ DỊCH VỤ</h2>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-controll"
          placeholder="Nhập tên dịch vụ cần tìm..."
          value={searchTerm}
          onChange={handleSearch} // Call the search handler
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          <table className="table-service">
            <thead className="thead-light">
              <tr>
                <th>STT</th> {/* Số thứ tự */}
                <th>Tên dịch vụ</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <tr key={service.id || index}>
                    {/* Ensure key is unique */}
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>{" "}
                    {/* Calculate STT */}
                    <td>{service.name}</td>
                    <td>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(service.price)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    Không tìm thấy dịch vụ nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            forcePage={currentPage - 1}
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
