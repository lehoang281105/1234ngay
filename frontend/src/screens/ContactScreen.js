import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';

const ContactScreen = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#343a40' }}>Liên Hệ</h1>

      {/* Success Alert */}
      {submitted && (
        <Alert
          variant="success"
          onClose={() => setSubmitted(false)}
          dismissible
          className="text-center"
        >
          Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.
        </Alert>
      )}

      <Row className="mb-5">
        {/* Contact Form */}
        <Col md={6} className="d-flex flex-column justify-content-center">
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên của bạn"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email của bạn"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Tin Nhắn</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Nhập tin nhắn của bạn"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" size="lg" className="w-100">
              Gửi
            </Button>
          </Form>
        </Col>

        {/* Contact Info */}
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h3 style={{ fontWeight: 'bold', color: '#343a40' }}>Thông Tin Liên Hệ</h3>
          <p>
            <strong>Email:</strong> support@reactecommerce.com
          </p>
          <p>
            <strong>Số Điện Thoại:</strong> 0123 456 789
          </p>
          <p>
            <strong>Địa Chỉ:</strong> 122 Hoàng Quốc Việt
          </p>
          <div className="mt-4">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.652829451405!2d105.78959557503194!3d21.04657278060721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab303c8fa8dd%3A0xa221c6abb139912a!2zVmnhu4duIEtob2EgaOG7jWMgS-G7uSB0aHXhuq10IELGsHUgxJFp4buHbiwgMTIyIEhvw6BuZyBRdeG7kWMgVmnhu4d0LCBD4buVIE5odeG6vywgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1734801658984!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactScreen;
