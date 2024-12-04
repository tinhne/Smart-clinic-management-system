const nodemailer = require('nodemailer');

// Cấu hình thông tin gửi email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'baythusonlam@gmail.com', 
    pass: 'hlxe zyvz fqdd owpj', // Mật khẩu ứng dụng
  },
});

// Hàm xử lý gửi email
const sendEmail = async (req, res) => {
  const { recipientEmail, message } = req.body;

  // Kiểm tra thông tin đầu vào
  if (!recipientEmail || !message) {
    return res.status(400).json({ error: 'Missing email or message content.' });
  }

  try {
    // Cấu hình nội dung email
    const mailOptions = {
      from: 'hashayi147@gmail.com',
      to: recipientEmail,
      subject: 'Thông báo từ phòng khám',
      text: message,
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);

    // Trả về kết quả
    res.status(200).json({
      message: 'Email sent successfully!',
      info: info,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

// Xuất hàm sendEmail để sử dụng trong router
module.exports = { sendEmail };
