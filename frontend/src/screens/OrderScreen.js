import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from '../actions/orderActions'
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

// Utility function for formatting decimals
const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

// Order Summary Component
const OrderSummary = ({ order, isAdmin, loadingDeliver, onDeliver }) => (
	<Card>
		<ListGroup variant="flush">
			<ListGroup.Item>
				<h2>Tóm Tắt Đơn Hàng</h2>
			</ListGroup.Item>
			<ListGroup.Item>
				<Row>
					<Col>Sản Phẩm</Col>
					<Col>{order.itemsPrice} VNĐ</Col>
				</Row>
			</ListGroup.Item>
			<ListGroup.Item>
				<Row>
					<Col>Giao Hàng</Col>
					<Col>{order.shippingPrice} VNĐ</Col>
				</Row>
			</ListGroup.Item>
			<ListGroup.Item>
				<Row>
					<Col>Thuế</Col>
					<Col>{order.taxPrice} VNĐ</Col>
				</Row>
			</ListGroup.Item>
			<ListGroup.Item>
				<Row>
					<Col><strong>Tổng</strong></Col>
					<Col><strong>{order.totalPrice} VNĐ</strong></Col>
				</Row>
			</ListGroup.Item>
			{!order.isPaid && (
				<ListGroup.Item>
					<PayPalButton
						amount={order.totalPrice}
						onSuccess={(paymentResult) => onDeliver(paymentResult)}
					/>
				</ListGroup.Item>
			)}
			{loadingDeliver && <Loader />}
			{isAdmin && order.isPaid && !order.isDelivered && (
				<ListGroup.Item>
					<Button
						type="button"
						className="btn btn-block"
						onClick={onDeliver}
					>
						Đánh Dấu Là Đã Giao
					</Button>
				</ListGroup.Item>
			)}
		</ListGroup>
	</Card>
)

const OrderScreen = ({ match }) => {
	const orderId = match.params.id
	const [sdkReady, setSdkReady] = useState(false)
	const dispatch = useDispatch()

	// Redux state selectors
	const orderDetails = useSelector((state) => state.orderDetails)
	const { order, loading, error } = orderDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const orderPay = useSelector((state) => state.orderPay)
	const { loading: loadingPay, success: successPay } = orderPay

	const orderDeliver = useSelector((state) => state.orderDeliver)
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver

	if (!loading && order) {
		// Calculate prices
		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		)
	}

	useEffect(() => {
		const addPayPalScript = async () => {
			if (!window.paypal) {
				const { data: clientId } = await axios.get('/api/config/paypal')
				const script = document.createElement('script')
				script.type = 'text/javascript'
				script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
				script.async = true
				script.onload = () => setSdkReady(true)
				document.body.appendChild(script)
			} else {
				setSdkReady(true)
			}
		}

		if (!order || successPay || successDeliver || order._id !== orderId) {
			dispatch({ type: ORDER_PAY_RESET })
			dispatch({ type: ORDER_DELIVER_RESET })
			dispatch(getOrderDetails(orderId))
		} else if (!order.isPaid) {
			addPayPalScript()
		}
	}, [dispatch, orderId, successPay, successDeliver, order])

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult))
	}

	const deliverHandler = () => {
		dispatch(deliverOrder(order))
	}

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<Link
				to={userInfo.isAdmin ? '/admin/orderlist' : '/profile'}
				className="btn btn-light my-3"
			>
				Quay Lại
			</Link>
			<h1>Order {order._id}</h1>
			<Row>
				{/* Left Section: Order Details */}
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Giao Hàng</h2>
							<p>
								<strong>Tên: </strong> {order.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Địa Chỉ: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
								{order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Đã Giao {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">Chưa Giao</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Phương Thức Thanh Toán</h2>
							<p>
								<strong>Phương Thức: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">
									Đã Thanh Toán {order.paidAt}
								</Message>
							) : (
								<Message variant="danger">Chưa Thanh Toán</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Sản Phẩm Trong Giỏ Hàng</h2>
							{order.orderItems.length === 0 ? (
								<Message>Giỏ Hàng Của Bạn Trống</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
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
												<Col md={4}>
													{item.qty} x {item.price} VNĐ ={' '}
													{item.qty * item.price} VNĐ
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
					<OrderSummary
						order={order}
						isAdmin={userInfo.isAdmin}
						loadingDeliver={loadingDeliver}
						onDeliver={deliverHandler}
					/>
				</Col>
			</Row>
		</>
	)
}

export default OrderScreen
