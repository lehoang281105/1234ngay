import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // Lấy danh sách người dùng
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  // Lấy thông tin đăng nhập
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Xử lý xóa người dùng
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, loading: loadingDelete, error: errorDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      dispatch(deleteUser(id));
    }
  };

  // Lọc danh sách người dùng
  const filteredUsers = users ? users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <>
      <h1>Quản Lý Người Dùng</h1>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm theo tên..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Thông báo trạng thái xóa người dùng */}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successDelete && (
        <Alert variant="success">
          Người dùng đã được xóa thành công!
        </Alert>
      )}

      {/* Danh sách người dùng */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Trạng Thái</th>
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="text-center">
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>{user.isAdmin ? 'Quản trị viên' : 'Người dùng'}</td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
