const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Thiết lập locale cho faker
faker.locale = 'vi';

// Kết nối tới MongoDB
const connectionString = 'mongodb+srv://admin:1@cluster0.yae41.mongodb.net/ClinicManagement?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(connectionString)
    .then(() => console.log('Đã kết nối thành công tới MongoDB'))
    .catch((err) => console.log('Lỗi kết nối MongoDB:', err));

// Hàm để tạo số điện thoại Việt Nam hợp lệ
const generateVietnamPhoneNumber = () => {
    const prefix = faker.helpers.arrayElement(['03', '05', '07', '08', '09']); // Các đầu số phổ biến ở Việt Nam
    const phoneNumber = prefix + faker.string.numeric(8); // Tạo phần còn lại của số điện thoại
    return phoneNumber;
};

// Hàm để tạo tên đầy đủ tiếng Việt
const generateVietnameseName = () => {
    const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ'];
    const middleNames = ['Văn', 'Thị', 'Hữu', 'Thanh', 'Thu', 'Minh', 'Ngọc', 'Đình', 'Xuân', 'Quốc'];
    const lastNames = ['An', 'Bình', 'Chi', 'Dũng', 'Hải', 'Hương', 'Khánh', 'Linh', 'Phúc', 'Quân'];

    const firstName = faker.helpers.arrayElement(firstNames);
    const middleName = faker.helpers.arrayElement(middleNames);
    const lastName = faker.helpers.arrayElement(lastNames);

    return {
        firstName: `${firstName} ${middleName}`,
        lastName: lastName
    };
};

// Hàm để tạo địa chỉ tiếng Việt
const generateVietnameseAddress = () => {
    const cities = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Nha Trang', 'Đà Lạt', 'Huế', 'Vũng Tàu'];
    const streets = ['Nguyễn Trãi', 'Lê Lợi', 'Trần Phú', 'Hùng Vương', 'Hoàng Hoa Thám', 'Quang Trung', 'Phan Bội Châu', 'Lý Thường Kiệt'];

    const city = faker.helpers.arrayElement(cities);
    const street = faker.helpers.arrayElement(streets);
    const streetNumber = faker.string.numeric(2);

    return `${streetNumber} ${street}, ${city}`;
};

// Hàm để chèn dữ liệu bệnh nhân
const insertBulkPatients = async (numPatients) => {
    const hashedPassword = await bcrypt.hash("test123", 10);
    try {
        const patients = [];

        for (let i = 0; i < numPatients; i++) {
            const { firstName, lastName } = generateVietnameseName();
            const patient = new User({
                first_name: firstName,
                last_name: lastName,
                email: faker.internet.email(),
                phone: generateVietnamPhoneNumber(), // Số điện thoại Việt Nam hợp lệ
                address: generateVietnameseAddress(),
                gender: faker.helpers.arrayElement(['Nam', 'Nữ']),
                role: 'patient',
                password: hashedPassword,
                birthdate: faker.date.past(60, new Date('2010-01-01')),
                imageUrl: faker.image.avatar()
            });

            patients.push(patient);
        }

        // Chèn dữ liệu vào MongoDB
        await User.insertMany(patients);
        console.log(`Đã chèn thành công ${numPatients} bệnh nhân.`);
    } catch (error) {
        console.error('Có lỗi khi chèn dữ liệu:', error.message);
    } finally {
        mongoose.connection.close(); // Đóng kết nối sau khi hoàn thành
    }
};

// Gọi hàm để chèn 100 bác sĩ và 500 bệnh nhân
insertBulkPatients(1000);
