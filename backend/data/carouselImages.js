const baseCarouselPath = '/images/carousel'; // Đường dẫn cơ bản tới thư mục ảnh

const carouselImages = [
	{
		id: 1,
		image: `${baseCarouselPath}/slider1-home1.jpg`, // Ảnh cho slider 1
		title: 'Khuyến mãi hấp dẫn', // Tiêu đề của slider
		description: 'Giảm giá lên đến 50% cho tất cả sản phẩm!', // Mô tả ngắn
		
	},
	{
		id: 2,
		image: `${baseCarouselPath}/slider2.jpg`, // Ảnh cho slider 2
		title: 'Sản phẩm mới', // Tiêu đề của slider
		description: 'Khám phá bộ sưu tập mới nhất của chúng tôi.', // Mô tả ngắn
		
	},
	{
		id: 3,
		image: `${baseCarouselPath}/slider3.jpg`, // Ảnh cho slider 3
		title: 'Miễn phí giao hàng', // Tiêu đề của slider
		description: 'Miễn phí giao hàng cho đơn hàng từ 500.000 VNĐ.', // Mô tả ngắn
		
	},
];

export default carouselImages;
