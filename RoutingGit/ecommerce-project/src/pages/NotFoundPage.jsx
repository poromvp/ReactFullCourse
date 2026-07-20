import { Header } from "../components/Header";
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Ôi không! Lạc đường rồi!</h2>
        <p className="not-found-text">
          Có vẻ như bạn đã trôi dạt vào một hố đen vũ trụ. Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển sang một hành tinh khác.
        </p>
        <a href="/" className="not-found-button">
          🚀 Trở Về Trái Đất (Trang Chủ)
        </a>
      </div>
      <div className="astronaut-illustration">
        <div className="astronaut">👨‍🚀</div>
        <div className="planet">🌍</div>
      </div>
    </div>
  );
}