import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/styleGuide.css';

const StyleGuide = () => {
  return (
    <div className="style-guide-container">
      <Header />
      <main className="style-guide-content">
        <section className="intro-section">
          <h1>Phong cách</h1>
          <p>Hướng dẫn chi tiết về các quy chuẩn hình ảnh, màu sắc và typography cho hệ thống Website quản lý và chia sẻ tài liệu học tập trong lĩnh vực IT.</p>
        </section>

        <section className="section">
          <h2 className="section-title">
            <span className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.71-.77 1.71-1.71 0-.44-.18-.85-.47-1.15.28-.04.6-.06.88-.06 5.44 0 9.88-4.44 9.88-9.88C24 4.5 18.63 2 12 2z"/></svg>
            </span> 1. Bảng màu (Color Palette)
          </h2>
          <div className="color-palette-grid">
            <div className="color-group">
              <h3 className="group-title">THƯƠNG HIỆU</h3>
              <div className="color-cards">
                <div className="color-card">
                  <div className="color-box" style={{ backgroundColor: '#007bff' }}></div>
                  <div className="color-info">
                    <span className="color-name">Màu xanh cơ bản</span>
                    <span className="color-hex">#007bff</span>
                  </div>
                </div>
                <div className="color-card">
                  <div className="color-box" style={{ backgroundColor: '#64748b' }}></div>
                  <div className="color-info">
                    <span className="color-name">Màu xám thứ cấp</span>
                    <span className="color-hex">#64748b</span>
                  </div>
                </div>
                <div className="color-card">
                  <div className="color-box" style={{ backgroundColor: '#f97316' }}></div>
                  <div className="color-info">
                    <span className="color-name">Màu cam nổi bật</span>
                    <span className="color-hex">#f97316</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="color-group">
              <h3 className="group-title">TRẠNG THÁI</h3>
              <div className="color-cards">
                <div className="color-card">
                  <div className="color-box" style={{ backgroundColor: '#22c55e' }}></div>
                  <div className="color-info">
                    <span className="color-name">Thành công</span>
                    <span className="color-hex">#22c55e</span>
                  </div>
                </div>
                <div className="color-card">
                  <div className="color-box" style={{ backgroundColor: '#f59e0b' }}></div>
                  <div className="color-info">
                    <span className="color-name">Cảnh báo</span>
                    <span className="color-hex">#f59e0b</span>
                  </div>
                </div>
                <div className="color-card">
                  <div className="color-box" style={{ backgroundColor: '#ef4444' }}></div>
                  <div className="color-info">
                    <span className="color-name">Lỗi</span>
                    <span className="color-hex">#ef4444</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">
            <span className="section-icon" style={{ fontSize: '28px', fontWeight: 800 }}>Tt</span> 2. Hệ thống Chữ (Typography)
          </h2>
          <div className="typography-card">
            <div className="typo-item">
              <span className="typo-label">Heading 1 / 36px / 900</span>
              <h1 className="typo-value">Khám phá tri thức mới</h1>
            </div>
            <div className="typo-item">
              <span className="typo-label">Heading 2 / 30px / 700</span>
              <h2 className="typo-value">Khóa học trực tuyến tốt nhất</h2>
            </div>
            <div className="typo-item">
              <span className="typo-label">Body Large / 18px / 400</span>
              <p className="typo-value">Xây dựng tương lai của bạn với các chuyên gia hàng đầu trong lĩnh vực công nghệ và giáo dục.</p>
            </div>
            <div className="typo-footer">
              <span className="typo-label">Caption / 12px / 500</span>
              <span className="typo-update">CẬP NHẬT LẦN CUỐI: 24 THÁNG 5, 2024</span>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">
            <span className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z"/></svg>
            </span> 3. Nút bấm (Buttons)
          </h2>
          <div className="buttons-grid">
            <div className="button-group-card">
              <h3 className="group-title">CÁC LOẠI NÚT</h3>
              <div className="button-variants">
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-outline">Outline</button>
                <button className="btn btn-danger">Danger</button>
              </div>
            </div>
            <div className="button-group-card">
              <h3 className="group-title">KÍCH THƯỚC</h3>
              <div className="button-sizes">
                <button className="btn btn-primary btn-sm">Small</button>
                <button className="btn btn-primary btn-md">Medium</button>
                <button className="btn btn-primary btn-lg">Large Button</button>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">
            <span className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            </span> 4. Form & Thành phần nhỏ
          </h2>
          <div className="forms-grid">
            <div className="form-card">
              <h3 className="group-title">INPUT FIELDS</h3>
              <div className="input-group">
                <label>Họ và tên</label>
                <input type="text" placeholder="Nguyễn Văn A" />
              </div>
              <div className="input-group">
                <label>Tìm kiếm khóa học</label>
                <div className="search-input-wrapper">
                  <span className="search-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  </span>
                  <input type="text" placeholder="Ví dụ: React Native..." />
                </div>
              </div>
            </div>
            <div className="form-card">
              <h3 className="group-title">BADGES & TAGS</h3>
              <div className="badges-list">
                <span className="badge badge-blue">Thiết kế</span>
                <span className="badge badge-green">Hoàn thành</span>
                <span className="badge badge-orange">Đang chờ</span>
                <span className="badge badge-red">Quá hạn</span>
                <span className="badge badge-gray">Draft</span>
              </div>
              <h3 className="group-title" style={{ marginTop: '24px' }}>STATUS DOTS</h3>
              <div className="status-dots">
                <span className="status-dot status-online">Trực tuyến</span>
                <span className="status-dot status-offline">Ngoại tuyến</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">
            <span className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </span> 5. Hệ thống Lưới & Khoảng cách
          </h2>
          <div className="grid-card">
            <p className="grid-desc">Chúng tôi sử dụng hệ thống 8px làm quy chuẩn cho padding, margin và grid layout để đảm bảo tính nhất quán.</p>
            <div className="grid-content">
              <div className="grid-visual">
                <h3 className="group-title">VISUAL REPRESENTATION (8PX UNIT)</h3>
                <div className="visual-box-container">
                    <div className="gap-label">8px Gap</div>
                    <div className="visual-box">
                        <span>12×12 units</span>
                    </div>
                </div>
              </div>
              <div className="grid-scale">
                <h3 className="group-title">SPACING SCALE</h3>
                <ul className="scale-list">
                  <li><span className="scale-box scale-8"></span> 8px (Unit 1)</li>
                  <li><span className="scale-box scale-16"></span> 16px (Unit 2)</li>
                  <li><span className="scale-box scale-24"></span> 24px (Unit 3)</li>
                  <li><span className="scale-box scale-32"></span> 32px (Unit 4)</li>
                  <li><span className="scale-box scale-48"></span> 48px (Unit 6)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StyleGuide;