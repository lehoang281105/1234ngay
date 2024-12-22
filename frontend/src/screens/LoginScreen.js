import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className="text-center">Đăng Nhập</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <Form onSubmit={submitHandler}>
        {/* Email Field */}
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Mật Khẩu</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Form.Check
            type="checkbox"
            label="Hiển thị mật khẩu"
            className="mt-2"
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>

        {/* Login Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-100"
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
        </Button>
      </Form>

      {/* Registration Link */}
      <Row className="py-3">
        <Col className="text-center">
          Người Dùng Mới?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Đăng Ký
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
