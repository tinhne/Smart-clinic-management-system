import React from "react";
import "../../style/adminStyle/medicine.scss";

function Medication() {
  return (
    <div className="medicine-page">
      <div className="add-medicine-form">
        <h3>Thêm thuốc</h3>
        <form>
          <div>
            <label>Tên thuốc:</label>
            <input type="text" name="medicineName" />
          </div>
          <div>
            <label>Mô tả: </label>
            <input type="text" name="medicineDes" />
          </div>
          <div>
            <label>Đơn vị tính:</label>
            <select name="unit" id="unit">
              <option value="vien">Viên</option>
              <option value="hop">Hộp</option>
              <option value="chai">Chai</option>
              <option value="ong">Ống</option>
              <option value="goi">Gói</option>
            </select>
          </div>
          <div>
            <label>Đơn Giá:</label>
            <input type="text" name="medicinePrice" />
          </div>
          <div>
            <label>Số lượng:</label>
            <input type="text" name="medicineQuantity" />
          </div>
          <button type="submit" className="btn">
            Thêm thuốc
          </button>
        </form>
      </div>

      {/* Hiển thị danh sách thuốc */}
      <div className="table-container">
        <table className="medicine-table">
          <thead>
            <tr>
              <th>Tên thuốc</th>
              <th>Mô tả</th>
              <th>Đơn vị tính</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paracetamol</td>
              <td>Thuốc giảm đau</td>
              <td>Viên</td>
              <td>20,000</td>
              <td>50</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Amoxicillin</td>
              <td>Thuốc kháng sinh</td>
              <td>Viên</td>
              <td>50,000</td>
              <td>30</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Amoxicillin</td>
              <td>Thuốc kháng sinh</td>
              <td>Viên</td>
              <td>50,000</td>
              <td>30</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Amoxicillin</td>
              <td>Thuốc kháng sinh</td>
              <td>Viên</td>
              <td>50,000</td>
              <td>30</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Amoxicillin</td>
              <td>Thuốc kháng sinh</td>
              <td>Viên</td>
              <td>50,000</td>
              <td>30</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Amoxicillin</td>
              <td>Thuốc kháng sinh</td>
              <td>Viên</td>
              <td>50,000</td>
              <td>30</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Amoxicillin</td>
              <td>Thuốc kháng sinh</td>
              <td>Viên</td>
              <td>50,000</td>
              <td>30</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Amoxicillin</td>
              <td>Thuốc kháng sinh</td>
              <td>Viên</td>
              <td>50,000</td>
              <td>30</td>
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

export default Medication;
