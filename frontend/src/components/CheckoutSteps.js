import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ steps }) => {
	return (
		<Nav className="justify-content-center mb-4">
			{steps.map((step, index) => (
				<Nav.Item key={index}>
					{step.enabled ? (
						<LinkContainer to={step.link}>
							<Nav.Link>{step.label}</Nav.Link>
						</LinkContainer>
					) : (
						<Nav.Link disabled>{step.label}</Nav.Link>
					)}
				</Nav.Item>
			))}
		</Nav>
	);
};

// Kiểm tra kiểu dữ liệu với PropTypes
CheckoutSteps.propTypes = {
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired,
			enabled: PropTypes.bool.isRequired,
		})
	).isRequired,
};

// Dữ liệu đầu vào (steps)
const stepsData = [
	{ label: 'Đăng Nhập', link: '/login', enabled: true },
	{ label: 'Giao Hàng', link: '/shipping', enabled: true },
	{ label: 'Thanh Toán', link: '/payment', enabled: false },
	{ label: 'Đặt Hàng', link: '/placeorder', enabled: false },
];

// Component chính để sử dụng
const App = () => {
	return <CheckoutSteps steps={stepsData} />;
};

export default App;
