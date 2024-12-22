import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const Banner = ({ position }) => {
  const banners = [
    '/images/banner/img1-top-sinrato1.jpg', 
    '/images/banner/img2-top-sinrato1.jpg',    
    '/images/banner/img3-top-sinrato1.jpg',  
    '/images/banner/category-image.jpg',  
  ];

  // Lựa chọn banner hiển thị dựa trên vị trí
  const selectedBanners = position === 'middle' 
    ? banners.slice(0, 3) // Lấy 3 banner đầu
    : [banners[3]];       // Lấy banner cuối cùng

  return (
    <Container className="py-5">
      <Row className="text-center">
        {selectedBanners.map((banner, index) => (
          <Col key={index} sm={12} md={4} className="mb-3">
            <img src={banner} alt={`Banner ${index + 1}`} className="img-fluid" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Banner;
