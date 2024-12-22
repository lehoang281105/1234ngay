import React from 'react';


const Dashboard = () => {
  // Demo data (replace with real data when integrating API)
  const totalUsers = 120;
  const totalProducts = 340;
  const totalOrders = 85;
  const totalRevenue = 150000000; // In VND

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Bảng Quản Trị</h1>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stats-card">
          <h2>{totalUsers}</h2>
          <p>Người Dùng</p>
          <button 
            className="manage-btn"
            onClick={() => window.location.href = '/admin/userlist'}>
            Quản Lý
          </button>
        </div>
        <div className="stats-card">
          <h2>{totalProducts}</h2>
          <p>Sản Phẩm</p>
          <button 
            className="manage-btn"
            onClick={() => window.location.href = '/admin/productlist'}>
            Quản Lý
          </button>
        </div>
        <div className="stats-card">
          <h2>{totalOrders}</h2>
          <p>Đơn Hàng</p>
          <button 
            className="manage-btn"
            onClick={() => window.location.href = '/admin/orderlist'}>
            Quản Lý
          </button>
        </div>
        <div className="stats-card">
          <h2>{totalRevenue.toLocaleString('vi-VN')} VND</h2>
          <p>Doanh Thu</p>
        </div>
      </div>

      {/* Quick Links Section */}
      <h2 className="dashboard-subtitle">Truy Cập Nhanh</h2>
      <div className="quick-links-section">
        <div className="quick-link-card">
          <p>Thống Kê</p>
          <button 
            className="navigate-btn"
            onClick={() => window.location.href = '/admin/analytics'}>
            Xem Thống Kê
          </button>
        </div>
        <div className="quick-link-card">
          <p>Quản Lý Người Dùng</p>
          <button 
            className="navigate-btn"
            onClick={() => window.location.href = '/admin/userlist'}>
            Đi Đến
          </button>
        </div>
        <div className="quick-link-card">
          <p>Quản Lý Sản Phẩm</p>
          <button 
            className="navigate-btn"
            onClick={() => window.location.href = '/admin/productlist'}>
            Đi Đến
          </button>
        </div>
        <div className="quick-link-card">
          <p>Quản Lý Đơn Hàng</p>
          <button 
            className="navigate-btn"
            onClick={() => window.location.href = '/admin/orderlist'}>
            Đi Đến
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
