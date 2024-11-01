import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#0866FF",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#0866FF",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4CAF50",
};

// Hàm phân tích đầu vào của người dùng
function analyzeInput(input) {
  const inputLower = input ? input.toLowerCase() : "";

  // Sử dụng một số từ khóa để cải thiện khả năng hiểu
  const responses = {
    "đau đầu":
      "Đau đầu có thể do stress, thiếu ngủ, hoặc các bệnh lý khác. Bạn nên nghỉ ngơi và theo dõi tình trạng. Nếu đau đầu kéo dài, hãy đi khám bác sĩ.",
    "đau bụng":
      "Đau bụng có thể do tiêu hóa kém, nhiễm trùng, hoặc các vấn đề nội tạng. Nếu kéo dài hoặc kèm triệu chứng nặng, hãy đi khám ngay.",
    "mệt mỏi":
      "Mệt mỏi có thể do căng thẳng, thiếu ngủ hoặc thiếu dinh dưỡng. Nghỉ ngơi và ăn uống đầy đủ có thể giúp cải thiện.",
    "đau khớp":
      "Đau khớp có thể do viêm khớp hoặc chấn thương. Bạn nên nghỉ ngơi và tránh vận động quá sức. Nếu đau kéo dài, hãy tham khảo ý kiến bác sĩ.",
    "đau tai":
      "Đau tai có thể do nhiễm trùng hoặc tắc nghẽn tai. Nếu đau tai kéo dài hoặc có dấu hiệu nặng, nên đi khám chuyên khoa tai mũi họng.",
    "đau răng":
      "Đau răng có thể do sâu răng hoặc viêm lợi. Vệ sinh răng miệng tốt và nếu cơn đau kéo dài, bạn nên khám nha sĩ.",
    ho:
      "Triệu chứng ho có thể do cảm lạnh hoặc viêm nhiễm. Nghỉ ngơi và uống đủ nước, nếu triệu chứng không thuyên giảm, hãy đi khám.",
    cảm:
      "Triệu chứng cảm có thể do cảm lạnh hoặc viêm nhiễm. Nghỉ ngơi và uống đủ nước, nếu triệu chứng không thuyên giảm, hãy đi khám.",
    "đau cổ":
      "Đau cổ có thể do tư thế ngủ hoặc ngồi không đúng. Nghỉ ngơi và thực hiện các bài tập nhẹ nhàng có thể giúp giảm đau.",
    "dị ứng":
      "Dị ứng có thể do thức ăn, thuốc, hoặc yếu tố môi trường. Bạn nên tránh yếu tố gây dị ứng và tham khảo ý kiến bác sĩ nếu cần.",
    "bác sĩ": "Mời bạn chọn đặt khám",
  };

  // Kiểm tra từng từ khóa trong phản hồi của người dùng
  for (const key in responses) {
    if (inputLower.includes(key)) {
      return responses[key];
    }
  }

  return "Tôi chưa nhận diện được triệu chứng này. Bạn có thể mô tả rõ hơn hoặc liên hệ tới số điện thoại 0356241423.";
}

function OpenLink() {
  window.open("https://www.facebook.com/hieu.sky.9345", "_blank");
  return <span>Đang chuyển hướng tới trang đặt lịch khám online...</span>;
}

function ChooseDoctor() {
  const navigate = useNavigate();

  // Chuyển hướng đến trang chọn bác sĩ
  React.useEffect(() => {
    navigate("/dat-kham/bac-si/tim-kiem");
  }, [navigate]);

  return <span>Đang chuyển hướng tới trang chọn bác sĩ...</span>;
}

function BookDirectAppointment() {
  const navigate = useNavigate();

  // Chuyển hướng đến trang đặt lịch khám trực tiếp
  React.useEffect(() => {
    navigate("/dat-kham/bac-si/tim-kiem");
  }, [navigate]);

  return <span>Mời bạn chọn bác sĩ và đặt khám lịch</span>;
}

function RedirectToIntroduction() {
  const navigate = useNavigate();

  // Chuyển hướng đến trang giới thiệu của phòng khám
  React.useEffect(() => {
    navigate("/gioi-thieu");
  }, [navigate]);

  return <span>Đang chuyển hướng tới trang giới thiệu...</span>;
}

function NewChatBot() {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={[
          {
            id: "1",
            message: "Chào bạn! Bạn tên là gì?",
            trigger: "2",
          },
          {
            id: "2",
            user: true,
            trigger: "3",
          },
          {
            id: "3",
            message: "Chào bạn {previousValue}, bạn muốn hỏi về vấn đề gì?",
            trigger: "4",
          },
          {
            id: "4",
            user: true,
            trigger: "5",
          },
          {
            id: "5",
            message: ({ previousValue }) => analyzeInput(previousValue),
            trigger: ({ previousValue }) =>
              analyzeInput(previousValue) === "Mời chọn đặt lịch" ? "10" : "6",
          },
          {
            id: "6",
            options: [
              {
                value: "Đặt lịch khám trực tiếp",
                label: "Chọn bác sĩ",
                trigger: "7",
              },
              {
                value: "Đặt lịch khám online",
                label: "Đặt lịch khám online",
                trigger: "8",
              },
              {
                value: "Hỗ trợ trực tiếp",
                label: "Hỗ trợ trực tiếp",
                trigger: "11",
              },
            ],
          },
          {
            id: "7",
            component: <BookDirectAppointment />,
            asMessage: true,
            trigger: "4",
          },
          {
            id: "8",
            component: <OpenLink />,
            asMessage: true,
            trigger: "9",
          },
          {
            id: "9",
            message: "Cảm ơn bạn đã chọn đặt lịch khám online.",
            trigger: 4,
          },
          {
            id: "10",
            component: <ChooseDoctor />,
            asMessage: true,
            trigger: 4,
          },
          {
            id: "11",
            component: <RedirectToIntroduction />,
            asMessage: true,
            trigger: 4,
          },
        ]}
        floating={true}
      />
    </ThemeProvider>
  );
}

export default NewChatBot;
