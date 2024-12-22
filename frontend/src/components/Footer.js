import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const footerStyle = {
	background: 'linear-gradient(to right, #343a40, #23272b)', // Gradient nền tối
	color: '#f8f9fa',
	padding: '40px 20px',
	fontSize: '14px',
	marginTop: '40px',
	borderTop: '5px solid #ffc107', // Đường phân cách nổi bật
};

const sectionTitleStyle = {
	fontWeight: 'bold',
	marginBottom: '15px',
	fontSize: '18px',
	color: '#ffc107', // Màu vàng thương hiệu
	textTransform: 'uppercase',
};

const linkStyle = {
	color: '#f8f9fa',
	textDecoration: 'none',
	fontSize: '14px',
	marginBottom: '12px',
	display: 'block',
	transition: 'color 0.3s',
};

const linkHoverStyle = {
	color: '#ffc107', // Màu vàng khi hover
};

const inputStyle = {
	width: 'calc(100% - 140px)',
	padding: '12px',
	marginRight: '10px',
	borderRadius: '30px',
	border: '1px solid #ced4da',
	backgroundColor: '#495057', // Input nền tối
	color: '#fff', // Chữ màu trắng
};

const buttonStyle = {
	padding: '12px 25px',
	backgroundColor: '#ffc107',
	color: '#343a40', // Nút màu tối đồng bộ header
	border: 'none',
	borderRadius: '30px',
	cursor: 'pointer',
	fontSize: '14px',
	transition: 'background-color 0.3s',
};

const socialIconsStyle = {
	display: 'flex',
	gap: '15px',
	justifyContent: 'center',
	marginTop: '30px',
};

const iconStyle = {
	fontSize: '22px',
	color: '#ffc107', // Icon màu vàng đồng bộ
	transition: 'transform 0.3s, color 0.3s',
};

const copyrightStyle = {
	marginTop: '30px',
	fontSize: '13px',
	color: '#adb5bd',
	textAlign: 'center',
};

const Footer = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		alert('Cảm ơn bạn đã đăng ký!');
	};

	return (
		<footer style={footerStyle}>
			<Container>
				{/* Phần đăng ký email */}
				<Row
					style={{
						backgroundColor: '#212529',
						padding: '20px',
						borderRadius: '5px',
						marginBottom: '20px',
						justifyContent: 'center',
					}}
				>
					<Col md={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<h3 style={{ margin: 0, color: '#ffc107' }}>Đăng ký nhận tin</h3>
						<form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
							<input type="email" placeholder="Email của bạn" style={inputStyle} required />
							<button style={buttonStyle} type="submit">
								Đăng ký
							</button>
						</form>
					</Col>
				</Row>

				{/* Các mục chính */}
				<Row style={{ marginBottom: '20px' }}>
					<Col md={4}>
						<h4 style={sectionTitleStyle}>Về NghienDT</h4>
						<a href="#" style={linkStyle}>
							Giới Thiệu
						</a>
						<a href="#" style={linkStyle}>
							Điều Khoản Sử Dụng
						</a>
						<a href="#" style={linkStyle}>
							Chính Sách Bảo Mật
						</a>
					</Col>
					<Col md={4}>
						<h4 style={sectionTitleStyle}>Hỗ Trợ Khách Hàng</h4>
						<a href="#" style={linkStyle}>
							Cách Thanh Toán
						</a>
						<a href="#" style={linkStyle}>
							Trả Hàng & Hoàn Tiền
						</a>
						<a href="#" style={linkStyle}>
							Chính Sách Bảo Hành
						</a>
					</Col>
					<Col md={4}>
						<h4 style={sectionTitleStyle}>Liên Hệ</h4>
						<p style={linkStyle}>
							Địa chỉ: Viện Khoa học Kĩ thuật Bưu điện
						</p>
						<p style={linkStyle}>
							Email: abc@gmail.com
						</p>
						<p style={linkStyle}>
							Điện thoại: 0123456789
						</p>
					</Col>
				</Row>

				{/* Mạng xã hội */}
				<Row>
					<Col style={{ textAlign: 'center' }}>
						<div style={socialIconsStyle}>
							<a href="https://www.facebook.com" style={iconStyle}>
								<i className="fab fa-facebook"></i>
							</a>
							<a href="https://plus.google.com/discover" style={iconStyle}>
								<i className="fab fa-google-plus"></i>
							</a>
							<a href="https://twitter.com" style={iconStyle}>
								<i className="fab fa-twitter"></i>
							</a>
							<a href="https://www.youtube.com" style={iconStyle}>
								<i className="fab fa-youtube"></i>
							</a>
						</div>
					</Col>
				</Row>

				{/* Bản quyền */}
				<Row>
					<Col style={{ textAlign: 'center' }}>
						<p style={copyrightStyle}>
							© {new Date().getFullYear()} Bản quyền thuộc về NghienDT. Mọi quyền được bảo lưu.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
