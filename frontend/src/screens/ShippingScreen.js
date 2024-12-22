import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
    // Lấy thông tin địa chỉ giao hàng từ Redux state
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    // Khởi tạo state với thông tin sẵn có (nếu có)
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    };

    return (
        <FormContainer>
            {/* Bước thanh toán */}
            <CheckoutSteps step1 step2 />
            <h1 className="text-center">Địa Chỉ Giao Hàng</h1>

            <Form onSubmit={submitHandler} className="shadow p-4 mt-4 rounded">
                {/* Địa chỉ */}
                <Form.Group controlId="address" className="mb-3">
                    <Form.Label>Địa Chỉ</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        className="rounded"
                    />
                </Form.Group>

                {/* Thành phố */}
                <Form.Group controlId="city" className="mb-3">
                    <Form.Label>Thành Phố</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập thành phố"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                        className="rounded"
                    />
                </Form.Group>

                {/* Mã bưu điện */}
                <Form.Group controlId="postalCode" className="mb-3">
                    <Form.Label>Mã Bưu Điện</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập mã bưu điện"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="rounded"
                    />
                </Form.Group>

                {/* Quốc gia */}
                <Form.Group controlId="country" className="mb-4">
                    <Form.Label>Quốc Gia</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập quốc gia"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                        className="rounded"
                    />
                </Form.Group>

                {/* Nút tiếp tục */}
                <Row>
                    <Col className="text-center">
                        <Button type="submit" variant="success" size="lg" className="rounded">
                            Tiếp Tục
                        </Button>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
