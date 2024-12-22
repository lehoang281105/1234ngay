import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const AboutUsScreen = () => {
  return (
    <Container className="py-5">
      {/* Introduction Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="mb-3 fw-bold text-dark">Về Chúng Tôi</h1>
          <p className="fs-5 text-secondary">
            Chào mừng đến với nền tảng thương mại điện tử của chúng tôi! Sứ mệnh của chúng tôi là mang lại trải nghiệm mua sắm trực tuyến vượt trội, nơi bạn có thể tìm thấy các sản phẩm chất lượng với giá tốt nhất.
          </p>
          <Button variant="warning" size="lg" href="#mission" className="mt-3">
            Tìm hiểu thêm
          </Button>
        </Col>
      </Row>

      {/* Mission Section */}
      <Row id="mission" className="mb-5">
        <Col md={6} className="d-flex align-items-center">
          <div className="text-center w-100">
            <h4 className="text-secondary">Hình ảnh sứ mệnh</h4>
          </div>
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2 className="mb-3 fw-bold text-dark">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="fs-6 text-secondary">
            Chúng tôi cam kết cung cấp sản phẩm chất lượng, giá trị tốt nhất và dịch vụ khách hàng tận tâm. Sứ mệnh của chúng tôi là xây dựng một cộng đồng mua sắm trực tuyến đáng tin cậy.
          </p>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4 fw-bold text-dark">Đội Ngũ Của Chúng Tôi</h2>
          <Row className="g-4">
            {[{
              name: 'Nguyễn Văn A',
              role: 'CEO'
            }, {
              name: 'Trần Thị B',
              role: 'CTO'
            }, {
              name: 'Lê Văn C',
              role: 'CMO'
            }].map((member, index) => (
              <Col md={4} key={index}>
                <Card className="shadow border-0 text-center">
                  <Card.Body>
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Text>{member.role}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Contact Section */}
      <Row className="bg-light py-5 rounded shadow">
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2 className="mb-3 fw-bold text-dark">Liên Hệ Chúng Tôi</h2>
          <p className="fs-6 text-secondary">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn! Hãy liên hệ với chúng tôi qua các kênh sau:
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:support@example.com">support@example.com</a><br />
            <strong>Phone:</strong> +1 234 567 890
          </p>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div className="text-center w-100">
            <h4 className="text-secondary">Hình ảnh liên hệ</h4>
          </div>
        </Col>
      </Row>

      {/* Call-to-Action Section */}
      <Row className="text-center mt-5">
        <Col>
          <h3 className="fw-bold text-dark">Hãy Tham Gia Cùng Chúng Tôi!</h3>
          <p className="fs-6 text-secondary">
            Trở thành một phần của cộng đồng mua sắm trực tuyến tuyệt vời. Đăng ký ngay để nhận các ưu đãi đặc biệt!
          </p>
          <Button variant="primary" size="lg" href="/register">
            Đăng Ký Ngay
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsScreen;
