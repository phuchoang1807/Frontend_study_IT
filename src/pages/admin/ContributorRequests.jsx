import React, { useState } from 'react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import ContributorDetailModal from './components/ContributorDetailModal';
import '../../styles/admin/contributorRequests.css';

const ContributorRequests = () => {
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const requests = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'vana@example.com',
      date: '10/10/2023',
      field: 'Công nghệ thông tin',
      status: 'pending',
      statusLabel: 'Chờ duyệt',
      avatar: 'https://i.pravatar.cc/150?u=a'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'thib@example.com',
      date: '09/10/2023',
      field: 'Kinh tế học',
      status: 'approved',
      statusLabel: 'Đã duyệt',
      avatar: 'https://i.pravatar.cc/150?u=b'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'vanc@example.com',
      date: '08/10/2023',
      field: 'Y học',
      status: 'rejected',
      statusLabel: 'Đã từ chối',
      avatar: 'https://i.pravatar.cc/150?u=c'
    },
    {
      id: 4,
      name: 'Phạm Minh D',
      email: 'minhd@example.com',
      date: '07/10/2023',
      field: 'Luật học',
      status: 'pending',
      statusLabel: 'Chờ duyệt',
      avatar: 'https://i.pravatar.cc/150?u=d'
    }
  ];

  const handleViewDetails = (contributor) => {
    setSelectedContributor(contributor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContributor(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'dot-pending';
      case 'approved': return 'dot-approved';
      case 'rejected': return 'dot-rejected';
      default: return '';
    }
  };

  const getStatusTextClass = (status) => {
    switch (status) {
      case 'pending': return 'status-text-pending';
      case 'approved': return 'status-text-approved';
      case 'rejected': return 'status-text-rejected';
      default: return '';
    }
  };

  return (
    <AdminLayout>
      <div className="admin-content">
        <header className="content-header">
          <div className="header-title">
            <h1>Yêu cầu Contributor</h1>
            <p>Quản lý và phê duyệt hồ sơ người dùng muốn đóng góp nội dung mới cho nền tảng.</p>
          </div>
          <div className="header-actions">
            <button className="btn-filter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Bộ lọc
            </button>
            <button className="btn-export">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Xuất báo cáo
            </button>
          </div>
        </header>

        <div className="table-card">
          <table className="contributor-table">
            <thead>
              <tr>
                <th>Người dùng</th>
                <th>Ngày gửi</th>
                <th>Lĩnh vực chuyên môn</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>
                    <div className="user-cell">
                      <img src={req.avatar} alt={req.name} className="user-avatar-img" />
                      <div className="user-details">
                        <span className="user-name">{req.name}</span>
                        <span className="user-email">{req.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{req.date}</td>
                  <td>
                    <span className="field-tag">{req.field}</span>
                  </td>
                  <td>
                    <div className="status-cell">
                      <span className={`status-dot ${getStatusClass(req.status)}`}></span>
                      <span className={getStatusTextClass(req.status)}>{req.statusLabel}</span>
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleViewDetails(req)} 
                      className="view-profile-btn"
                    >
                      Xem hồ sơ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="pagination-area">
            <span className="results-count">Hiển thị 4 trong 48 yêu cầu</span>
            <div className="pagination-controls">
              <button className="page-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-dots">...</span>
              <button className="page-btn">12</button>
              <button className="page-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContributorDetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        contributor={selectedContributor} 
      />
    </AdminLayout>
  );
};

export default ContributorRequests;
