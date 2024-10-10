import "../../style/doctors.scss";

function Doctors() {
  return (
    <div className="doctor-page">
      <div className="add-doctor-form">
        <h3>Thêm bác sĩ</h3>
        <form>
          <div className="form-left">
            <div>
              <label>Họ:</label>
              <input type="text" name="firstName" />
              <label>Tên:</label>
              <input type="text" name="lastName" />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" />
            </div>
            <div>
              <label>Giới tính:</label>
              <select name="gender">
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
              <label>Ngày sinh:</label>
              <input type="date" name="dob" />
            </div>

            <div>
              <label>Số điện thoại:</label>
              <input type="text" name="phone" />
            </div>
            <div>
              <label>Chuyên khoa:</label>
              <input type="text" name="specialization" />
            </div>
            <button type="submit" className="btn">
              Tạo bác sĩ
            </button>
          </div>

          {/* Trường ảnh */}
          <div className="form-right">
            <div className="image-preview">
              <img src="https://via.placeholder.com/150x200" />
            </div>
            <label>Ảnh bác sĩ:</label>
            <input type="file" name="doctorImage" accept="image/*" />
          </div>
        </form>
      </div>

      {/* Hiển thị danh sách bác sĩ */}
      <div className="table-container">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Tên bác sĩ</th>
              <th>Email</th>
              <th>Giới tính</th>
              <th>Số điện thoại</th>
              <th>Chuyên khoa</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nguyen Tan Dung</td>
              <td>dungnguyentan10112003@gmail.com</td>
              <td>Male</td>
              <td>0935038810</td>
              <td>Tim Mạch</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Dũng</td>
              <td>dung@gmail.com</td>
              <td>Male</td>
              <td>0935038810</td>
              <td>Tim Mạch</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Dũng</td>
              <td>dung@gmail.com</td>
              <td>Male</td>
              <td>0935038810</td>
              <td>Tim Mạch</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Dũng</td>
              <td>dung@gmail.com</td>
              <td>Male</td>
              <td>0935038810</td>
              <td>Tim Mạch</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Dũng</td>
              <td>dung@gmail.com</td>
              <td>Male</td>
              <td>0935038810</td>
              <td>Tim Mạch</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Dũng</td>
              <td>dung@gmail.com</td>
              <td>Male</td>
              <td>0935038810</td>
              <td>Tim Mạch</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Dũng</td>
              <td>dung@gmail.com</td>
              <td>Male</td>
              <td>0935038810</td>
              <td>Tim Mạch</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Dũng</td>
              <td>dung@gmail.com</td>
              <td>Male</td>
              <td>0935038810</td>
              <td>Tim Mạch</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Dũng</td>
              <td>dung@gmail.com</td>
              <td>Male</td>
              <td>0935038810</td>
              <td>Tim Mạch</td>
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

export default Doctors;
