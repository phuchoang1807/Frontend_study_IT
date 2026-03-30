import React, { useState, useEffect } from 'react';
import ContributorDetailModal from './components/ContributorDetailModal';
import '../../styles/admin/contributorRequests.css';
import axiosClient from '../../api/axiosClient';

const ContributorRequests = () => {
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);

      const response = await axiosClient.get('/admin/contributor-requests');

      console.log("API response:", response.data);

      // ✅ FIX DUY NHẤT Ở ĐÂY
      if (response.data && Array.isArray(response.data.data)) {
        const mappedData = response.data.data.map(req => ({
          ...req,

          avatar:
            req.avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              req.name || 'User'
            )}&background=random`,

          date: req.createdAt
            ? new Date(req.createdAt).toLocaleDateString('vi-VN')
            : 'N/A',

          status: (req.status || 'PENDING').toLowerCase(),

          statusLabel:
            req.status === 'PENDING'
              ? 'Chờ duyệt'
              : req.status === 'APPROVED'
              ? 'Đã duyệt'
              : req.status === 'REJECTED'
              ? 'Đã từ chối'
              : req.status || 'Chưa rõ',
        }));

        setRequests(mappedData);
      } else {
        console.warn("Response không đúng format:", response.data);
        setRequests([]);
      }
    } catch (error) {
      console.error("❌ Lỗi gọi API:", error);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, newStatus, newLabel) => {
    try {
      setRequests(prev => prev.map(req => 
        req.id === id ? { ...req, status: newStatus.toLowerCase(), statusLabel: newLabel } : req
      ));
    } catch (error) {
      console.error("Failed to update status on server:", error);
    }
  };

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
      default: return 'dot-pending';
    }
  };

  const getStatusTextClass = (status) => {
    switch (status) {
      case 'pending': return 'status-text-pending';
      case 'approved': return 'status-text-approved';
      case 'rejected': return 'status-text-rejected';
      default: return 'status-text-pending';
    }
  };

  return (
    <>
      <div className="admin-content">
        <header className="content-header">
          <div className="header-title">
            <h1>Yêu cầu Contributor</h1>
            <p>Quản lý và phê duyệt hồ sơ người dùng muốn đóng góp nội dung mới cho nền tảng.</p>
          </div>
          <div className="header-actions">
            <button className="btn-filter" onClick={fetchRequests}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Làm mới
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
          {isLoading ? (
            <div className="loading-container" style={{ padding: '40px', textAlign: 'center' }}>
              <div className="spinner"></div>
              <p style={{ marginTop: '10px', color: '#64748b' }}>Đang tải danh sách yêu cầu...</p>
            </div>
          ) : (
            <>
              <table className="contributor-table">
                <thead>
                  <tr>
                    <th>Người dùng</th>
                    <th>Ngày gửi</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length > 0 ? (
                    requests.map((req) => (
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                        Không có yêu cầu Contributor nào đang chờ xử lý.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              <div className="pagination-area">
                <span className="results-count">Hiển thị {requests.length} yêu cầu từ database</span>
                <div className="pagination-controls">
                  <button className="page-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button className="page-btn active">1</button>
                  <button className="page-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ContributorDetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        contributor={selectedContributor}
        onUpdateStatus={handleUpdateStatus}
      />
    </>
  );
};

export default ContributorRequests;