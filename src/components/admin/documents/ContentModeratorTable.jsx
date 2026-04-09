import React, { useEffect, useMemo, useState } from 'react';
import AdminTableWrapper from './AdminTableWrapper';
import AdminPagination from './AdminPagination';

const MOCK_DOCUMENT_REQUESTS = [
  {
    id: 1,
    name: 'Báo cáo CNTT P3 2023.pdf',
    contributor: { name: 'Hoàng Văn Phúc', email: 'phucqwer@studyit.com' },
    date: '10/10/2023',
    field: 'CNTT',
    status: 'PENDING',
  },
  {
    id: 2,
    name: 'Banner_KT_Final.jpg',
    contributor: { name: 'Trần Thị Be', email: 'thibe@gmail.com' },
    date: '09/10/2023',
    field: 'Kinh tế học',
    status: 'APPROVED',
  },
  {
    id: 3,
    name: 'Quy_che_quy_uoc_v2.pdf',
    contributor: { name: 'Trần Mạnh Cường', email: 'mcuong@doc.vn.com' },
    date: '08/10/2023',
    field: 'Y học',
    status: 'REJECTED',
  },
  {
    id: 4,
    name: 'Hop_dong_lao_dong.docx',
    contributor: { name: 'Phạm Minh Doanh', email: 'mdoanh@example.com' },
    date: '07/10/2023',
    field: 'Quản trị kinh doanh',
    status: 'PENDING',
  },
];

const STATUS_UI = {
  PENDING: { label: 'Chờ duyệt', className: 'status-pending' },
  APPROVED: { label: 'Đã duyệt', className: 'status-approved' },
  REJECTED: { label: 'Đã từ chối', className: 'status-rejected' },
};

export default function ContentModeratorTable() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const start = page * size;
    const end = start + size;
    setItems(MOCK_DOCUMENT_REQUESTS.slice(start, end));
  }, [page, size]);

  const total = MOCK_DOCUMENT_REQUESTS.length;
  const empty = useMemo(() => items.length === 0, [items.length]);

  return (
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
                  <button type="button" className="admin-btn-ghost">
                    Xem hồ sơ
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AdminTableWrapper>
  );
}
