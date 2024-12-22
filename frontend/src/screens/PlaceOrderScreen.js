import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    // Hàm tính giá trị có định dạng 2 số thập phân
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    // Tính toán giá
    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 1000 ? 0 : 150);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = addDecimals(
        (
            Number(cart.itemsPrice) +
            Number(cart.shippingPrice) +
            Number(cart.taxPrice)
        ).toFixed(2)
    );

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: USER_DETAILS_RESET });
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [history, success, dispatch, order]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                {/* Left Section: Order Details */}
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2 className="text-primary">Giao Hàng</h2>
                            <p>
                                <strong>Địa Chỉ: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className="text-primary">Phương Thức Thanh Toán</h2>
                            <p>
                                <strong>Phương Thức: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className="text-primary">Sản Phẩm Trong Giỏ Hàng</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Giỏ Hàng Của Bạn Trống</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index} className="border-0">
                                            <Row className="align-items-center">
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4} className="text-right">
                                                    {item.qty} x {item.price.toLocaleString()} VND ={' '}
                                                    {(item.qty * item.price).toLocaleString()} VND
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                {/* Right Section: Order Summary */}
                <Col md={4}>
                    <Card className="shadow-lg rounded">
                        <ListGroup variant="flush">
                            <ListGroup.Item className="bg-primary text-white">
                                <h2 className="text-center">Tóm Tắt Đơn Hàng</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Sản Phẩm:</Col>
                                    <Col className="text-right">{cart.itemsPrice.toLocaleString()} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Phí Giao Hàng:</Col>
                                    <Col className="text-right">{cart.shippingPrice.toLocaleString()} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Thuế (15%):</Col>
                                    <Col className="text-right">{cart.taxPrice.toLocaleString()} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Tổng Cộng:</strong>
                                    </Col>
                                    <Col className="text-right">
                                        <strong>{cart.totalPrice.toLocaleString()} VND</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item className="text-center">
                                <Button
                                    type="button"
                                    className="btn-block btn-lg"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                    variant="success"
                                >
                                    Đặt Hàng
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
