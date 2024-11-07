function calculate(input) {
  try {
    // Sử dụng eval để tính toán, nhưng hãy cẩn thận với việc sử dụng eval trong thực tế.
    const result = eval(input);
    return `Kết quả của phép toán ${input} là: ${result}`;
  } catch (error) {
    return "Đã xảy ra lỗi trong quá trình tính toán. Vui lòng kiểm tra lại phép toán của bạn.";
  }
}

// Function to analyze user input
function analyzeInput(input) {
  const inputLower = input ? input.toLowerCase() : "";
  if (/^\s*\d+\s*[\+\-\*\/]\s*\d+\s*$/.test(inputLower)) {
    return calculate(inputLower);
  }
  const responses = {
    "đau đầu":
      "Đau đầu có thể do stress, thiếu ngủ, hoặc các bệnh lý khác. Bạn nên nghỉ ngơi và theo dõi tình trạng. Nếu đau đầu kéo dài, hãy đi khám bác sĩ.",
    "đau bụng":
      "Dạ, nếu bạn bị đau bụng, có một số bước bạn có thể thực hiện để quản lý tình trạng này. Tuy nhiên, quan trọng nhất là xác định nguyên nhân gây đau bụng để có phương pháp điều trị phù hợp. Dưới đây là một số gợi ý:\n\n" +
      "1. Theo dõi triệu chứng: Ghi lại vị trí cơn đau, mức độ đau, thời gian và bất kỳ triệu chứng kèm theo nào như buồn nôn, nôn, tiêu chảy, hoặc sốt.\n\n" +
      "2. Nghỉ ngơi: Nếu cơn đau không quá nghiêm trọng, bạn có thể nghỉ ngơi tại nhà và hạn chế các hoạt động nặng." +
      "3. Chế độ ăn uống: Hạn chế ăn các thực phẩm gây khó chịu như thức ăn nhiều dầu mỡ, gia vị mạnh. Có thể uống nước gừng nóng hoặc trà nóng để giúp làm dịu dạ dày.\n\n" +
      "4. Chườm nóng: Sử dụng túi chườm nóng hoặc khăn ấm đặt lên vùng bụng có thể giúp giảm cơn đau." +
      "5. Thuốc giảm đau: Nếu cần thiết, bạn có thể dùng thuốc giảm đau thông thường như paracetamol, nhưng nên tham khảo ý kiến bác sĩ hoặc dược sĩ trước khi sử dụng." +
      "6. Tìm kiếm sự chăm sóc y tế: Nếu cơn đau bụng kéo dài, nghiêm trọng hơn hoặc đi kèm với các triệu chứng như sốt cao, nôn ra máu, hoặc tiêu chảy nghiêm trọng, bạn nên đến bệnh viện hoặc gặp bác sĩ để được chẩn đoán và điều trị kịp thời.\n\n" +
      "Đối với các đau bụng có thể liên quan đến các vấn đề nghiêm trọng, việc khám chuyên khoa Nội có thể cần thiết để xác định căn nguyên chính xác và điều trị hiệu quả. Nếu bạn có bất kỳ triệu chứng nào nghi ngờ, hãy nhanh chóng đi khám để đảm bảo an toàn cho sức khỏe của mình.\n\n",
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
    "bác sĩ":
      "Mời bạn chọn bác sĩ hoặc đặt lịch khám nhanh để được hỗ trợ trực tiếp từ bác sĩ",
    "đau lưng":
      "Đau lưng có thể do tư thế không đúng hoặc căng cơ. Nghỉ ngơi và thực hiện các bài tập giãn cơ nhẹ nhàng có thể giúp cải thiện.",
    "đau ngực":
      "Đau ngực có thể là triệu chứng nghiêm trọng, đặc biệt nếu kèm theo khó thở. Hãy đi khám bác sĩ ngay lập tức.",
    "chóng mặt":
      "Chóng mặt có thể do huyết áp thấp, thiếu nước hoặc thiếu máu. Nghỉ ngơi và uống nước có thể giúp giảm triệu chứng.",
    "khó thở":
      "Khó thở có thể là dấu hiệu của các vấn đề hô hấp. Nếu tình trạng này không giảm, hãy đi khám ngay.",
    "ngứa da":
      "Ngứa da có thể do dị ứng hoặc nhiễm trùng. Nếu ngứa kéo dài hoặc lan rộng, nên tham khảo ý kiến bác sĩ.",
    "đau chân":
      "Đau chân có thể do căng cơ hoặc chấn thương. Nghỉ ngơi và tránh vận động mạnh có thể giúp cải thiện.",
    "đau mắt":
      "Đau mắt có thể do mắt bị căng thẳng hoặc nhiễm trùng. Nghỉ ngơi và tránh nhìn vào màn hình quá lâu.",
    "tiêu chảy":
      "Tiêu chảy có thể do nhiễm trùng hoặc tiêu hóa kém. Uống nhiều nước và nghỉ ngơi có thể giúp cải thiện.",
    "táo bón":
      "Táo bón có thể do chế độ ăn thiếu chất xơ hoặc ít vận động. Ăn thêm rau xanh và uống đủ nước có thể giúp cải thiện.",
    "mất ngủ":
      "Mất ngủ có thể do căng thẳng hoặc thay đổi lịch sinh hoạt. Thư giãn và tạo thói quen ngủ lành mạnh có thể giúp cải thiện.",
    "khó tiêu":
      "Khó tiêu có thể do ăn uống không đúng cách. Hạn chế thức ăn dầu mỡ và ăn chậm có thể giúp cải thiện.",
    "phát ban":
      "Phát ban có thể do dị ứng hoặc nhiễm trùng. Tránh tiếp xúc với các chất gây dị ứng và tham khảo ý kiến bác sĩ.",
    sốt:
      "Sốt có thể là dấu hiệu của nhiễm trùng. Nghỉ ngơi và uống đủ nước. Nếu sốt kéo dài, hãy đi khám.",
    "tức ngực":
      "Tức ngực có thể liên quan đến hô hấp hoặc tim mạch. Nếu tức ngực không giảm, hãy đi khám ngay.",
    "chảy máu cam":
      "Chảy máu cam có thể do mạch máu mũi yếu hoặc không khí khô. Cố gắng giữ ẩm mũi và tránh ngoáy mũi.",
    "đau hông":
      "Đau hông có thể do căng cơ hoặc chấn thương. Nghỉ ngơi và hạn chế vận động mạnh có thể giúp giảm đau.",
    "nôn mửa":
      "Nôn mửa có thể do ngộ độc thực phẩm hoặc nhiễm trùng. Nghỉ ngơi và uống nước từng chút một để tránh mất nước.",
    "ho ra máu":
      "Ho ra máu là triệu chứng nghiêm trọng. Hãy đi khám bác sĩ ngay để kiểm tra nguyên nhân.",
    "run tay chân":
      "Run tay chân có thể do lo âu hoặc hạ đường huyết. Nghỉ ngơi và ăn nhẹ có thể giúp cải thiện.",
    "đau cổ tay":
      "Đau cổ tay có thể do hoạt động lặp lại nhiều lần. Nghỉ ngơi và giảm bớt sử dụng cổ tay.",
    "đau bụng dưới":
      "Đau bụng dưới có thể do kinh nguyệt hoặc nhiễm trùng. Nếu kéo dài, nên đi khám.",
    "đau cánh tay":
      "Đau cánh tay có thể do căng cơ hoặc chấn thương. Nghỉ ngơi và tránh nâng vật nặng có thể giúp giảm đau.",
    "khàn tiếng":
      "Khàn tiếng có thể do viêm họng hoặc sử dụng giọng nói quá mức. Nghỉ ngơi và uống nước ấm.",
    "ngứa mắt":
      "Ngứa mắt có thể do dị ứng hoặc khô mắt. Tránh dụi mắt và sử dụng thuốc nhỏ mắt nếu cần.",
    "khô miệng":
      "Khô miệng có thể do thiếu nước hoặc dùng thuốc. Uống nước thường xuyên có thể giúp cải thiện.",
    "đau bụng trên":
      "Đau bụng trên có thể liên quan đến dạ dày hoặc gan. Nếu kéo dài, nên đi khám.",
    "đau vai":
      "Đau vai có thể do căng cơ hoặc chấn thương. Nghỉ ngơi và giảm vận động vai có thể giúp giảm đau.",
    "đầy hơi":
      "Đầy hơi có thể do ăn quá nhanh hoặc tiêu hóa kém. Ăn chậm và tránh thức ăn khó tiêu có thể giúp giảm triệu chứng.",
    "chảy mồ hôi nhiều":
      "Chảy mồ hôi nhiều có thể do căng thẳng hoặc bệnh lý. Nếu đổ mồ hôi quá mức, nên đi khám.",
    "căng thẳng":
      "Căng thẳng có thể ảnh hưởng đến sức khỏe toàn thân. Nghỉ ngơi và thực hành các kỹ thuật thư giãn như thiền hoặc yoga.",
    "đau lưỡi":
      "Đau lưỡi có thể do tổn thương, nhiệt miệng hoặc thiếu vitamin. Nếu kéo dài, hãy đi khám bác sĩ.",
    "sưng chân":
      "Sưng chân có thể do phù nề hoặc vấn đề về tuần hoàn. Nghỉ ngơi và nâng cao chân có thể giúp giảm sưng.",
    "mất khứu giác":
      "Mất khứu giác có thể do nhiễm trùng hoặc các bệnh về mũi. Nếu kéo dài, hãy đi khám chuyên khoa tai mũi họng.",
    "mất vị giác":
      "Mất vị giác có thể do nhiễm trùng hoặc thiếu hụt dinh dưỡng. Nếu kéo dài, nên đi khám bác sĩ.",
    "mắt nháy liên tục":
      "Mắt nháy liên tục có thể do căng thẳng hoặc thiếu ngủ. Nghỉ ngơi và thư giãn mắt có thể giúp giảm triệu chứng.",
    "buồn ngủ quá mức":
      "Buồn ngủ quá mức có thể do thiếu ngủ hoặc rối loạn giấc ngủ. Nếu kéo dài, hãy xem xét điều chỉnh lại lịch ngủ.",
    "mắt đỏ":
      "Mắt đỏ có thể do viêm kết mạc hoặc mỏi mắt. Rửa sạch mắt và tránh dụi mắt có thể giúp cải thiện.",
    "đau xương":
      "Đau xương có thể do thiếu canxi hoặc chấn thương. Nếu cơn đau kéo dài, hãy đi khám bác sĩ để kiểm tra.",
    "tê tay chân":
      "Tê tay chân có thể do vấn đề tuần hoàn hoặc thần kinh. Nếu triệu chứng kéo dài, hãy đi khám chuyên khoa.",
    "khó nuốt":
      "Khó nuốt có thể do viêm họng hoặc các vấn đề về thực quản. Nếu kéo dài, hãy tham khảo ý kiến bác sĩ.",
    "chảy nước mắt không ngừng":
      "Chảy nước mắt không ngừng có thể do kích ứng hoặc viêm nhiễm. Rửa mắt nhẹ nhàng và tránh chạm vào mắt.",
    "khó tập trung":
      "Khó tập trung có thể do căng thẳng hoặc thiếu ngủ. Nghỉ ngơi đầy đủ và thư giãn có thể giúp cải thiện.",
    "ngứa họng":
      "Ngứa họng có thể do dị ứng hoặc viêm họng. Uống nước ấm và tránh tiếp xúc với các chất gây dị ứng.",
    "đau bàn chân":
      "Đau bàn chân có thể do viêm gân hoặc căng cơ. Nghỉ ngơi và giãn cơ có thể giúp giảm đau.",
    "suy giảm trí nhớ":
      "Suy giảm trí nhớ có thể do căng thẳng hoặc thiếu ngủ. Giữ tâm lý thoải mái và bổ sung vitamin cho trí não.",
    "chảy máu chân răng":
      "Chảy máu chân răng có thể do viêm lợi hoặc thiếu vitamin. Vệ sinh răng miệng và ăn uống đủ chất.",
    "đau cơ":
      "Đau cơ có thể do tập luyện quá sức hoặc căng thẳng. Nghỉ ngơi và giãn cơ có thể giúp giảm đau.",
    "khó mở mắt vào buổi sáng":
      "Khó mở mắt vào buổi sáng có thể do khô mắt hoặc mỏi mắt. Uống nhiều nước và rửa mắt có thể giúp cải thiện.",
    "đau thái dương":
      "Đau thái dương có thể do căng thẳng hoặc viêm xoang. Nghỉ ngơi và thư giãn có thể giúp giảm triệu chứng.",
    "Đau ngực":
      "Đau ngực có thể do căng cơ hoặc vấn đề tim mạch. Nếu đau dữ dội hoặc khó thở, hãy đi khám ngay lập tức.",
    "Khó thở":
      "Khó thở có thể do căng thẳng, hen suyễn hoặc nhiễm trùng. Nghỉ ngơi và thở sâu, nếu kéo dài, nên gặp bác sĩ.",
    "nổi mẩn đỏ":
      "Nổi mẩn đỏ có thể do dị ứng hoặc viêm nhiễm. Tránh tiếp xúc với tác nhân gây dị ứng và theo dõi tình trạng.",
    "rát họng":
      "Rát họng có thể do viêm họng hoặc kích ứng. Uống nước ấm và tránh thức ăn cay, nếu kéo dài, nên đi khám.",
    "sốt nhẹ":
      "Sốt nhẹ có thể do nhiễm virus hoặc căng thẳng. Nghỉ ngơi và uống đủ nước, nếu sốt cao hoặc kéo dài, nên đi khám.",
    "sốt cao":
      "Sốt cao có thể là dấu hiệu nhiễm trùng. Hãy uống đủ nước, nghỉ ngơi, và đi khám nếu sốt không giảm.",
    "ho khan":
      "Ho khan có thể do cảm lạnh hoặc dị ứng. Uống nước ấm và tránh tiếp xúc với tác nhân gây dị ứng.",
    "run tay":
      "Run tay có thể do căng thẳng hoặc thiếu dinh dưỡng. Nếu triệu chứng kéo dài hoặc nặng thêm, hãy tham khảo bác sĩ.",
    "đau ngón tay":
      "Đau ngón tay có thể do chấn thương hoặc viêm khớp. Nghỉ ngơi và tránh sử dụng quá mức.",
    "đổ mồ hôi lạnh":
      "Đổ mồ hôi lạnh có thể do hạ đường huyết hoặc căng thẳng. Nếu lặp lại, bạn nên kiểm tra sức khỏe.",
    "khô môi":
      "Khô môi có thể do thiếu nước hoặc thời tiết khô. Uống nhiều nước và dùng kem dưỡng môi.",
    "buồn nôn":
      "Buồn nôn có thể do rối loạn tiêu hóa hoặc say tàu xe. Nghỉ ngơi và tránh thực phẩm dầu mỡ.",
    "ngủ gà":
      "Ngủ gà có thể do thiếu ngủ hoặc vấn đề thần kinh. Điều chỉnh lại giấc ngủ và nghỉ ngơi.",
    "Đau bụng dưới":
      "Đau bụng dưới có thể liên quan đến tiêu hóa hoặc phụ khoa. Nếu đau kéo dài, hãy đi khám bác sĩ.",
    "Đau lưng":
      "Đau lưng có thể do căng cơ hoặc tư thế sai. Nghỉ ngơi và điều chỉnh tư thế.",
    "rối loạn tiêu hóa":
      "Rối loạn tiêu hóa có thể do ăn uống không hợp lý hoặc căng thẳng. Ăn uống khoa học và giảm căng thẳng.",
    "Ngứa da":
      "Ngứa da có thể do dị ứng hoặc khô da. Tránh gãi và dùng kem dưỡng ẩm.",
    "Táo bón":
      "Táo bón có thể do thiếu chất xơ hoặc ít vận động. Bổ sung rau quả và uống đủ nước.",
    "đặt lịch khám":
      "Dạ, để đặt lịch đăng ký khám bệnh tại phòng khám Đà Nẵng - Đa Khoa Chất Lượng Cao, bạn có thể thực hiện theo các bước sau:\n\n " +
      "1. Điền thông tin cá nhân: Bạn cần cung cấp các thông tin như Họ tên, Năm Sinh, Số điện thoại, Địa chỉ, Ngày tới khám, và bất kỳ yêu cầu đặc biệt nào khác (nếu có).\n" +
      "2. Mời Bạn chọn đăng kí lịch khám nhanh bấm vào link đăng ký bên dưới: Bạn có thể đăng ký khám chữa bệnh qua đường link đã chọn.\n\nNếu bạn cần hỗ trợ thêm, vui lòng cho tôi biết!",
    "đặt lịch":
      "Dạ, để đặt lịch đăng ký khám bệnh tại phòng khám Đà Nẵng - Đa Khoa Chất Lượng Cao, bạn có thể thực hiện theo các bước sau:\n\n " +
      "1. Điền thông tin cá nhân: Bạn cần cung cấp các thông tin như Họ tên, Năm Sinh, Số điện thoại, Địa chỉ, Ngày tới khám, và bất kỳ yêu cầu đặc biệt nào khác (nếu có).\n" +
      "2. Mời Bạn chọn đăng kí lịch khám nhanh bấm vào link đăng ký bên dưới: Bạn có thể đăng ký khám chữa bệnh qua đường link đã chọn.\n\nNếu bạn cần hỗ trợ thêm, vui lòng cho tôi biết!",
    "đặt khám ngay":
      "Dạ, để đặt lịch đăng ký khám bệnh tại phòng khám Đà Nẵng - Đa Khoa Chất Lượng Cao, bạn có thể thực hiện theo các bước sau:\n\n " +
      "1. Điền thông tin cá nhân: Bạn cần cung cấp các thông tin như Họ tên, Năm Sinh, Số điện thoại, Địa chỉ, Ngày tới khám, và bất kỳ yêu cầu đặc biệt nào khác (nếu có).\n" +
      "2. Mời Bạn chọn đăng kí lịch khám nhanh bấm vào link đăng ký bên dưới: Bạn có thể đăng ký khám chữa bệnh qua đường link đã chọn.\n\nNếu bạn cần hỗ trợ thêm, vui lòng cho tôi biết!",
    "đặt khám nhanh":
      "Dạ, để đặt lịch đăng ký khám bệnh tại phòng khám Đà Nẵng - Đa Khoa Chất Lượng Cao, bạn có thể thực hiện theo các bước sau:\n\n " +
      "1. Điền thông tin cá nhân: Bạn cần cung cấp các thông tin như Họ tên, Năm Sinh, Số điện thoại, Địa chỉ, Ngày tới khám, và bất kỳ yêu cầu đặc biệt nào khác (nếu có).\n" +
      "2. Mời Bạn chọn đăng kí lịch khám nhanh bấm vào link đăng ký bên dưới: Bạn có thể đăng ký khám chữa bệnh qua đường link đã chọn.\n\nNếu bạn cần hỗ trợ thêm, vui lòng cho tôi biết!",
    "đặt khám":
      "Dạ, để đặt lịch đăng ký khám bệnh tại phòng khám Đà Nẵng - Đa Khoa Chất Lượng Cao, bạn có thể thực hiện theo các bước sau:\n\n " +
      "1. Điền thông tin cá nhân: Bạn cần cung cấp các thông tin như Họ tên, Năm Sinh, Số điện thoại, Địa chỉ, Ngày tới khám, và bất kỳ yêu cầu đặc biệt nào khác (nếu có).\n" +
      "2. Mời Bạn chọn đăng kí lịch khám nhanh bấm vào link đăng ký bên dưới: Bạn có thể đăng ký khám chữa bệnh qua đường link đã chọn.\n\nNếu bạn cần hỗ trợ thêm, vui lòng cho tôi biết!",
    "thời gian làm việc của phòng khám":
      "Dạ, thời gian làm việc của Bệnh viện Đà Nẵng - Đa Khoa Chất Lượng Cao như sau:" +
      "1. Thời gian làm việc mùa hè (từ 16 tháng 4 đến hết ngày 15 tháng 10):" +
      "Buổi sáng: từ 6h30 đến 11h00" +
      "Buổi chiều: từ 13h30 đến 17h00" +
      "2. Thời gian làm việc mùa đông (từ 16 tháng 10 đến hết ngày 15 tháng 4 năm tiếp theo):" +
      "Buổi sáng: từ 7h00 đến 11h30" +
      "Buổi chiều: từ 13h30 đến 17h00" +
      "Ngoài giờ hành chính, Bệnh viện vẫn tiếp đón bệnh nhân cấp cứu theo quy định của Bộ Y tế. Nếu bạn cần thêm thông tin, vui lòng cho tôi biết!",
    "thời gian làm việc":
      "Dạ, thời gian làm việc của Bệnh viện Đà Nẵng - Đa Khoa Chất Lượng Cao như sau:" +
      "1. Thời gian làm việc mùa hè (từ 16 tháng 4 đến hết ngày 15 tháng 10):" +
      "Buổi sáng: từ 6h30 đến 11h00" +
      "Buổi chiều: từ 13h30 đến 17h00" +
      "2. Thời gian làm việc mùa đông (từ 16 tháng 10 đến hết ngày 15 tháng 4 năm tiếp theo):" +
      "Buổi sáng: từ 7h00 đến 11h30" +
      "Buổi chiều: từ 13h30 đến 17h00" +
      "Ngoài giờ hành chính, Bệnh viện vẫn tiếp đón bệnh nhân cấp cứu theo quy định của Bộ Y tế. Nếu bạn cần thêm thông tin, vui lòng cho tôi biết!",
    "giờ làm việc":
      "Dạ, thời gian làm việc của Bệnh viện Đà Nẵng - Đa Khoa Chất Lượng Cao như sau:" +
      "1. Thời gian làm việc mùa hè (từ 16 tháng 4 đến hết ngày 15 tháng 10):" +
      "Buổi sáng: từ 6h30 đến 11h00" +
      "Buổi chiều: từ 13h30 đến 17h00" +
      "2. Thời gian làm việc mùa đông (từ 16 tháng 10 đến hết ngày 15 tháng 4 năm tiếp theo):" +
      "Buổi sáng: từ 7h00 đến 11h30" +
      "Buổi chiều: từ 13h30 đến 17h00" +
      "Ngoài giờ hành chính, Bệnh viện vẫn tiếp đón bệnh nhân cấp cứu theo quy định của Bộ Y tế. Nếu bạn cần thêm thông tin, vui lòng cho tôi biết!",
  };

  for (const key in responses) {
    if (inputLower.includes(key)) {
      return responses[key];
    }
  }

  return "Tôi chưa nhận diện được triệu chứng này. Bạn có thể mô tả rõ hơn hoặc liên hệ tới số điện thoại 0356241423. Để được hỗ trợ nhanh nhất";
}

export default analyzeInput;
