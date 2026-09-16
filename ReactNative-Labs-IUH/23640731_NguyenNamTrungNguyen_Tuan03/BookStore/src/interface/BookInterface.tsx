import { ImageSourcePropType } from "react-native";

export type bookImage = {
  source: ImageSourcePropType;
};

export interface Book {
  source: bookImage;
  title: string;
  author: string;
  price: number;
  description: string;
}

export interface BookCardItemProps {
  book: Book;
}

export const books: Book[] = [
  {
    source: require("../../assets/book_image/book1.webp"),
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 85000,
    description:
      "Đắc Nhân Tâm là một trong những cuốn sách nổi tiếng nhất về nghệ thuật giao tiếp và ứng xử. Cuốn sách chia sẻ những nguyên tắc giúp con người hiểu người khác, tạo thiện cảm, xây dựng các mối quan hệ tốt đẹp và giao tiếp hiệu quả hơn trong cuộc sống. Thông qua những câu chuyện và ví dụ thực tế, Dale Carnegie hướng dẫn người đọc cách nhìn nhận vấn đề từ góc độ của người khác, biết lắng nghe, tôn trọng và khích lệ mọi người xung quanh.",
  },

  {
    source:
      "https://upload.wikimedia.org/wikipedia/vi/9/9c/Nh%C3%A0_gi%E1%BA%A3_kim_%28s%C3%A1ch%29.jpg?utm_source=vi.wikipedia.org&utm_campaign=index&utm_content=original",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 79000,
    description:
      "Nhà Giả Kim kể về hành trình của Santiago, một chàng trai chăn cừu trẻ tuổi quyết định rời bỏ cuộc sống quen thuộc để đi tìm kho báu được báo trước trong giấc mơ. Trên hành trình đó, cậu gặp nhiều con người và trải qua nhiều thử thách. Cuốn sách truyền tải thông điệp về việc theo đuổi ước mơ, lắng nghe tiếng gọi của trái tim và trân trọng những trải nghiệm trên hành trình tìm kiếm mục tiêu của mình.",
  },

  {
    source:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1495635816i/32521178.jpg",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    author: "Rosie Nguyễn",
    price: 90000,
    description:
      "Tuổi Trẻ Đáng Giá Bao Nhiêu là cuốn sách dành cho những người trẻ đang tìm kiếm hướng đi và muốn phát triển bản thân. Tác giả chia sẻ những trải nghiệm, suy nghĩ và lời khuyên về việc học tập, đọc sách, làm việc, trải nghiệm cuộc sống và theo đuổi điều mình mong muốn. Cuốn sách khuyến khích người trẻ chủ động học hỏi, bước ra khỏi vùng an toàn và sử dụng quãng thời gian tuổi trẻ một cách có ý nghĩa.",
  },

  {
    source:
      "https://product.hstatic.net/200000122283/product/thay-doi-ti-hon-hieu-qua-bat-ngo-tb-2024_cd81eceb238a4d3691483554020aa690_master.jpg",
    title: "Atomic Habits",
    author: "Danel Smith",
    price: 150000,
    description:
      "Atomic Habits trình bày cách những thay đổi rất nhỏ trong hành vi hằng ngày có thể tạo ra kết quả đáng kể trong thời gian dài. Nội dung tập trung vào việc xây dựng thói quen tốt, loại bỏ thói quen xấu và thiết kế môi trường phù hợp để duy trì hành vi tích cực. Cuốn sách giúp người đọc hiểu cách hình thành thói quen và đưa ra những phương pháp thực tế để cải thiện bản thân từng bước mỗi ngày.",
  },
];
