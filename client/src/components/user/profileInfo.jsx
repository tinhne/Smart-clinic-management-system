import "../../style/userProfile/profileInfo.scss";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserById, editUser } from "../../utils/AuthAPI/userService";
// import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const ContentProfile = () => {
  // const [isEditing, setIsEditing] = useState(false);
  // const [loading, setLoading] = useState(false); // Trạng thái loading
  // const [profile, setProfile] = useState({
  //   first_name: "",
  //   last_name: "",
  //   phone: "",
  //   address: "",
  //   gender: "",
  //   birthdate: "",
  //   email: "",
  //   imageUrl: "",
  // });

  // const fetchUser = async () => {
  //   try {
  //     const token = Cookies.get("access_token");
  //     const role = Cookies.get("role");
  //     if (!token) {
  //       toast.error("Không tìm thấy token.");
  //       return;
  //     }

  //     // Decode the token to extract the user ID
  //     const decodedToken = jwt_decode(token);
  //     const userId = decodedToken._id;
  //     const data = await getUserById(userId, role);
  //     console.log(data);
  //     if (data && data.user) {
  //       // Ensure data.users exists
  //       setProfile(data.user);
  //     } else {
  //       toast.error("Không thể tải bệnh nhân");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users by role:", error);
  //     toast.error("Lỗi khi kết nối tới server.");
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []); // Empty dependency array to run once on mount

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleCancelClick = () => {
  //   setIsEditing(false);
  // };

  // const handleUpdateClick = async () => {
  //   try {
  //     const userID = jwt_decode(Cookies.get("access_token"))._id;
  //     const res = await editUser(userID, profile);
  //     setProfile(res.user);
  //     setIsEditing(false);
  //     toast.success("Cập nhật thông tin thành công");
  //   } catch (error) {
  //     console.error("Error fetching users by role:", error);
  //     toast.error("Lỗi khi kết nối tới server.");
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfile({ ...profile, [name]: value });
  // };

  // return (
  //   <main className="content">
  //     <ToastContainer />
  //     <div className="profile">
  //       <div className="profile-content">
  //         {isEditing ? (
  //           <div className="profile-details">
  //             <h2 className="text-xl font-bold mb-4">Điều chỉnh thông tin</h2>
  //             <form className="space-y-4">
  //               <div>
  //                 <label className="block mb-2 font-medium">
  //                   Họ và tên <span className="text-red-500 ">*</span>
  //                 </label>
  //                 <input
  //                   type="text"
  //                   name="first_name"
  //                   value={profile.first_name}
  //                   onChange={handleChange}
  //                   className="w-full p-2 mb-2 border border-gray-300 rounded"
  //                 />
  //                 <input
  //                   type="text"
  //                   name="last_name"
  //                   value={profile.last_name}
  //                   onChange={handleChange}
  //                   className="w-full p-2 mb-2 border border-gray-300 rounded"
  //                 />
  //               </div>
  //               <div>
  //                 <label className="block mb-2 font-medium">
  //                   Số điện thoại <span className="text-red-500">*</span>
  //                 </label>
  //                 <input
  //                   type="text"
  //                   name="phone"
  //                   value={profile.phone}
  //                   onChange={handleChange}
  //                   className="w-full mb-2 p-2 border border-gray-300 rounded"
  //                 />
  //               </div>
  //               <div>
  //                 <label className="block mb-2 font-medium">
  //                   Ngày sinh <span className="text-red-500">*</span>
  //                 </label>
  //                 <input
  //                   type="text"
  //                   name="birthdate"
  //                   value={profile.birthdate}
  //                   onChange={handleChange}
  //                   className="w-full p-2 border border-gray-300 rounded"
  //                 />
  //               </div>
  //               <div>
  //                 <label className="block mb-2 font-medium">
  //                   Giới tính <span className="text-red-500">*</span>
  //                 </label>
  //                 <div className="flex items-center space-x-4">
  //                   <label className="flex mb-2 items-center">
  //                     <input
  //                       type="radio"
  //                       name="gender"
  //                       value="Male"
  //                       checked={profile.gender === "Male"}
  //                       onChange={handleChange}
  //                       className="mr-2"
  //                     />
  //                     Nam
  //                   </label>
  //                   <label className="flex mb-2 items-center">
  //                     <input
  //                       type="radio"
  //                       name="gender"
  //                       value="Female"
  //                       checked={profile.gender === "Female"}
  //                       onChange={handleChange}
  //                       className="mr-2"
  //                     />
  //                     Nữ
  //                   </label>
  //                 </div>
  //               </div>
  //               <div>
  //                 <label className=" block mb-2 font-medium">
  //                   Địa chỉ cụ thể
  //                 </label>
  //                 <input
  //                   type="text"
  //                   name="address"
  //                   value={profile.address}
  //                   onChange={handleChange}
  //                   className="w-full p-2 mb-2 border border-gray-300 rounded"
  //                 />
  //               </div>
  //               <div>
  //                 <label className="block mb-2 font-medium">Email</label>
  //                 <input
  //                   type="text"
  //                   name="email"
  //                   value={profile.email}
  //                   onChange={handleChange}
  //                   className="w-full p-2 border border-gray-300 rounded"
  //                 />
  //               </div>
  //               <div className="flex mt-3 justify-end space-x-4">
  //                 <button
  //                   type="button"
  //                   onClick={handleCancelClick}
  //                   className="py-2 px-4 bg-gray-200 text-gray-700 rounded"
  //                 >
  //                   Hủy
  //                 </button>
  //                 <button
  //                   type="button"
  //                   onClick={handleUpdateClick}
  //                   className="py-2 px-4 bg-blue-500 text-white rounded"
  //                 >
  //                   Cập nhật
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         ) : (
  //           <div className="profile-details">
  //             <div className="profile-header flex items-center mb-4">
  //               <div className="profile-avatar w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">
  //                 TE
  //               </div>
  //               <div className="profile-info ml-4">
  //                 <div className="profile-name font-bold">
  //                   {profile.first_name} {profile.last_name}
  //                 </div>
  //                 {/* <div className="profile-id text-gray-500">Mã BN: {profile._id}</div> */}
  //               </div>
  //             </div>
  //             <div className="profile-warning mb-4 text-red-500">
  //               Hoàn thiện thông tin để đặt khám và quản lý hồ sơ y tế được tốt
  //               hơn.
  //             </div>
  //             <div className="profile-section mb-4">
  //               <div className="section-title font-bold mb-2">
  //                 Thông tin cơ bản
  //               </div>
  //               <div className="section-content grid grid-cols-2 gap-4">
  //                 <div>Họ và tên</div>
  //                 <div>
  //                   {profile.first_name} {profile.last_name}
  //                 </div>
  //                 <div>Điện thoại</div>
  //                 <div>{profile.phone}</div>
  //                 <div>Ngày sinh</div>
  //                 <div>{profile.birthdate}</div>
  //                 <div>Giới tính</div>
  //                 <div>{profile.gender}</div>
  //                 <div>Địa chỉ</div>
  //                 <div>{profile.address}</div>
  //               </div>
  //             </div>
  //             <div className="profile-section mb-4">
  //               <div className="section-title font-bold mb-2">
  //                 Thông tin bổ sung
  //               </div>
  //               <div className="section-content grid grid-cols-2 gap-4">
  //                 <div>Email</div>
  //                 <div>{profile.email}</div>
  //               </div>
  //             </div>
  //             <button
  //               onClick={handleEditClick}
  //               className="edit-profile-btn py-2 px-4 bg-blue-500 text-white rounded"
  //             >
  //               Thay đổi thông tin
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </main>
  // );
};

export default ContentProfile;
