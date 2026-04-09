import React, { useEffect, useMemo, useState } from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTableWrapper from '../../components/admin/AdminTableWrapper';
import AdminPagination from '../../components/admin/AdminPagination';
import DocumentDetailModal from './components/DocumentDetailModal';
import { useNotification } from '../../context/NotificationContext';
import '../../styles/admin/adminDashboard.css';
import '../../styles/admin/adminComponents.css';

const MOCK_DOCUMENT_REQUESTS = [
  {
    id: 1,
    name: 'Báo cáo CNTT P3 2023.pdf',
    title: 'Báo cáo CNTT P3 2023',
    contributor: { name: 'Hoàng Văn Phúc', email: 'phucqwer@studyit.com' },
    date: '10/10/2023',
    field: 'CNTT',
    category: 'CNTT',
    status: 'PENDING',
    description: 'Báo cáo chi tiết về tình hình phát triển công nghệ thông tin trong quý 3 năm 2023, bao gồm các xu hướng mới và dự báo cho tương lai.',
    tags: ['CNTT', 'Báo cáo', '2023'],
    documentUrl: '#',
    thumbnailUrl: 'https://via.placeholder.com/180x240?text=IT+Report',
    fileName: 'Báo cáo CNTT P3 2023.pdf',
    fileSizeBytes: 2450000
  },
  {
    id: 2,
    name: 'Banner_KT_Final.jpg',
    title: 'Banner Kinh tế học Final',
    contributor: { name: 'Trần Thị Be', email: 'thibe@gmail.com' },
    date: '09/10/2023',
    field: 'Kinh tế học',
    category: 'Kinh tế học',
    status: 'APPROVED',
    description: 'Thiết kế banner cuối cùng cho chuyên mục Kinh tế học trên nền tảng StudyIT.',
    tags: ['Kinh tế', 'Banner', 'Design'],
    documentUrl: '#',
    thumbnailUrl: 'https://via.placeholder.com/180x240?text=Economics',
    fileName: 'Banner_KT_Final.jpg',
    fileSizeBytes: 1200000
  },
  {
    id: 3,
    name: 'Quy_che_quy_uoc_v2.pdf',
    title: 'Quy chế quy ước v2',
    contributor: { name: 'Trần Mạnh Cường', email: 'mcuong@doc.vn.com' },
    date: '08/10/2023',
    field: 'Y học',
    category: 'Y học',
    status: 'REJECTED',
    description: 'Bản thảo thứ hai của quy chế quy ước trong lĩnh vực Y học dành cho sinh viên thực tập.',
    tags: ['Y học', 'Quy chế', 'Sinh viên'],
    documentUrl: '#',
    thumbnailUrl: 'https://via.placeholder.com/180x240?text=Medicine',
    fileName: 'Quy_che_quy_uoc_v2.pdf',
    fileSizeBytes: 3500000,
    rejectionReason: 'Nội dung chưa đủ chi tiết và thiếu nguồn tham khảo tin cậy.'
  },
  {
    id: 4,
    name: 'Hop_dong_lao_dong.docx',
    title: 'Mẫu hợp đồng lao động',
    contributor: { name: 'Phạm Minh Doanh', email: 'mdoanh@example.com' },
    date: '07/10/2023',
    field: 'Quản trị kinh doanh',
    category: 'Quản trị kinh doanh',
    status: 'PENDING',
    description: 'Mẫu hợp đồng lao động chuẩn dành cho các doanh nghiệp vừa và nhỏ, cập nhật theo luật lao động mới nhất.',
    tags: ['Quản trị', 'Hợp đồng', 'Luật'],
    documentUrl: '#',
    thumbnailUrl: 'https://via.placeholder.com/180x240?text=Business',
    fileName: 'Hop_dong_lao_dong.docx',
    fileSizeBytes: 800000
  },
];

const STATUS_UI = {
  PENDING: { label: 'Chờ duyệt', className: 'status-pending' },
  APPROVED: { label: 'Đã duyệt', className: 'status-approved' },
  REJECTED: { label: 'Đã từ chối', className: 'status-rejected' },
};

export default function ContentModeratorPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState(MOCK_DOCUMENT_REQUESTS);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notification = useNotification();

  useEffect(() => {
    const start = page * size;
    const end = start + size;
    setItems(requests.slice(start, end));
  }, [page, size, requests]);

  const total = requests.length;
  const empty = useMemo(() => items.length === 0, [items.length]);

  const handleOpenModal = (doc) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (id, newStatus, reason = null) => {
    setRequests(prev => prev.map(doc => 
      doc.id === id ? { ...doc, status: newStatus, rejectionReason: reason } : doc
    ));
    
    if (newStatus === 'APPROVED') {
      notification.success('Phê duyệt tài liệu thành công!');
    } else if (newStatus === 'REJECTED') {
      notification.success('Đã từ chối tài liệu và gửi lý do cho người đóng góp.');
    }
  };

  return (
    <main className="admin-main">
      <AdminPageHeader
        title="Yêu cầu đăng tải tài liệu"
        description="Quản lý và phê duyệt công khai tài liệu mới cho nền tảng."
        showSearch={false}
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="admin-btn-secondary">
              Lọc
            </button>
            <button type="button" className="admin-btn-primary">
              Xuất dữ liệu
            </button>
          </div>
        }
      />

      <AdminTableWrapper
        empty={empty}
        emptyTitle="Chưa có yêu cầu đăng tải tài liệu"
        emptyDescription="Khi có yêu cầu mới, hệ thống sẽ hiển thị tại đây."
        footer={
          <AdminPagination
            page={page}
            size={size}
            total={total}
            onPageChange={setPage}
            onSizeChange={(next) => {
              setSize(next);
              setPage(0);
            }}
            sizeOptions={[4, 8, 12]}
          />
        }
      >
        <table className="admin-table">
          <thead>
            <tr>
              <th>TÊN TÀI LIỆU</th>
              <th>CONTRIBUTOR</th>
              <th>NGÀY GỬI</th>
              <th>LĨNH VỰC</th>
              <th>TRẠNG THÁI</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {items.map((doc) => {
              const statusUi = STATUS_UI[doc.status] ?? {
                label: doc.status,
                className: 'status-pending',
              };
              return (
                <tr key={doc.id}>
                  <td>
                    <div className="file-info">
                      <span className="file-icon">📄</span>
                      {doc.name}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600 }}>{doc.contributor.name}</div>
                      <small style={{ color: '#667085' }}>{doc.contributor.email}</small>
                    </div>
                  </td>
                  <td>{doc.date}</td>
                  <td>{doc.field}</td>
                  <td>
                    <span className={`status-badge ${statusUi.className}`}>{statusUi.label}</span>
                  </td>
                  <td>
                    <button 
                      type="button" 
                      className="admin-btn-ghost"
                      onClick={() => handleOpenModal(doc)}
                    >
                      Xem hồ sơ
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AdminTableWrapper>

      <DocumentDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        document={selectedDoc}
        onUpdateStatus={handleUpdateStatus}
      />
    </main>
  );
}
