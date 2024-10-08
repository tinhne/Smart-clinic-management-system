// const { Vonage } = require('@vonage/server-sdk');
// require('dotenv').config();

// // Khởi tạo Vonage SDK
// const vonage = new Vonage({
//   apiKey: process.env.NEXMO_API_KEY,
//   apiSecret: process.env.NEXMO_API_SECRET
// });

// // Hàm định dạng số điện thoại
// const formatPhoneNumber = (phoneNumber) => {
//   return phoneNumber.startsWith('0') ? `+84${phoneNumber.slice(1)}` : `+84${phoneNumber}`;
// };

// // Hàm gửi SMS
// exports.sendSMS = async (phoneNumber, message) => {
//     const from = "Vonage APIs"; // Sử dụng tên người gửi
//     const to = formatPhoneNumber(phoneNumber); // Định dạng số điện thoại
//     // const to = "+84984894102"
//     const text = "hello man";
//   console.log(from, to, text)

//     await vonage.sms.send({from, to, text})
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
// };

const https = require('https');

const ACCESS_TOKEN = "sFbHHEdLVT_C6rVfUeZlKxP6muWz2nVJ"; // Thay bằng access token của bạn

const sendSMS = function(phones, content, type = 2, sender = '') {
    const url = 'api.speedsms.vn';
    const params = JSON.stringify({
        to: phones,
        content: content,
        sms_type: type,
        sender: sender
    });

    const auth = "Basic " + Buffer.from(`${ACCESS_TOKEN}:x`).toString('base64');

    const options = {
        hostname: url,
        port: 443,
        path: '/index.php/sms/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        }
    };

    const req = https.request(options, (res) => {
        let body = '';
        
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            const json = JSON.parse(body);
            if (json.status === 'success') {
                console.log("Gửi SMS thành công");
            } else {
                console.log("Gửi SMS thất bại:", json);
            }
        });
    });

    req.on('error', (e) => {
        console.error("Lỗi khi gửi SMS:", e.message);
    });

    req.write(params);
    req.end();
};

// Gửi thử SMS
sendSMS(['0899227992'], "Nội dung tin nhắn thử nghiệm", 2, 'tinh');