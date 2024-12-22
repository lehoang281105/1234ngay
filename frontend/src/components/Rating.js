import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
	// Hàm trả về class icon theo giá trị
	const getStarClass = (index) => {
		if (value >= index) return 'fas fa-star';
		if (value >= index - 0.5) return 'fas fa-star-half-alt';
		return 'far fa-star';
	};

	// Đảm bảo giá trị value nằm trong khoảng 0-5
	const sanitizedValue = Math.min(Math.max(value, 0), 5);

	return (
		<div className="rating">
			{[1, 2, 3, 4, 5].map((star) => (
				<span key={star}>
					<i style={{ color }} className={getStarClass(star)}></i>
				</span>
			))}
			{/* Hiển thị text nếu có */}
			{text && <span className="rating-text">{text}</span>}
		</div>
	);
};

Rating.defaultProps = {
	color: '#f8e825',
	value: 0,
	text: '',
};

Rating.propTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string,
	color: PropTypes.string,
};

export default Rating;
