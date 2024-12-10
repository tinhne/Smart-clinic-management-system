import axios from "../../config/axios.customize";
const sendEmail = (recipientEmail,message) => {
    return axios.post(`/api/email/send-email`, recipientEmail,message);
};
export{
    sendEmail
}