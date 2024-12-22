import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Spinner, Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setMessage('Vui lòng điền đầy đủ thông tin!');
    } else if (password !== confirmPassword) {
      setMessage('Mật khẩu không khớp!');
    } else {
      setMessage(null);
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders ? orders.slice(indexOfFirstItem, indexOfLastItem) : [];

  const totalPages = Math.ceil(orders ? orders.length / itemsPerPage : 1);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Row>
      <Col md={3}>
        <h2>Thông Tin Người Dùng</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Thông Tin Đã Cập Nhật</Message>}
        {loading && (
          <div className="loading-overlay">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập Tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Mật Khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập Mật Khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Nhập Lại Mật Khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập Lại Mật Khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            Cập Nhật
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>Đơn Hàng Của Tôi</h2>
        {loadingOrders ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <>
            <Table bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Hình Ảnh</th>
                  <th>ID</th>
                  <th>Ngày</th>
                  <th>Tổng</th>
                  <th>Đã Thanh Toán</th>
                  <th>Đã Giao</th>
                  <th>Chi Tiết</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order.orderItems && order.orderItems.length > 0 ? (
                        order.orderItems.map((item) => (
                          <img
                            key={item.product}
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              marginRight: '5px',
                            }}
                          />
                        ))
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Chi Tiết
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {[...Array(totalPages).keys()].map((x) => (
                <Pagination.Item
                  key={x + 1}
                  active={x + 1 === currentPage}
                  onClick={() => handlePageChange(x + 1)}
                >
                  {x + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
