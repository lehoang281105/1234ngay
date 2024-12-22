import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };

    return (
        <Row>
            <Col md={8}>
                <h1 className="mb-4">Giỏ Hàng</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Giỏ Hàng Của Bạn Trống? <Link to='/' className="text-primary"> Quay Lại </Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product} className="p-3 mb-3 rounded shadow">
                                <Row className="align-items-center">
                                    <Col md={2}>
                                        <Link to={`/product/${item.product}`}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                                className="hover-scale"
                                            />
                                        </Link>
                                    </Col>
                                    <Col md={4}>
                                        <Link to={`/product/${item.product}`} className="text-dark">
                                            <strong>{item.name}</strong>
                                        </Link>
                                        <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                                            Thương hiệu: {item.brand}
                                        </div>
                                    </Col>
                                    <Col md={2} className="text-primary">
                                        {item.discount ? (
                                            <>
                                                <del className="text-muted">
                                                    {new Intl.NumberFormat('vi-VN').format(item.price)} VNĐ
                                                </del>
                                                <br />
                                                {new Intl.NumberFormat('vi-VN').format(item.price - item.discount)} VNĐ
                                            </>
                                        ) : (
                                            `${new Intl.NumberFormat('vi-VN').format(item.price)} VNĐ`
                                        )}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(addToCart(item.product, Number(e.target.value)))
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2} className="text-center">
                                        <Button
                                            type="button"
                                            variant="danger"
                                            className="rounded-circle p-2"
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card className="shadow">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>
                                Tổng Cộng ({cartItems.reduce((acc, item) => acc + item.qty, 0)} sản phẩm)
                            </h3>
                            <div>
                                <strong>Tổng tiền:</strong>{' '}
                                {new Intl.NumberFormat('vi-VN').format(
                                    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
                                )}{' '}
                                VNĐ
                            </div>
                            <div>
                                <strong>Thuế (VAT 10%):</strong>{' '}
                                {new Intl.NumberFormat('vi-VN').format(
                                    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * 0.1
                                )}{' '}
                                VNĐ
                            </div>
                            <div className="text-success">
                                <strong>Tổng thanh toán:</strong>{' '}
                                {new Intl.NumberFormat('vi-VN').format(
                                    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * 1.1
                                )}{' '}
                                VNĐ
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block btn-primary"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Tiến Hành Thanh Toán
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
