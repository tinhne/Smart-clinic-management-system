import Blog_Header from "../../components/Blog/BlogHeader";
import "../../style/Blog/Blog.scss";
import image from "../../assets/img/Blog_Image/1 9.png";
const Blog = () => {
  return (
    <>
      <Blog_Header />

      <section className="banner">
        <div className="overlay"></div>
        <h1>Y TẾ SỐ 4.0</h1>
        <div className="banner-text"></div>
      </section>

      <main className="main-content">
        <section className="articles">
          <article className="article">
            <img src={image} alt="Article" />
            <div className="article-content">
              <div className="title">
                <p className="p1">Y tế số 4.0</p>
                <p className="p2">
                  8 cách giúp phòng khám tăng trưởng bền vững thời 4.0
                </p>
                <p className="p3">Phúc Hiếu, Đà Nẵng | 12993 lượt xem</p>
              </div>

              <p className="p4">
                Phòng khám trong thời đại kỹ thuật số cần áp dụng nhiều biện
                pháp Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quis ab, nemo similique ad id perferendis. Facere sed dicta id
                iusto perspiciatis recusandae, autem non modi quo, magni
                voluptate rem vel.
              </p>
              <p className="p5">
                Có phải là: 1. Website phòng khám, 2. Quản lý danh tiếng, 3.
                Healthcare marketing, 4. Trải nghiệm bệnh nhân, 5. Cá nhân hóa
                bệnh nhân, 6. Tin nhắn tự động, 7. Phần mềm quản lý phòng khám,
                8. Referral marketing
              </p>
            </div>
          </article>
        </section>

        <aside className="sidebar">
          <section className="categories">
            <p>Danh Mục</p>
            <ul>
              <li>
                <a href="#">Y tế số 4.0</a>
              </li>
              <li>
                <a href="#">Sức khỏe hàng ngày</a>
              </li>
              <li>
                <a href="#">Thông tin phòng khám</a>
              </li>
              <li>
                <a href="#">Chăm sóc sức khỏe</a>
              </li>
            </ul>
          </section>

          <section className="most-viewed">
            <p>Xem nhiều nhất</p>
            <div className="most-blog">
              <div className="most-viewed-img">
                <img src={image} alt="" />
              </div>
              <div className="most-viewed-info">
                <p className="title">
                  8 cách giúp phòng khám tăng trưởng bền vững thời 4 chấm
                </p>
                <p className="view">23330 lượt xem</p>
              </div>
            </div>
          </section>
        </aside>
      </main>
    </>
  );
};

export default Blog;
