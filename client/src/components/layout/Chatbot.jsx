// import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#0866FF',
  headerFontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: '#0866FF',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4CAF50',
};

// Hàm phân tích đầu vào của người dùng
function analyzeInput(input) {
  // const inputNormalized = input ? input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : ''; // Chuẩn hóa và chuyển đổi thành chữ thường

  const inputLower = input ? input.toLowerCase() : '';

  if (inputLower.includes('đau đầu')) {
    return 'Đau đầu có thể do stress, thiếu ngủ, hoặc các bệnh lý khác. Bạn nên nghỉ ngơi và theo dõi tình trạng. Nếu đau đầu kéo dài, hãy đi khám bác sĩ.';
  } else if (inputLower.includes('đau bụng')) {
    return 'Đau bụng có thể do tiêu hóa kém, nhiễm trùng, hoặc các vấn đề nội tạng. Nếu kéo dài hoặc kèm triệu chứng nặng, hãy đi khám ngay.';
  } else if (inputLower.includes('mệt mỏi')) {
    return 'Mệt mỏi có thể do căng thẳng, thiếu ngủ hoặc thiếu dinh dưỡng. Nghỉ ngơi và ăn uống đầy đủ có thể giúp cải thiện.';
  } else {
    return 'Tôi chưa nhận diện được triệu chứng này. Bạn có thể mô tả rõ hơn hoặc tìm lời khuyên từ bác sĩ.';
  }
  
}

function OpenLink() {
  window.open('https://www.facebook.com/hieu.sky.9345', '_blank');
  return <span>Đang chuyển hướng tới trang đặt lịch khám online...</span>;
}

function NewChatBot() {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'Chào bạn! Bạn tên là gì?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Chào bạn {previousValue}, bạn muốn hỏi về vấn đề gì?',
            trigger: '4',
          },
          {
            id: '4',
            user: true,
            trigger: '5',
          },
          {
            id: '5',
            message: ({ previousValue }) => analyzeInput(previousValue),
            trigger: '6',
          },
          {
            id: '6',
            options: [
              {
                value: 'Đặt lịch khám trực tiếp',
                label: 'Đặt lịch khám trực tiếp',
                trigger: '7',
              },
              {
                value: 'Đặt lịch khám online',
                label: 'Đặt lịch khám online',
                trigger: '8',
              },
            ],
          },
          {
            id: '7',
            message: 'Cảm ơn bạn đã chọn đặt lịch khám trực tiếp.',
            end: true,
          },
          {
            id: '8',
            component: <OpenLink />,
            asMessage: true,
            trigger: '9',
          },
          {
            id: '9',
            message: 'Cảm ơn bạn đã chọn đặt lịch khám online.',
            end: true,
          },
        ]}
        floating={true}
      />
    </ThemeProvider>
  );
}

export default NewChatBot;
