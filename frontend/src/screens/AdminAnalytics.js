import React, { useEffect } from 'react';

const AdminAnalytics = () => {
  // Demo data
  const data = {
    sales: [200, 400, 300, 700, 500, 800, 600], // Weekly sales
    orders: [10, 20, 15, 30, 25, 35, 40], // Weekly orders
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Days of the week
  };

  useEffect(() => {
    // Draw Sales Chart
    const salesCanvas = document.getElementById('salesChart');
    const salesCtx = salesCanvas.getContext('2d');

    salesCtx.clearRect(0, 0, salesCanvas.width, salesCanvas.height); // Clear canvas
    drawBarChart(salesCtx, data.sales, data.labels, 'Sales');

    // Draw Orders Chart
    const ordersCanvas = document.getElementById('ordersChart');
    const ordersCtx = ordersCanvas.getContext('2d');

    ordersCtx.clearRect(0, 0, ordersCanvas.width, ordersCanvas.height); // Clear canvas
    drawLineChart(ordersCtx, data.orders, data.labels, 'Orders');
  }, []);

  const drawBarChart = (ctx, dataset, labels, label) => {
    const maxVal = Math.max(...dataset);
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const barWidth = canvasWidth / dataset.length - 20;

    ctx.font = '16px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';

    dataset.forEach((value, index) => {
      const barHeight = (value / maxVal) * (canvasHeight - 50); // Scale to canvas height
      const x = index * (barWidth + 20) + 20;
      const y = canvasHeight - barHeight;

      ctx.fillStyle = '#007bff';
      ctx.fillRect(x, y, barWidth, barHeight); // Draw bar

      ctx.fillStyle = '#333';
      ctx.fillText(value, x + barWidth / 2, y - 10); // Label above bar
      ctx.fillText(labels[index], x + barWidth / 2, canvasHeight - 10); // Label below bar
    });
  };

  const drawLineChart = (ctx, dataset, labels, label) => {
    const maxVal = Math.max(...dataset);
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const pointSpacing = canvasWidth / (dataset.length - 1);

    ctx.beginPath();
    ctx.strokeStyle = '#28a745';
    ctx.lineWidth = 2;

    dataset.forEach((value, index) => {
      const x = index * pointSpacing;
      const y = canvasHeight - (value / maxVal) * (canvasHeight - 50);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';

    dataset.forEach((value, index) => {
      const x = index * pointSpacing;
      const y = canvasHeight - (value / maxVal) * (canvasHeight - 50);

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2); // Draw point
      ctx.fillStyle = '#28a745';
      ctx.fill();

      ctx.fillStyle = '#333';
      ctx.fillText(value, x, y - 10); // Label above point
      ctx.fillText(labels[index], x, canvasHeight - 10); // Label below point
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Thống Kê Admin</h1>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#007bff', textAlign: 'center' }}>Doanh Thu Hàng Tuần</h2>
        <canvas id="salesChart" width="600" height="400" style={{ border: '1px solid #ccc', display: 'block', margin: '20px auto' }}></canvas>
      </div>

      <div>
        <h2 style={{ color: '#28a745', textAlign: 'center' }}>Số Lượng Đơn Hàng Hàng Tuần</h2>
        <canvas id="ordersChart" width="600" height="400" style={{ border: '1px solid #ccc', display: 'block', margin: '20px auto' }}></canvas>
      </div>
    </div>
  );
};

export default AdminAnalytics;
