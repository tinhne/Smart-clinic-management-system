import '../../style/userProfile/profileInfo.scss';
import axios from '../../config/axios.customize';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContentProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        gender: '',
        birthdate: '',
        email: '',
        imageUrl: '',
    });

    useEffect(() => {
        // Fetch user profile data
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                toast.error('User ID not found');
                return;
            }

            try {
                const response = await axios.get(`/users/${userId}`);
                setProfile(response.user);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                toast.error('Failed to fetch profile');
            }
        };

        fetchProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleUpdateClick = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error('User ID not found');
            return;
        }

        try {
            const response = await axios.put(`/users/${userId}`, profile);
            setProfile(response.user);
            setIsEditing(false);
            toast.success('Cập nhật thông tin thành công!');
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error('Cập nhật thông tin thất bại!');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <main className="content">
            <ToastContainer />
            <div className="profile">
                <div className="profile-content">
                    {isEditing ? (
                        <div className="profile-details">
                            <h2 className="text-xl font-bold mb-4">Điều chỉnh thông tin</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block font-medium">Họ và tên <span className="text-red-500">*</span></label>
                                    <input type="text" name="first_name" value={profile.first_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                                    <input type="text" name="last_name" value={profile.last_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block font-medium">Số điện thoại <span className="text-red-500">*</span></label>
                                    <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block font-medium">Ngày sinh <span className="text-red-500">*</span></label>
                                    <input type="text" name="birthdate" value={profile.birthdate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block font-medium">Giới tính <span className="text-red-500">*</span></label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center">
                                            <input type="radio" name="gender" value="Male" checked={profile.gender === 'Male'} onChange={handleChange} className="mr-2" />
                                            Nam
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="gender" value="Female" checked={profile.gender === 'Female'} onChange={handleChange} className="mr-2" />
                                            Nữ
                                        </label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block font-medium">Địa chỉ cụ thể</label>
                                        <input type="text" name="address" value={profile.address} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-medium">Email</label>
                                    <input type="text" name="email" value={profile.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button type="button" onClick={handleCancelClick} className="py-2 px-4 bg-gray-200 text-gray-700 rounded">Hủy</button>
                                    <button type="button" onClick={handleUpdateClick} className="py-2 px-4 bg-blue-500 text-white rounded">Cập nhật</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="profile-details">
                            <div className="profile-header flex items-center mb-4">
                                <div className="profile-avatar w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">TE</div>
                                <div className="profile-info ml-4">
                                    <div className="profile-name font-bold">{profile.first_name} {profile.last_name}</div>
                                    <div className="profile-id text-gray-500">Mã BN: YMP241975317</div>
                                </div>
                            </div>
                            <div className="profile-warning mb-4 text-red-500">
                                Hoàn thiện thông tin để đặt khám và quản lý hồ sơ y tế được tốt hơn.
                            </div>
                            <div className="profile-section mb-4">
                                <div className="section-title font-bold mb-2">Thông tin cơ bản</div>
                                <div className="section-content grid grid-cols-2 gap-4">
                                    <div>Họ và tên</div>
                                    <div>{profile.first_name} {profile.last_name}</div>
                                    <div>Điện thoại</div>
                                    <div>{profile.phone}</div>
                                    <div>Ngày sinh</div>
                                    <div>{profile.birthdate}</div>
                                    <div>Giới tính</div>
                                    <div>{profile.gender}</div>
                                    <div>Địa chỉ</div>
                                    <div>{profile.address}</div>
                                </div>
                            </div>
                            <div className="profile-section mb-4">
                                <div className="section-title font-bold mb-2">Thông tin bổ sung</div>
                                <div className="section-content grid grid-cols-2 gap-4">
                                    <div>Email</div>
                                    <div>{profile.email}</div>
                                </div>
                            </div>
                            <button onClick={handleEditClick} className="edit-profile-btn py-2 px-4 bg-blue-500 text-white rounded">Thay đổi thông tin</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ContentProfile;