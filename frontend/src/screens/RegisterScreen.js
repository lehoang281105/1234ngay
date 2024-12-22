import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner, ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    return strength;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setMessage('Vui lòng điền đầy đủ thông tin!');
    } else if (password !== confirmPassword) {
      setMessage('Mật khẩu không khớp!');
    } else if (validatePassword(password) < 50) {
      setMessage('Mật khẩu chưa đủ mạnh!');
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordStrength(validatePassword(value));
  };

  return (
    <FormContainer>
      <h1 className="text-center">Đăng Ký</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <Form onSubmit={submitHandler}>
        {/* Name Field */}
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

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
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
          />
          <ProgressBar
            now={passwordStrength}
            label={`${passwordStrength}%`}
            className="mt-2"
            variant={
              passwordStrength < 50
                ? 'danger'
                : passwordStrength < 75
                ? 'warning'
                : 'success'
            }
          />
        </Form.Group>

        {/* Confirm Password Field */}
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Nhập Lại Mật Khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Register Button */}
        <Button type="submit" variant="primary" className="w-100" disabled={loading}>
          Đăng Ký
        </Button>
      </Form>

      {/* Login Link */}
      <Row className="py-3">
        <Col className="text-center">
          Đã Có Tài Khoản?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Đăng Nhập
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
