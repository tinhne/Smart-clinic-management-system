import React from "react";
import "../../style/service.scss";

function Services() {
  return (
    <div className="service-page">
      <div className="add-service-form">
        <h3>Thêm dịch vụ</h3>
        <form>
          <div>
            <label>Tên dich vụ:</label>
            <input type="text" name="serviceName" />
          </div>

          <div>
            <label>Đơn Giá:</label>
            <input type="text" name="servicePrice" />
          </div>

          <button type="submit" className="btn">
            Thêm dich vụ
          </button>
        </form>
      </div>

      {/* Hiển thị danh sách dịch vụ */}
      <div className="table-container">
        <table className="service-table">
          <thead>
            <tr>
              <th>Tên dịch vụ</th>
              <th>Giá</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Paracetamol</td>
              <td>20,000</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Services;
