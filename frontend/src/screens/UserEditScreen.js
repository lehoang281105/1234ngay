import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  // State selectors
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, user, userId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Tên và email không được để trống!');
      return;
    }
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        <i className='fas fa-arrow-left'></i> Quay Lại
      </Link>
      <FormContainer>
        <h1>Chỉnh Sửa Thông Tin Người Dùng</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Alert variant='danger'>
            <i className='fas fa-exclamation-circle'></i> {errorUpdate}
          </Alert>
        )}

        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant='danger'>
            <i className='fas fa-exclamation-circle'></i> {error}
          </Alert>
        ) : (
          <Form onSubmit={submitHandler}>
            {/* Tên */}
            <Form.Group controlId='name' className='mb-3'>
              <Form.Label>
                <strong>Tên</strong>
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập tên'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId='email' className='mb-3'>
              <Form.Label>
                <strong>Email</strong>
              </Form.Label>
              <Form.Control
                type='email'
                placeholder='Nhập email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {/* Admin */}
            <Form.Group controlId='isAdmin' className='mb-3'>
              <Form.Check
                type='checkbox'
                label='Quyền Quản Trị Viên'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            {/* Nút cập nhật */}
            <Button type='submit' variant='primary' className='w-100'>
              <i className='fas fa-save'></i> Cập Nhật
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserScreen;
