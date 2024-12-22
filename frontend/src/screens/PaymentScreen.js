import React, { useState } from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
    // Lấy thông tin giao hàng từ Redux state
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping');
    }

    // Phương thức thanh toán mặc định
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <FormContainer>
            {/* Bước thanh toán */}
            <CheckoutSteps step1 step2 step3 />
            <h1 className="text-center">Phương Thức Thanh Toán</h1>

            <Card className="shadow-lg p-4 mt-4 rounded">
                <Form onSubmit={submitHandler}>
                    {/* Chọn phương thức thanh toán */}
                    <Form.Group>
                        <Form.Label as="legend" className="mb-4">
                            Vui Lòng Chọn Phương Thức Thanh Toán
                        </Form.Label>
                        <Col>
                            {/* PayPal/Thẻ Tín Dụng */}
                            <Form.Check
                                type="radio"
                                label={
                                    <>
                                        <i className="fab fa-paypal text-primary"></i> PayPal hoặc Thẻ Tín Dụng
                                    </>
                                }
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mb-3"
                            />
                            {/* Momo */}
                            <Form.Check
                                type="radio"
                                label={
                                    <>
                                        <i className="fas fa-mobile-alt text-success"></i> Ví Momo
                                    </>
                                }
                                id="Momo"
                                name="paymentMethod"
                                value="Momo"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mb-3"
                            />
                            {/* Thanh toán khi nhận hàng */}
                            <Form.Check
                                type="radio"
                                label={
                                    <>
                                        <i className="fas fa-hand-holding-usd text-warning"></i> Thanh Toán Khi Nhận Hàng
                                    </>
                                }
                                id="COD"
                                name="paymentMethod"
                                value="COD"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    {/* Nút tiếp tục */}
                    <Row className="text-center mt-4">
                        <Col>
                            <Button type="submit" variant="success" size="lg" className="rounded">
                                Tiếp Tục
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </FormContainer>
    );
};

export default PaymentScreen;
