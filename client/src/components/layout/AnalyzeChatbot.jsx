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
  if (/^\s*\d+\s*[+\-*/]\s*\d+\s*$/.test(inputLower)) {
    return calculate(inputLower);
  }
  const responses = {
    "đau đầu":
      "Dạ, nếu bạn bị đau đầu, có một số cách bạn có thể thực hiện để giảm cơn đau:" +
      "1. Nghỉ ngơi: Tìm một nơi yên tĩnh để thư giãn. Chỉ cần nằm nghỉ ngơi trong vài phút có thể giúp giảm đau." +
      "2. Thư giãn: Thực hiện các bài tập hít thở sâu hoặc ngồi thiền có thể giảm căng thẳng, giúp giảm đau đầu." +
      "3. Uống nước: Đảm bảo uống đủ nước. Mất nước có thể là nguyên nhân gây đau đầu." +
      "4. Áp dụng lạnh hoặc nóng: Dùng túi đá hoặc khăn ấm chườm lên đầu có thể giúp giảm đau." +
      "5. Thuốc giảm đau: Bạn có thể sử dụng thuốc giảm đau như paracetamol, nhưng nhớ tham khảo ý kiến bác sĩ nếu có tình trạng sức khỏe khác.\n\n" +
      "6. Theo dõi triệu chứng: Nếu đau đầu kèm các triệu chứng khác như buồn nôn hoặc mờ mắt, hãy đi khám để được tư vấn thêm.\n\n" +
      "Nếu cơn đau đầu kéo dài hoặc trở nên nghiêm trọng, bạn nên đến gặp bác sĩ để được điều trị đúng cách và an toàn.\n\n",
    "đau bụng":
      "Dạ, nếu bạn bị đau bụng, có thể thử:\n\n" +
      "1. Theo dõi triệu chứng: Ghi lại vị trí, mức độ và các triệu chứng kèm theo.\n\n" +
      "2. Nghỉ ngơi: Hạn chế hoạt động nặng và nghỉ ngơi tại nhà.\n\n" +
      "3. Ăn uống hợp lý: Tránh thực phẩm nhiều dầu mỡ; uống nước gừng hoặc trà nóng.\n\n" +
      "4. Chườm nóng: Đặt túi chườm hoặc khăn ấm lên bụng để giảm đau.\n\n" +
      "5. Thuốc giảm đau: Dùng paracetamol nếu cần, nhưng nên hỏi ý kiến bác sĩ.\n\n" +
      "6. Đi khám: Nếu đau bụng nghiêm trọng hoặc kèm theo sốt, nôn, hãy đến bác sĩ để được chẩn đoán và điều trị kịp thời.\n\n",
    "mệt mỏi":
      "Dạ, nếu bạn cảm thấy mệt mỏi, hãy thử:\n\n" +
      "1. Ngủ đủ giấc: 7-8 giờ mỗi đêm giúp bạn giảm mệt mỏi.\n\n" +
      "2. Ăn uống lành mạnh: Ăn nhiều trái cây, rau xanh và tránh đồ ngọt.\n\n" +
      "3. Vận động nhẹ: Đi bộ hoặc yoga giúp tăng năng lượng.\n\n" +
      "4. Thư giãn: Thực hành hít thở sâu, thiền để giảm căng thẳng.\n\n" +
      "5. Khám sức khỏe: Nếu mệt mỏi kéo dài, hãy gặp bác sĩ.\n\n" +
      "Nếu tình trạng không cải thiện, bạn nên đến bác sĩ để được tư vấn chi tiết.\n\n",
    "đau khớp":
      "Dạ, nếu bạn bị đau khớp, có thể tham khảo một số cách giảm đau dưới đây:\n\n" +
      "1. Nghỉ ngơi: Hạn chế vận động mạnh để không làm tình trạng đau tệ hơn.\n\n" +
      "2. Chườm lạnh hoặc nóng: Chườm lạnh giảm sưng, chườm nóng giúp thư giãn cơ và tăng lưu thông máu.\n\n" +
      "3. Tập luyện nhẹ: Duy trì các bài tập nhẹ như đi bộ, bơi lội hoặc yoga để khớp linh hoạt hơn.\n\n" +
      "4. Dùng thuốc giảm đau: Có thể dùng paracetamol hoặc ibuprofen, nhưng hãy hỏi ý kiến bác sĩ.\n\n" +
      "5. Ăn uống lành mạnh: Bổ sung omega-3 từ cá, hạt, và rau xanh giúp giảm viêm.\n\n" +
      "6. Điều trị y tế: Nếu đau kéo dài hoặc nặng hơn, nên gặp bác sĩ để có phương pháp điều trị thích hợp.\n\n" +
      "7. Kiểm tra định kỳ: Nếu có bệnh khớp, hãy thăm khám thường xuyên để theo dõi tình trạng.\n\n",
    "đau tai":
      "Dạ, đau tai có thể do nhiều nguyên nhân và cách giảm đau sẽ phụ thuộc vào nguyên nhân cụ thể:\n\n" +
      "Nguyên nhân:\n" +
      "1. Viêm tai giữa: Do nhiễm virus hoặc vi khuẩn, thường kèm sốt, giảm thính lực.\n" +
      "2. Viêm ống tai ngoài: Do nhiễm trùng, dị ứng, có thể gây ngứa, ù tai.\n" +
      "3. Thay đổi áp suất: Đi máy bay hoặc lặn có thể làm đau tai do áp lực.\n" +
      "4. Chấn thương: Chấn thương vùng tai hoặc đầu.\n\n" +
      "Cách điều trị:\n" +
      "1. Thuốc giảm đau: Dùng paracetamol hoặc ibuprofen để giảm đau.\n" +
      "2. Kháng sinh: Nếu có nhiễm trùng, hãy theo đơn bác sĩ.\n" +
      "3. Sát khuẩn: Với viêm ống tai ngoài, vệ sinh và bôi thuốc mỡ kháng sinh.\n" +
      "4. Giảm áp lực: Nuốt hoặc nhai kẹo cao su để giảm áp lực tai.\n\n" +
      "Phòng ngừa:\n" +
      "- Tránh dùng tăm bông để vệ sinh tai.\n" +
      "- Hạn chế nước vào tai khi tắm, bơi.\n" +
      "- Sử dụng nút tai khi ở nơi ồn ào.\n\n" +
      "Nếu đau kéo dài, nên gặp bác sĩ để kiểm tra và điều trị kịp thời.\n",
    "đau răng":
      "Dạ, đau răng có thể do nhiều nguyên nhân khác nhau. Dưới đây là thông tin về nguyên nhân và cách giảm đau:\n\n" +
      "Nguyên nhân:\n" +
      "1. Sâu răng: Do vi khuẩn tạo axit làm hư men răng.\n" +
      "2. Viêm lợi: Gây đau và có thể chảy máu lợi.\n" +
      "3. Nhiễm trùng tủy răng: Đau dữ dội nếu sâu răng không được điều trị.\n" +
      "4. Răng khôn mọc: Có thể gây đau khi không đủ không gian.\n" +
      "5. Chấn thương: Gãy hoặc rạn răng do va chạm.\n\n" +
      "Triệu chứng:\n" +
      "- Đau khi nhai, đau lan đến hàm, tai, đầu.\n" +
      "- Sưng lợi, hơi thở có mùi hôi.\n\n" +
      "Cách điều trị:\n" +
      "1. Khám nha sĩ để xác định nguyên nhân.\n" +
      "2. Thuốc giảm đau: Dùng paracetamol hoặc ibuprofen.\n" +
      "3. Điều trị nguyên nhân: Trám, điều trị tủy nếu cần.\n" +
      "4. Chăm sóc tại nhà: Súc miệng nước muối, tránh thực phẩm gây kích thích.\n\n" +
      "Phòng ngừa:\n" +
      "- Đánh răng 2 lần/ngày và dùng chỉ nha khoa.\n" +
      "- Khám nha sĩ định kỳ.\n" +
      "- Hạn chế thực phẩm nhiều đường.\n\n" +
      "Nếu cơn đau kéo dài, nên gặp nha sĩ để tránh biến chứng.\n",
    ho:
      "Dạ, ho là một phản xạ tự nhiên của cơ thể giúp loại bỏ các tác nhân gây hại khỏi đường hô hấp. Tuy nhiên, ho có thể do nhiều nguyên nhân khác nhau. Dưới đây là các thông tin chi tiết:\n\n" +
      "Nguyên nhân gây ho:\n" +
      "1. Nhiễm trùng đường hô hấp:\n" +
      "   - Cảm lạnh hoặc cúm: Virus gây cảm lạnh và cúm có thể gây ho kèm theo sốt, đau họng và nhức người.\n" +
      "   - Viêm phổi: Nhiễm trùng phổi nặng cũng có thể dẫn đến ho kéo dài.\n" +
      "2. Dị ứng:\n" +
      "   - Phản ứng với phấn hoa, bụi hoặc nấm mốc có thể gây viêm và ho.\n" +
      "3. Hen suyễn:\n" +
      "   - Tình trạng bệnh lý mãn tính này có thể gây ho, đặc biệt khi tiếp xúc với các tác nhân kích thích.\n" +
      "4. Trào ngược dạ dày thực quản (GERD):\n" +
      "   - Dịch vị dạ dày trào ngược lên thực quản gây kích thích cổ họng và ho.\n" +
      "5. Khói thuốc và ô nhiễm:\n" +
      "   - Khói thuốc và các chất ô nhiễm có thể kích thích đường hô hấp.\n\n" +
      "Triệu chứng đi kèm:\n" +
      "- Ho khan hoặc ho có đờm.\n" +
      "- Khó thở hoặc cảm giác nặng ở ngực.\n" +
      "- Cơn ho có thể kéo dài và tệ hơn vào ban đêm.\n\n" +
      "Cách điều trị:\n" +
      "1. Điều trị tại nhà:\n" +
      "   - Uống nhiều nước để giữ ẩm cổ họng và giảm kích ứng.\n" +
      "   - Sử dụng viên ngậm hoặc thuốc ho để làm dịu cổ họng.\n" +
      "2. Thuốc kháng histamin:\n" +
      "   - Nếu ho do dị ứng, thuốc kháng histamin có thể giúp giảm triệu chứng.\n" +
      "3. Kháng sinh:\n" +
      "   - Nếu ho do nhiễm trùng vi khuẩn, bác sĩ có thể kê kháng sinh.\n" +
      "4. Thuốc điều trị hen suyễn:\n" +
      "   - Dùng inhaler hoặc thuốc theo chỉ định của bác sĩ nếu ho do hen suyễn.\n\n" +
      "Khi nào cần gặp bác sĩ:\n" +
      "- Nếu ho kéo dài hơn 3 tuần.\n" +
      "- Ho kèm theo triệu chứng nghiêm trọng như khó thở, sốt cao, ho có máu.\n" +
      "- Nếu bạn nghi ngờ ho do vấn đề y tế nghiêm trọng.\n\n" +
      "Hy vọng thông tin này sẽ giúp bạn hiểu rõ hơn về nguyên nhân và cách điều trị ho. Nếu có thêm câu hỏi, hãy liên hệ với tôi nhé!",
    cảm:
      "Dạ, cảm cúm là bệnh lý phổ biến, đặc biệt vào mùa lạnh, do virus cúm hoặc cảm lạnh gây ra. Dưới đây là thông tin chi tiết:\n\n" +
      "Nguyên nhân:\n" +
      "- Virus cúm (A, B, C, D) là nguyên nhân chính gây ra cảm cúm hàng năm.\n" +
      "- Virus cảm lạnh thông thường cũng có thể gây triệu chứng tương tự nhưng nhẹ hơn.\n\n" +
      "Triệu chứng:\n" +
      "- Sốt nhẹ hoặc sốt cao.\n" +
      "- Đau đầu, đau họng, và đau nhức toàn thân.\n" +
      "- Ho khan, nghẹt mũi hoặc chảy nước mũi.\n" +
      "- Mệt mỏi, khó chịu và có thể kèm theo triệu chứng tiêu hóa như nôn hoặc tiêu chảy.\n\n" +
      "Cách điều trị:\n" +
      "1. Nghỉ ngơi để cơ thể phục hồi.\n" +
      "2. Uống nhiều nước để giữ cơ thể đủ nước và giảm triệu chứng.\n" +
      "3. Thuốc giảm đau và hạ sốt: Paracetamol hoặc ibuprofen.\n" +
      "4. Thuốc ho và nhỏ mũi để giảm triệu chứng.\n\n" +
      "Phòng ngừa:\n" +
      "- Tiêm vaccine cúm hàng năm.\n" +
      "- Rửa tay thường xuyên để tránh lây nhiễm.\n" +
      "- Tránh tiếp xúc gần gũi với người bệnh.\n" +
      "- Duy trì chế độ ăn uống lành mạnh và tập thể dục để tăng cường sức đề kháng.\n\n" +
      "Khi nào cần gặp bác sĩ:\n" +
      "- Nếu triệu chứng nghiêm trọng hoặc kéo dài hơn một tuần.\n" +
      "- Khó thở, đau ngực hoặc triệu chứng bất thường.\n\n" +
      "Hy vọng thông tin này sẽ giúp ích cho bạn trong việc phòng ngừa và điều trị cảm cúm. Nếu có thắc mắc thêm, hãy liên hệ với tôi nhé!",
    "đau cổ":
      "Dạ, đau cổ là triệu chứng phổ biến và có thể do nhiều nguyên nhân khác nhau, từ căng cơ đến các tình trạng nghiêm trọng hơn. Dưới đây là các thông tin chi tiết:\n\n" +
      "Nguyên nhân gây đau cổ:\n" +
      "1. Căng cơ và căng thẳng:\n" +
      "   - Thường do tư thế xấu khi ngồi, nằm hoặc hoạt động, dẫn đến căng thẳng vào các cơ vùng cổ.\n" +
      "2. Chấn thương:\n" +
      "   - Tai nạn, va chạm hoặc ngã có thể gây đau cổ do tổn thương cấu trúc cổ hoặc đốt sống.\n" +
      "3. Hội chứng đau cổ mãn tính:\n" +
      "   - Các bệnh lý mãn tính như thoái hóa đốt sống cổ hoặc thoát vị đĩa đệm có thể gây đau cổ kéo dài.\n" +
      "4. Khó chịu do tâm lý:\n" +
      "   - Căng thẳng tinh thần có thể biểu hiện dưới dạng đau cổ.\n\n" +
      "Triệu chứng đi kèm:\n" +
      "- Đau, cứng cổ: Cảm giác đau nhức hoặc cứng ở vùng cổ, có thể hạn chế xoay cổ.\n" +
      "- Đau lan ra vai hoặc lưng: Đôi khi cơn đau có thể lan xuống vai hoặc lưng trên.\n" +
      "- Đau kèm theo triệu chứng khác: Có thể có đau đầu, tê hoặc yếu ở tay.\n\n" +
      "Cách điều trị:\n" +
      "1. Nghỉ ngơi và giảm căng thẳng:\n" +
      "   - Hạn chế các hoạt động gây đau.\n" +
      "2. Chườm nóng/lạnh:\n" +
      "   - Áp dụng nhiệt độ nóng hoặc lạnh lên vùng đau để giảm đau và viêm.\n" +
      "3. Bài tập và vật lý trị liệu:\n" +
      "   - Thực hiện bài tập nhẹ nhàng cho cổ và vai theo chỉ định của chuyên gia.\n" +
      "4. Thuốc giảm đau:\n" +
      "   - Sử dụng paracetamol hoặc ibuprofen để giảm đau.\n\n" +
      "Khi nào cần gặp bác sĩ:\n" +
      "- Nếu cơn đau kéo dài hơn một tuần mà không giảm.\n" +
      "- Nếu có triệu chứng nghiêm trọng như tê hoặc yếu tay, khó cử động cổ, hoặc sốt cao.\n\n" +
      "Hy vọng thông tin trên sẽ giúp bạn hiểu rõ hơn về tình trạng đau cổ và các phương pháp điều trị. Nếu có thêm câu hỏi, đừng ngần ngại liên hệ với tôi nhé!",
    "dị ứng":
      "Dạ, dị ứng là phản ứng quá mức của hệ miễn dịch với chất lạ mà cơ thể thường không gây hại, như phấn hoa, thực phẩm, thuốc, hoặc vật nuôi. Sau đây là thông tin chi tiết về dị ứng:\n\n" +
      "Nguyên nhân gây dị ứng:\n" +
      "- Thực phẩm: Các loại thực phẩm như đậu phộng, hạt điều, trứng, sữa, cá, và lúa mì có thể gây dị ứng.\n" +
      "- Phấn hoa: Cỏ, cây, và hoa có thể phát tán phấn hoa vào không khí, gây dị ứng mùa.\n" +
      "- Vật nuôi: Lông thú cưng, nước tiểu, hoặc nước bọt của động vật có thể gây dị ứng.\n" +
      "- Thuốc: Một số loại thuốc như kháng sinh hoặc aspirin có thể gây dị ứng.\n" +
      "- Côn trùng: Ong, muỗi, hoặc kiến có thể gây dị ứng qua vết đốt.\n\n" +
      "Triệu chứng của dị ứng:\n" +
      "- Dị ứng nhẹ: Ngứa, phát ban, đỏ da, hắt hơi, sổ mũi.\n" +
      "- Dị ứng nặng (phản ứng phản vệ): Khó thở, sưng mặt, môi, hoặc họng, nhịp tim nhanh, choáng váng hoặc mất ý thức. Đây là tình trạng khẩn cấp cần điều trị ngay lập tức.\n\n" +
      "Cách điều trị:\n" +
      "1. Tránh xa chất gây dị ứng: Xác định và tránh các yếu tố gây dị ứng.\n" +
      "2. Sử dụng thuốc:\n" +
      "   - Kháng histamin giúp giảm ngứa và sổ mũi.\n" +
      "   - Thuốc chống viêm giúp giảm viêm và khó chịu.\n" +
      "   - Epinephrine: Trong trường hợp phản ứng nặng, tiêm epinephrine có thể cứu sống.\n" +
      "3. Liệu pháp miễn dịch: Đối với một số loại dị ứng, liệu pháp miễn dịch có thể giúp giảm độ nhạy cảm đối với chất gây dị ứng.\n\n" +
      "Phòng ngừa:\n" +
      "- Xác định và ghi nhớ các chất gây dị ứng: Thực hiện ghi chú về món ăn hoặc môi trường sống để nhận thức về các chất có thể gây dị ứng.\n" +
      "- Mang theo thuốc: Người có tiền sử dị ứng nặng cần mang theo epinephrine trong trường hợp khẩn cấp.\n" +
      "- Tiêm vaccine chống dị ứng: Là lựa chọn hữu ích cho người có triệu chứng dị ứng nghiêm trọng.\n\n" +
      "Nếu bạn có thêm câu hỏi hoặc cần thông tin chi tiết về loại dị ứng nào, hãy cho tôi biết nhé!",
    "bác sĩ":
      "Mời bạn chọn bác sĩ hoặc đặt lịch khám nhanh để được hỗ trợ trực tiếp từ bác sĩ",
    "đau lưng":
      "(Dạ, đau lưng là một triệu chứng khá phổ biến và có thể do nhiều nguyên nhân khác nhau. Một số nguyên nhân thường gặp có thể bao gồm:" +
      "1. Căng cơ hoặc chấn thương: Do vận động quá sức hoặc thực hiện các động tác sai tư thế." +
      "2. Thay đổi cấu trúc cột sống: Như thoát vị đĩa đệm, thoái hóa hoặc sai lệch đốt sống." +
      "3. Bệnh lý về nội tạng: Đôi khi, đau lưng có thể liên quan đến các bệnh như bệnh thận hoặc bệnh phụ khoa ở nữ giới." +
      "4. Tư thế: Ngồi hoặc đứng không đúng tư thế trong thời gian dài có thể gây ra đau lưng." +
      "5. Stress và căng thẳng: Tình trạng thần kinh căng thẳng cũng có thể góp phần vào cảm giác đau lưng." +
      "Nếu cơn đau kéo dài, ngày càng nghiêm trọng hoặc đi kèm với triệu chứng khác như khó thở, tê cứng tay chân, bạn nên tìm gặp bác sĩ để khám và chẩn đoán rõ hơn. Bác sĩ có thể yêu cầu các xét nghiệm hoặc chẩn đoán hình ảnh để xác định nguyên nhân chính xác và đưa ra phương pháp điều trị phù hợp." +
      "Ngoài ra, việc nghỉ ngơi hợp lý, tập thể dục đều đặn và giữ tư thế đúng cũng giúp giảm bớt triệu chứng đau lưng. Dạ, bạn nhớ chú ý chăm sóc bản thân và theo dõi tình trạng sức khỏe nhé!)",
    "đau ngực":
      "(Dạ, đau ngực là một triệu chứng cần được chú ý vì nó có thể liên quan đến nhiều vấn đề sức khỏe khác nhau, từ những điều không nghiêm trọng đến những bệnh lý nghiêm trọng như bệnh tim. Để hiểu rõ hơn về đau ngực, chúng ta có thể phân loại và xem xét một số nguyên nhân như sau:" +
      "1. Cơn đau thắt ngực: Thường do bệnh tim thiếu máu cục bộ mạn tính. Cơn đau này có thể xảy ra sau khi gắng sức hoặc khi có căng thẳng cảm xúc. Đau thường cảm nhận ở vùng sau xương ức, có thể lan ra cổ, vai, tay, và lưng. Khó thở, mệt mỏi, và các triệu chứng như buồn nôn hoặc vã mồ hôi có thể đi kèm. Thời gian cơn đau thường kéo dài từ vài phút đến 30 phút." +
      "2. Các nguyên nhân khác:" +
      "   - Bệnh lý phổi: Như viêm phổi hoặc thuyên tắc phổi có thể gây đau ngực." +
      "   - Vấn đề tiêu hóa: Như trào ngược dạ dày thực quản (GERD) có thể gây cảm giác đau và nóng rát trong ngực." +
      "   - Căng cơ hoặc chấn thương: Có thể gây đau ngực do chấn thương vùng ngực hoặc căng cơ do hoạt động." +
      "   - Stress hoặc lo âu: Kiểu đau này có thể làm bệnh nhân cảm thấy áp lực và khó thở." +
      "Nếu bạn gặp triệu chứng đau ngực kéo dài, kèm theo khó thở, mệt mỏi, hoặc các triệu chứng khác nghiêm trọng hơn như đổ mồ hôi lạnh, chóng mặt, bạn nên tìm đến bác sĩ ngay lập tức để được khám và chẩn đoán chính xác. Một cuộc kiểm tra bệnh lý phù hợp sẽ giúp định nghĩa nguyên nhân và có biện pháp điều trị thích hợp cho bạn.)",
    "chóng mặt":
      "(Dạ, chóng mặt là cảm giác mất cân bằng hoặc xoay chuyển có thể xảy ra trong nhiều tình huống khác nhau. Đây là một triệu chứng mà nhiều người gặp phải trong cuộc sống hàng ngày và có thể do nhiều nguyên nhân khác nhau, như:" +
      "1. Rối loạn tai trong: Tai trong giữ vai trò quan trọng trong việc duy trì cân bằng. Các vấn đề như viêm tai trong (labyrinthitis), bệnh Meniere hay chóng mặt tư thế kịch phát lành tính (BPPV) có thể gây ra triệu chứng chóng mặt." +
      "2. Huyết áp thấp: Huyết áp giảm đột ngột khi thay đổi tư thế, như đứng dậy nhanh chóng, có thể dẫn đến chóng mặt." +
      "3. Thiếu oxy: Khi cơ thể không nhận đủ oxy, ví dụ do ở trong môi trường ngột ngạt hoặc khi tập thể dục quá sức, bạn có thể cảm thấy chóng mặt." +
      "4. Mất nước hoặc thiếu dinh dưỡng: Không uống đủ nước hoặc không cung cấp đủ chất dinh dưỡng cho cơ thể cũng có thể gây ra cảm giác chóng mặt." +
      "5. Căng thẳng và lo âu: Áp lực tâm lý có thể dẫn đến cảm giác chóng mặt hoặc mất cân bằng." +
      "6. Một số loại thuốc: Một số loại thuốc có thể có tác dụng phụ là chóng mặt hoặc buồn nôn." +
      "Nếu bạn cảm thấy chóng mặt kéo dài hoặc kèm theo các triệu chứng nghiêm trọng khác như đau ngực, khó thở, hoặc mờ mắt, bạn nên tìm gặp bác sĩ để được khám và chẩn đoán. Bác sĩ có thể yêu cầu các xét nghiệm hoặc kiểm tra để xác định nguyên nhân chính xác và đưa ra các giải pháp điều trị hợp lý." +
      "Hãy chăm sóc sức khỏe của bạn và theo dõi các triệu chứng nhé!)",
    "khó thở":
      "(Dạ, khó thở là một triệu chứng mà nhiều người có thể gặp phải, và nó có thể xuất phát từ nhiều nguyên nhân khác nhau. Đây là một tình trạng hết sức nghiêm trọng và cần được điều tra kỹ lưỡng. Dưới đây là một số nguyên nhân phổ biến gây ra khó thở:" +
      "1. Bệnh về hệ hô hấp:" +
      "   - Hen suyễn: Làm hẹp đường hô hấp, gây khó thở, thở khò khè và ho." +
      "   - Viêm phổi: Có thể gây ra khó thở kèm theo sốt, ho và đau ngực." +
      "   - Bệnh phổi tắc nghẽn mạn tính (COPD): Là tình trạng mạn tính ảnh hưởng đến khả năng thở." +
      "2. Vấn đề về tim mạch:" +
      "   - Suy tim: Khi tim không đủ mạnh để bơm máu, có thể gây tích tụ dịch trong phổi, gây khó thở." +
      "   - Đau thắt ngực: Có thể gây cảm giác khó thở khi cơ tim không nhận đủ máu." +
      "3. Rối loạn tâm lý:" +
      "   - Căng thẳng và lo âu: Bệnh nhân có thể cảm thấy khó thở trong các tình huống căng thẳng hoặc lo âu thái quá." +
      "4. Các vấn đề khác:" +
      "   - Trào ngược dạ dày thực quản (GERD): Có thể gây khó thở do acid dạ dày tràn vào thực quản và gây kích thích." +
      "   - Béo phì: Tình trạng thừa cân có thể làm hạn chế khả năng hô hấp." +
      "Nếu bạn hoặc ai đó cảm thấy khó thở bất ngờ và nghiêm trọng, kèm theo các triệu chứng như đau ngực, chóng mặt, hoặc mờ mắt, hãy tìm kiếm sự trợ giúp y tế ngay lập tức. Việc khám và chẩn đoán kịp thời là rất quan trọng để xác định nguyên nhân và có biện pháp điều trị phù hợp." +
      "Hãy chăm sóc sức khỏe của bạn và nếu có bất kỳ nghi ngờ nào về tình trạng sức khỏe, hãy đi khám bác sĩ ngay.)",
    "ngứa da":
      "(Dạ, ngứa da là một triệu chứng rất phổ biến mà có thể gây khó chịu và ảnh hưởng đến chất lượng cuộc sống của người mắc phải. Ngứa da có thể xuất hiện do nhiều nguyên nhân khác nhau, bao gồm:" +
      "1.  Tình trạng da : Các bệnh về da như eczema (viêm da dị ứng), bệnh vẩy nến, viêm da tiếp xúc hoặc mề đay có thể gây ra ngứa." +
      "2.  Dị ứng : Một số người có thể bị ngứa do dị ứng với các chất như polen, bụi, thức ăn, hoặc phấn hoa. Dị ứng với thuốc cũng có thể là nguyên nhân." +
      "3.  Nhiễm trùng : Các tình trạng nhiễm trùng da do vi khuẩn, virus hoặc nấm, như nấm da hay herpes, có thể gây ngứa." +
      "4.  Vấn đề trong cơ thể : Các bệnh lý như bệnh gan, bệnh thận, hoặc rối loạn tuyến giáp có thể gây ra ngứa da. Nghĩa là, ngứa da không phải lúc nào cũng chỉ là một vấn đề tại chỗ, mà có thể là dấu hiệu của các bệnh bên trong." +
      "5.  Mồ hôi và nóng : Mồ hôi quá nhiều hoặc khi trời nóng có thể kích thích da và gây ra cảm giác ngứa." +
      "6.  Sự thay đổi thời tiết : Thời tiết lạnh hoặc khô có thể làm khô da và dẫn đến ngứa." +
      "Khi gặp phải tình trạng ngứa da kéo dài hoặc kèm theo các triệu chứng khác như phát ban, sưng, đau hoặc cảm giác bất thường, bạn nên tìm kiếm sự tư vấn từ bác sĩ hoặc chuyên gia về da liễu để được hướng dẫn và điều trị kịp thời." +
      "Hãy chăm sóc sức khỏe của bạn và theo dõi các triệu chứng của cơ thể!)",
    "đau chân":
      "(Dạ, đau chân là một triệu chứng phổ biến và có thể xảy ra vì nhiều lý do khác nhau. Dưới đây là một số nguyên nhân thường gặp gây đau chân:" +
      "1.  Chấn thương : Đau có thể do chấn thương cấp tính như trật khớp, gãy xương hay các vết thương khác trong khi chơi thể thao hoặc hoạt động mạnh." +
      "2.  Vấn đề về tuần hoàn : Thiếu máu do tắc nghẽn động mạch có thể dẫn đến đau chân, thường được gọi là đau chân cách hồi. Triệu chứng là cảm giác đau khi đi bộ hoặc hoạt động, nhưng giảm bớt khi nghỉ ngơi." +
      "3.  Bệnh lý cơ xương khớp : Các tình trạng như viêm khớp, thoát vị đĩa đệm, hoặc viêm gân có thể gây ra đau nhức và khó chịu ở chân." +
      "4.  Bệnh thần kinh : Các bệnh lý liên quan đến dây thần kinh như bệnh tiểu đường có thể gây ra đau chân do tổn thương thần kinh ngoại vi." +
      "5.  Căng cơ hoặc chuột rút : Cảm giác đau có thể xảy ra khi cơ chân bị căng hoặc co rút không tự ý, thường do vận động quá sức hoặc thiếu nước." +
      "6.  Tình trạng mạch máu : Các vấn đề liên quan đến tĩnh mạch, như suy tĩnh mạch hay huyết khối tĩnh mạch sâu, cũng có thể gây đau chân." +
      "Nếu bạn gặp phải cơn đau chân kéo dài, dữ dội, hoặc kèm theo các triệu chứng khác như sưng, tê rần hoặc yếu cơ, nên tìm kiếm sự tư vấn từ bác sĩ hoặc chuyên gia y tế để có chẩn đoán chính xác và biện pháp điều trị hợp lý." +
      "Chú ý rằng các yếu tố như tuổi tác, tiền sử bệnh lý và tình hình sức khỏe hiện tại cũng rất quan trọng trong việc xác định nguyên nhân của cơn đau." +
      "Hãy chú ý đến sức khỏe của bạn và nếu có bất cứ điều gì đáng ngờ, hãy đến gặp bác sĩ để được hướng dẫn kịp thời!)",
    "đau mắt":
      "(Dạ, đau mắt có thể là một triệu chứng gây khó chịu và có thể xuất phát từ nhiều nguyên nhân khác nhau. Dưới đây là một số nguyên nhân phổ biến gây ra tình trạng đau mắt:" +
      "1.  Viêm kết mạc : Còn được gọi là viêm màng kết, viêm kết mạc có thể do nhiễm trùng, dị ứng hoặc kích ứng. Triệu chứng thường thấy bao gồm đỏ mắt, ngứa và có thể tiết dịch." +
      "2.  Khô mắt : Thiếu nước mắt có thể dẫn đến cảm giác khô rát, ngứa hoặc cảm giác như có cát trong mắt." +
      "3.  Đau mắt do chấn thương : Các chấn thương từ vật thể lạ hay tai nạn có thể gây ra đau nhức và cần được chẩn đoán kịp thời." +
      "4.  Nhiễm trùng : Nhiễm trùng như viêm giác mạc, viêm lộ tuyến, hoặc các vấn đề do virus (như herpes) cũng có thể gây đau mắt." +
      "5.  Tật khúc xạ : Ngoài ra, các vấn đề về thị lực như cận thị, viễn thị hoặc loạn thị cũng có thể dẫn đến đau mắt, đặc biệt khi mắt phải căng thẳng để điều chỉnh." +
      "6.  Bệnh lý liên quan đến mắt : Các bệnh lý khác như glaucoma (tăng nhãn áp) có thể tạo ra đau nhức, đi kèm với cảm giác buốt hoặc nhức đầu." +
      "7.  Ánh sáng mạnh : Tiếp xúc lâu với ánh sáng mạnh hoặc ánh nắng có thể làm mắt cảm thấy khó chịu hoặc đau." +
      "Nếu bạn gặp tình trạng đau mắt kéo dài hoặc dữ dội, kèm theo các triệu chứng như nhìn mờ, nhạy cảm với ánh sáng, sưng tấy hoặc tiết dịch ở mắt, bạn nên đến gặp bác sĩ hoặc chuyên gia về mắt để được chẩn đoán và điều trị kịp thời." +
      "Hãy bảo vệ đôi mắt của bạn và theo dõi sức khỏe của mình!)",
    "tiêu chảy":
      "(Dạ, tiêu chảy là tình trạng đi tiêu nhiều lần trong ngày với phân lỏng, có thể kèm theo các triệu chứng khác như đau bụng, buồn nôn, hay sốt. Đây là một triệu chứng phổ biến và có thể xuất phát từ nhiều nguyên nhân khác nhau bao gồm:" +
      "1.    Nhiễm trùng   : Tiêu chảy thường do vi khuẩn, virus hoặc ký sinh trùng gây ra. Các tác nhân gây bệnh phổ biến bao gồm rotavirus, norovirus, và vi khuẩn như Salmonella, E. coli hoặc Campylobacter." +
      "2.    Nguyên nhân gây kích ứng ruột   : Các chất gây kích ứng như thực phẩm, thuốc (chẳng hạn như kháng sinh) hoặc dị ứng thực phẩm có thể dẫn đến tiêu chảy." +
      "3.    Bệnh lý đường tiêu hóa mãn tính   : Một số bệnh như viêm ruột (Crohn's disease hoặc bệnh viêm đại tràng - ulcerative colitis) có thể gây ra tiêu chảy mãn tính." +
      "4.    Các vấn đề về tiêu hóa   : Chất lượng thực phẩm, đặc biệt là ăn uống không vệ sinh hoặc tiêu thụ các thực phẩm có chứa hóa chất gây hại, có thể xuất hiện tiêu chảy." +
      "5.    Stress   : Căng thẳng tinh thần cũng có thể gây rối loạn chức năng tiêu hóa, dẫn đến tiêu chảy." +
      "   Triệu chứng đi kèm   : Ngoài tiêu chảy, bệnh nhân có thể có các triệu chứng như đau bụng, đầy hơi, buồn nôn, hoặc sốt. Trong một số trường hợp nghiêm trọng, tiêu chảy có thể đi kèm với mất nước, dẫn đến khô miệng, khát nước, chóng mặt hoặc yếu sức." +
      "   Điều trị   : Điều trị tiêu chảy phụ thuộc vào nguyên nhân. Điều quan trọng là giữ nước và điện giải bằng cách uống dung dịch điện giải phù hợp. Trong trường hợp tiêu chảy do nhiễm trùng, nó có thể tự khỏi mà không cần điều trị bằng thuốc kháng sinh. Tuy nhiên, nếu có triệu chứng kéo dài, sốt cao, hoặc mất nước nghiêm trọng, bạn nên đến gặp bác sĩ để được chẩn đoán và điều trị kịp thời." +
      "Dạ, nếu bạn cần thêm thông tin chi tiết hơn về các nguyên nhân hay phương pháp điều trị cụ thể, vui lòng cho tôi biết!)",
    "táo bón":
      "(Dạ, táo bón là một rối loạn tiêu hóa phổ biến, được định nghĩa là tình trạng đi đại tiện ít hơn bình thường (thường là dưới ba lần mỗi tuần) và có phân cứng, khô hoặc gây khó khăn khi đi tiêu. Đây là vấn đề có thể gây khó chịu và ảnh hưởng đến chất lượng cuộc sống. Dưới đây là một số nguyên nhân, triệu chứng và biện pháp khắc phục táo bón:" +
      "      Nguyên nhân gây táo bón\n" +
      "1.    Chế độ ăn uống   : Thiếu chất xơ trong chế độ ăn uống (từ trái cây, rau, ngũ cốc) có thể làm chậm quá trình tiêu hóa và đi tiêu.\n" +
      "2.    Thiếu nước   : Uống nước không đủ cũng dẫn đến việc cơ thể hấp thụ quá nhiều nước từ phân, làm chúng trở nên cứng và khó di chuyển.\n" +
      "3.    Vận động   : Thiếu hoạt động thể chất có thể làm chậm quá trình tiêu hóa.\n" +
      "4.    Thay đổi thói quen   : Thay đổi môi trường, như đi du lịch hoặc thay đổi thói quen sinh hoạt, cũng có thể ảnh hưởng đến thói quen đi tiêu.\n" +
      "5.    Thuốc   : Một số loại thuốc, như thuốc chống trầm cảm, thuốc giảm đau hoặc thuốc chống dị ứng, có thể gây táo bón như một tác dụng phụ.\n" +
      "6.    Bệnh lý   : Các bệnh về hệ tiêu hóa, như triệu chứng ruột kích thích, hoặc các bệnh lý khác liên quan đến hormone có thể là nguyên nhân.\n" +
      "      Triệu chứng\n" +
      "- Đi đại tiện ít hơn ba lần mỗi tuần.\n" +
      "- Phân cứng, khô hoặc bị tắc nghẽn.\n" +
      "- Cảm giác đau đớn hoặc khó chịu khi đi tiêu.\n" +
      "- Cảm giác bụng đầy hơi hoặc không thoải mái.\n" +
      "      Biện pháp khắc phục\n" +
      "1.    Tăng cường chất xơ   : Ăn nhiều rau xanh, trái cây, và ngũ cốc nguyên hạt để tăng lượng chất xơ trong chế độ ăn uống.\n" +
      "2.    Uống đủ nước   : Đảm bảo cung cấp đủ nước cho cơ thể.\n" +
      "3.    Tập thể dục   : Duy trì hoạt động thể chất đều đặn giúp kích thích ruột hoạt động tốt hơn.\n" +
      "4.    Thay đổi thói quen   : Thiết lập lịch đi đại tiện đều đặn và tránh kiểm soát việc đi tiêu.\n" +
      "5.    Tham khảo ý kiến bác sĩ   : Nếu tình trạng táo bón kéo dài hoặc nghiêm trọng, bạn nên đến gặp bác sĩ để được tư vấn và điều trị thích hợp." +
      "Nếu bạn có bất kỳ câu hỏi nào thêm hoặc cần thêm thông tin chi tiết, vui lòng cho tôi biết!)",
    "mất ngủ":
      "(Dạ, mất ngủ là tình trạng khó khăn trong việc đi vào giấc ngủ hoặc duy trì giấc ngủ, dẫn đến cảm giác không được nghỉ ngơi đầy đủ khi thức dậy. Mất ngủ có thể ảnh hưởng đến sức khỏe thể chất và tinh thần của bạn, khiến bạn gặp khó khăn trong việc tập trung, làm việc và thực hiện các hoạt động hàng ngày.\n" +
      "      Nguyên nhân gây mất ngủ\n" +
      "1.    Căng thẳng và lo âu   : Cảm xúc tiêu cực, căng thẳng trong công việc hoặc cuộc sống hàng ngày có thể làm bạn khó ngủ.\n" +
      "2.    Thói quen sinh hoạt   : Uống caffeine hoặc rượu, thiếu hoạt động thể chất, và không có lịch trình giấc ngủ cố định có thể gây mất ngủ.\n" +
      "3.    Bệnh lý   : Một số tình trạng sức khỏe như bệnh trầm cảm, rối loạn lo âu, đau mãn tính, hoặc bệnh lý như chứng ngưng thở khi ngủ cũng có thể dẫn đến mất ngủ.\n" +
      "4.    Thuốc   : Những loại thuốc như thuốc chống trầm cảm, thuốc cao huyết áp hay một số thuốc trị dị ứng có thể ảnh hưởng đến giấc ngủ.\n" +
      "5.    Môi trường ngủ   : Ánh sáng, tiếng ồn, hoặc điều kiện thời tiết không thoải mái cũng có thể làm bạn khó ngủ.\n" +
      "      Triệu chứng\n" +
      "- Khó khăn trong việc đi vào giấc ngủ.\n" +
      "- Thức dậy giữa đêm và gặp khó khăn trong việc quay lại giấc ngủ.\n" +
      "- Thức dậy quá sớm và không thể tiếp tục ngủ.\n" +
      "- Cảm thấy mệt mỏi hoặc không được nghỉ ngơi khi thức dậy.\n" +
      "      Biện pháp khắc phục\n" +
      "1.    Thay đổi lối sống   :\n" +
      "- Tạo lịch trình ngủ cố định bằng cách đi ngủ và thức dậy vào cùng một thời điểm mỗi ngày.\n" +
      "- Tăng cường vận động thể chất hàng ngày nhưng tránh tập luyện gắng sức gần giờ đi ngủ.\n" +
      "- Hạn chế caffeine và rượu, đặc biệt trong những giờ gần giờ ngủ.\n" +
      "2.    Tạo môi trường ngủ lý tưởng   :\n" +
      "- Đảm bảo phòng ngủ yên tĩnh, tối và thoải mái.\n" +
      "- Sử dụng gối và đệm thoải mái để hỗ trợ giấc ngủ tốt hơn.\n" +
      "3.    Giảm căng thẳng trước khi ngủ   :\n" +
      "- Thực hiện các hoạt động thư giãn như đọc sách, nghe nhạc nhẹ, hoặc thực hành thiền.\n" +
      "4.    Tham khảo ý kiến bác sĩ   : Nếu tình trạng mất ngủ kéo dài và ảnh hưởng nghiêm trọng tới chất lượng cuộc sống, bạn nên thảo luận với bác sĩ để tìm hiểu nguyên nhân và được tư vấn điều trị.\n" +
      "Nếu bạn cần thêm thông tin chi tiết hơn về một khía cạnh cụ thể nào đó liên quan đến mất ngủ, vui lòng cho tôi biết!)",
    "khó tiêu":
      "Dạ, khó tiêu là một triệu chứng thường gặp mà nhiều người có thể trải qua. Đây có thể là cảm giác không thoải mái hoặc đau ở vùng bụng trên, và có thể đi kèm với các triệu chứng như đầy bụng, ợ chua, buồn nôn hoặc chán ăn. Dưới đây là một số thông tin liên quan đến khó tiêu và cách xử lý tình trạng này:\n\n" +
      "Nguyên nhân gây ra khó tiêu:\n" +
      "1. Chế độ ăn uống không hợp lý: Tiêu thụ thức ăn khó tiêu, béo, gia vị cay hoặc uống rượu, cà phê.\n\n" +
      "2. Tiêu hóa kém: Khi thức ăn không được tiêu hóa đúng cách có thể gây cảm giác đầy bụng.\n\n" +
      "3. Lo âu hoặc căng thẳng: Tình trạng tâm lý cũng có thể gây ra khó tiêu.\n\n" +
      "4. Bệnh lý tiêu hóa: Các bệnh như loét dạ dày, trào ngược dạ dày thực quản (GERD) hoặc viêm dạ dày.\n\n" +
      "5. Sử dụng thuốc: Một số loại thuốc như NSAID và kháng sinh có thể gây khó tiêu.\n\n" +
      "Triệu chứng đi kèm:\n" +
      "- Đau hoặc khó chịu ở bụng trên.\n" +
      "- Cảm giác đầy bụng hoặc chướng bụng.\n" +
      "- Ợ nóng hoặc ợ chua.\n" +
      "- Buồn nôn hoặc cảm giác nôn.\n\n" +
      "Cách xử lý khi gặp phải khó tiêu:\n" +
      "1. Thay đổi chế độ ăn uống: Hạn chế thức ăn béo, cay, chua hoặc đồ uống có gas. Thưởng thức bữa ăn nhỏ hơn nhưng thường xuyên hơn để giảm áp lực lên dạ dày.\n\n" +
      "2. Uống nhiều nước: Giúp tiêu hóa tốt hơn, nhưng nên tránh uống quá nhiều trong bữa ăn.\n\n" +
      "3. Thư giãn và giảm stress: Thực hiện các bài tập thư giãn như yoga hoặc thiền có thể giúp cải thiện tình trạng.\n\n" +
      "4. Sử dụng thuốc giảm triệu chứng: Có thể cân nhắc sử dụng thuốc giảm đau hoặc thuốc hỗ trợ tiêu hóa nhưng nên tham khảo ý kiến bác sĩ trước khi dùng.\n\n" +
      "5. Theo dõi tình hình sức khỏe: Nếu triệu chứng kéo dài hoặc nghiêm trọng hơn, bạn nên đến gặp bác sĩ để được tư vấn và điều trị kịp thời.\n\n" +
      "Khi nào nên gặp bác sĩ:\n" +
      "- Khó tiêu kéo dài hơn vài tuần.\n" +
      "- Có kèm theo các triệu chứng nghiêm trọng như nôn ra máu, đau bụng dữ dội, hoặc giảm cân không rõ lý do.",
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
      "Dạ, đầy hơi (hay còn gọi là chứng chướng bụng) là tình trạng tích tụ khí trong hệ tiêu hóa, khiến bụng cảm thấy đầy hoặc căng. Tình trạng này có thể gây cảm giác khó chịu, đau bụng, cảm giác nặng nề hoặc ợ chua. Dưới đây là một số nguyên nhân phổ biến và phương pháp khắc phục tình trạng đầy hơi:\n\n" +
      "      Nguyên nhân gây đầy hơi:\n" +
      "1. Chế độ ăn uống:\n" +
      "- Tiêu thụ thực phẩm chứa nhiều chất xơ, chẳng hạn như đậu, bắp cải, bông cải xanh, và một số loại trái cây như táo, lê.\n" +
      "- Sử dụng đồ uống có ga, rượu hoặc thức uống có caffeine.\n" +
      "- Ăn uống nhanh, nuốt phải không khí.\n" +
      "- Thực phẩm có chứa lactose hoặc gluten nếu bạn có tình trạng không dung nạp chúng.\n\n" +
      "2. Bệnh lý tiêu hóa:\n" +
      "- Hội chứng ruột kích thích (IBS).\n" +
      "- Viêm dạ dày hoặc loét dạ dày.\n" +
      "- Các bệnh lý như tiểu đường hoặc suy giáp gây chậm tiêu hóa.\n\n" +
      "3. Yếu tố tâm lý:\n" +
      "- Stress và lo âu có thể ảnh hưởng đến hệ tiêu hóa và gây đầy hơi.\n\n" +
      "      Phương pháp giảm đầy hơi:\n" +
      "1. Thay đổi chế độ ăn uống:\n" +
      "- Giảm tiêu thụ thực phẩm dễ gây đầy hơi như nước ngọt có ga, thực phẩm chiên hoặc quá nhiều chất xơ.\n" +
      "- Ăn thực phẩm lên men như sữa chua, kim chi, hoặc dưa cải để hỗ trợ hệ tiêu hóa.\n\n" +
      "2. Uống trà thảo dược:\n" +
      "- Trà gừng, trà bạc hà hoặc trà hoa cúc có thể giúp làm dịu dạ dày và giảm cảm giác đầy hơi.\n\n" +
      "3. Tập thể dục:\n" +
      "- Các bài tập nhẹ nhàng như đi bộ hoặc yoga có thể giúp kích thích tiêu hóa và giảm cảm giác đầy bụng.\n\n" +
      "4. Giảm stress:\n" +
      "- Thực hành các kỹ thuật thư giãn như thiền, yoga hoặc các bài tập hít thở sâu có thể giúp giảm mức độ stress và cải thiện chức năng tiêu hóa.\n\n" +
      "5. Tham khảo ý kiến bác sĩ:\n" +
      "- Nếu tình trạng đầy hơi xảy ra thường xuyên kèm theo triệu chứng khác như đau bụng nghiêm trọng, tiêu chảy, hoặc giảm cân không rõ nguyên nhân, hãy đến gặp bác sĩ để kiểm tra và điều trị kịp thời.",
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
    " Đau bụng trên":
      "Đau bụng trên có thể do vấn đề về dạ dày hoặc gan. Nếu kéo dài, nên đi khám.",
    "Đau đầu gối":
      "Đau đầu gối có thể do chấn thương hoặc viêm khớp. Nghỉ ngơi và tránh vận động mạnh có thể giúp giảm đau.",
    "Đau cổ":
      "Đau cổ có thể do tư thế sai hoặc căng cơ. Nghỉ ngơi và thực hiện các bài tập giãn cơ có thể giúp cải thiện.",
    "Chảy nước mũi":
      "Chảy nước mũi có thể do cảm lạnh hoặc dị ứng. Uống nước ấm và tránh tiếp xúc với tác nhân gây dị ứng.",
    "đau bụng kinh":
      "Dạ, đau bụng kinh là một triệu chứng phổ biến mà nhiều phụ nữ gặp phải trước hoặc trong chu kỳ kinh nguyệt. Dưới đây là một số biện pháp bạn có thể áp dụng để giảm đau bụng kinh:\n\n" +
      "1. Nghỉ ngơi và thư giãn: Khi cảm thấy đau, nghỉ ngơi có thể giúp giảm bớt cơn đau. Nên tìm một vị trí thoải mái để nghỉ ngơi.\n\n" +
      "2. Chườm nóng: Sử dụng túi chườm nóng hoặc khăn ấm chườm lên bụng dưới có thể giúp giảm co thắt cơ và làm dịu cơn đau.\n\n" +
      "3. Thuốc giảm đau: Sử dụng thuốc giảm đau không kê đơn như ibuprofen hoặc paracetamol để giảm đau bụng. Tuy nhiên, hãy tham khảo ý kiến bác sĩ nếu bạn có bất kỳ điều kiện sức khỏe nào.\n\n" +
      "4. Tập thể dục nhẹ nhàng: Các bài tập nhẹ như đi bộ hoặc yoga có thể giúp tăng cường lưu thông máu và làm giảm cơn đau.\n\n" +
      "5. Điều chỉnh chế độ ăn uống: Hạn chế thức ăn có chứa caffeine, muối và đường. Thay vào đó, bổ sung thực phẩm giàu omega-3 (như cá, hạt lanh) có thể giúp giảm viêm.\n\n" +
      "6. Uống nhiều nước: Uống đủ nước và các loại trà thảo dược như trà gừng hoặc trà bạc hà có thể giúp làm giảm triệu chứng đau bụng.\n\n" +
      "7. Xem xét các phương pháp điều trị khác: Nếu đau bụng kinh của bạn nghiêm trọng hoặc xảy ra thường xuyên, hãy tham khảo ý kiến bác sĩ. Họ có thể xem xét thêm các lựa chọn điều trị như liệu pháp hormone hoặc thuốc kê đơn.\n\n" +
      "8. Thực hiện các biện pháp giảm stress: Thực hành các bài tập thư giãn như yoga, thiền, hoặc phương pháp thở sâu có thể giúp làm giảm mức độ stress và giảm đau.\n\n" +
      "Nếu các biện pháp trên không giúp được nhiều hoặc cơn đau trở nên nghiêm trọng hơn, bạn nên đến gặp bác sĩ để được khám và chẩn đoán cụ thể hơn.",
    "Mệt mỏi mãn tính":
      "Mệt mỏi mãn tính có thể do thiếu ngủ hoặc stress. Cần nghỉ ngơi và điều chỉnh lối sống.",
    "Khó thở khi nằm":
      "Khó thở khi nằm có thể do vấn đề tim mạch hoặc hô hấp. Nếu kéo dài, hãy đi khám ngay.",
    "Đau tai":
      "Đau tai có thể do nhiễm trùng hoặc áp lực. Nếu cơn đau kéo dài, hãy đi khám bác sĩ.",
    "Đau dạ dày":
      "Đau dạ dày có thể do viêm loét hoặc trào ngược dạ dày thực quản. Nếu kéo dài, hãy đi khám.",
    "Rối loạn ăn uống":
      "Rối loạn ăn uống có thể do căng thẳng hoặc vấn đề tâm lý. Cần tìm kiếm sự hỗ trợ từ chuyên gia.",
    "Khó khăn trong việc đi lại":
      "Khó khăn trong việc đi lại có thể do chấn thương hoặc vấn đề về khớp. Nghỉ ngơi và tham khảo ý kiến bác sĩ.",
    "Nổi mụn nước":
      "Nổi mụn nước có thể do dị ứng hoặc nhiễm virus. Tránh gãi và theo dõi tình trạng.",
    "Cảm giác nặng nề ở chân":
      "Cảm giác nặng nề ở chân có thể do tuần hoàn kém. Nghỉ ngơi và nâng cao chân có thể giúp cải thiện.",
    "Mất cân bằng":
      "Mất cân bằng có thể do vấn đề thần kinh hoặc tai trong. Nếu kéo dài, hãy đi khám bác sĩ.",
    "Đau lưng dưới":
      "Đau lưng dưới có thể do chấn thương hoặc căng cơ. Nghỉ ngơi và tránh nâng vật nặng có thể giúp giảm đau.",
    "Đau bụng bên trái":
      "Đau bụng bên trái có thể liên quan đến lách hoặc ruột. Nếu kéo dài, hãy đi khám.",
    "Cảm giác nóng rát ở da":
      "Cảm giác nóng rát ở da có thể do dị ứng hoặc viêm nhiễm. Tránh tiếp xúc với các tác nhân gây dị ứng.",
    "Đau ngực trái":
      "Đau ngực trái có thể liên quan đến tim hoặc phổi. Nếu đau dữ dội, hãy đi khám ngay lập tức.",
    "Mắt nhìn mờ":
      "Mắt nhìn mờ có thể do mỏi mắt hoặc vấn đề về thị lực. Nghỉ ngơi và kiểm tra mắt có thể giúp cải thiện.",
    "Khó tiêu hóa":
      "Khó tiêu hóa có thể do ăn uống không hợp lý. Ăn uống khoa học và tránh thức ăn khó tiêu có thể giúp cải thiện.",
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
    "Tạm biệt":
      "Dạ, tạm biệt bạn! Nếu bạn có bất kỳ câu hỏi nào khác trong tương lai hoặc cần sự trợ giúp, hãy quay lại nhé. Chúc bạn một ngày tốt lành!",
    "tạm biệt":
      "Dạ, tạm biệt bạn! Nếu bạn có bất kỳ câu hỏi nào khác trong tương lai hoặc cần sự trợ giúp, hãy quay lại nhé. Chúc bạn một ngày tốt lành!",
    "bạn có thể làm gì": "",
  };

  for (const key in responses) {
    if (inputLower.includes(key)) {
      return responses[key];
    }
  }

  return "Tôi chưa nhận diện được triệu chứng này. Bạn có thể mô tả rõ hơn hoặc liên hệ tới số điện thoại 0356241423. Để được hỗ trợ nhanh nhất";
}

export default analyzeInput;
