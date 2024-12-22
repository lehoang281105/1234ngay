import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Image, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State để lưu giá trị tìm kiếm
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history]);

  // Lọc đơn hàng dựa trên tên người dùng
  const filteredOrders = orders
    ? orders.filter((order) =>
        order.user &&
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <h1>Đơn Hàng</h1>
      <Form.Group controlId="search" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm theo tên người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>ID</th>
              <th>User</th>
              <th>Ngày</th>
              <th>Tổng</th>
              <th>Đã Thanh Toán</th>
              <th>Đã Giao</th>
              <th>Chi Tiết</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                {/* Cột ảnh sản phẩm */}
                <td>
                  {order.orderItems && order.orderItems.length > 0 ? (
                    <Image
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      fluid
                      rounded
                      style={{ width: '50px', height: '50px' }}
                    />
                  ) : (
                    <i
                      className="fas fa-box"
                      style={{ fontSize: '2rem', color: 'gray' }}
                    ></i>
                  )}
                </td>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice} VND</td>
                <td>
                  {order.isPaid ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: 'green' }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-times-circle"
                      style={{ color: 'red' }}
                    ></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: 'green' }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-times-circle"
                      style={{ color: 'red' }}
                    ></i>
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
      )}
    </>
  );
};

export default OrderListScreen;
