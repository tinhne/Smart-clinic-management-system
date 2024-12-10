const nodemailer = require("nodemailer");

// Cấu hình thông tin gửi email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "baythusonlam@gmail.com",
    pass: "hlxe zyvz fqdd owpj", // Mật khẩu ứng dụng
  },
});

// Hàm xử lý gửi email
const sendEmail = async (req, res) => {
  const { recipientEmail, subject, message, additionalInfo } = req.body;

  // Kiểm tra thông tin đầu vào
  if (!recipientEmail || !message) {
    return res.status(400).json({ error: "Missing email or message content." });
  }

  try {
    // Nội dung HTML của email
    const emailHTML = `
   <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.8;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      background-color: #007bff;
      color: #ffffff;
      padding: 20px;
      font-size: 1.5em;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      font-size: 1em;
      color: #555;
    }
    .content p {
      margin-bottom: 15px;
    }
    .content .highlight {
      color: #007bff;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      font-size: 0.9em;
      color: #888;
      padding: 15px;
      background-color: #f9f9f9;
      border-top: 1px solid #ddd;
    }
    .footer p {
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      Thông báo từ phòng khám
    </div>
    <div class="content">
      <p>Xin chào,</p>
      <p>${message}</p>
      ${
        additionalInfo
          ? `<p><span class="highlight">Thông tin bổ sung:</span> ${additionalInfo}</p>`
          : ""
      }
      <p>Chúc bạn một ngày tốt lành!</p>
    </div>
    <div class="footer">
      <p>Đây là email tự động, vui lòng không trả lời.</p>
    </div>
  </div>
</body>
</html>

    `;

    // Cấu hình email
    const mailOptions = {
      from: "hashayi147@gmail.com",
      to: recipientEmail,
      subject: subject || "Thông báo từ phòng khám",
      html: emailHTML, // Nội dung HTML
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);

    // Trả về kết quả
    res.status(200).json({
      message: "Email sent successfully!",
      info: info,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

// Xuất hàm sendEmail để sử dụng trong router
module.exports = { sendEmail };
