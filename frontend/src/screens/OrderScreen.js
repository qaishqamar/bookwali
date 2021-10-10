import React, { useEffect } from 'react'
// import axios from 'axios'
// Paypal stuff
// import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  // Paypal stuff
  // const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    // Paypal stuff
    // const addPayPalScript = async () => {
    //   const { data: clientId } = await axios.get('/api/config/paypal')
    //   const script = document.createElement('script')
    //   script.type = 'text/javascript'
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    //   script.async = true
    //   script.onload = () => {
    //     setSdkReady(true)
    //   }
    //   document.body.appendChild(script)
    // }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      // Paypal stuff
      // if (!window.paypal) {
      //   addPayPalScript()
      // } else {
      //   setSdkReady(true)
      // }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo])

  // const successPaymentHandler = (paymentResult) => {
  //   console.log(paymentResult)
  //   dispatch(payOrder(orderId, paymentResult))
  // }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h2>Order details</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Shipping</h3>
              {userInfo && userInfo.isAdmin ? (
                <>
                  <p>
                    <strong>Name: </strong> {order.shippingAddress.buyerName}
                  </p>
                  <p>
                    <strong>Phone: </strong>{' '}
                    <a style={
                      {
                        color: '#080'
                      }
                    } href={`tel:+91${order.shippingAddress.phone}`}>
                      {order.shippingAddress.phone}
                    </a>
                  </p>
                  <p>
                    <strong >2nd Phone: </strong>{' '}
                    <a style={
                      {
                        color: '#080'
                      }
                    } href={`tel:+91${order.shippingAddress.phone2}`}>
                      {order.shippingAddress.phone2}
                    </a>
                  </p>
                </>
              ) : (
                <>
                  <Message variant='success'>
                    <span
                      style={{
                        fontSize: '1.3rem',
                        fontWeight: '400',
                      }}
                    >
                      Thank you for shopping with us!
                    </span>
                    <hr />
                    <p>
                      Please don't hesitate to contact us for any details
                      regarding your order.
                    </p>
                    <p>
                      <span>Call us: </span>
                      <a href={`tel:+919060373137`}>+91 9060-3731-37</a>
                      <br />
                      <span>Email Us: </span>
                      <a href={`mailto:bookwalistore@gmail.com`}>
                        bookwalistore@gmail.com
                      </a>
                    </p>
                  </Message>
                </>
              )}
              <p>
                <h3>Address: </h3>
                <strong>{order.shippingAddress.buyerName}</strong>
                <br />
                {order.shippingAddress.address},<br />
                {order.shippingAddress.address2},<br />
                {order.shippingAddress.city},<br />
                {order.shippingAddress.postalCode},<br />
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Message variant="success">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          </Message>
                        </Col>
                        <Col>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            fluid
                            style={
                              {
                                width: '4rem',
                                height: '4rem',
                              }
                            }
                          />
                        </Col>
                        
                        <Col>
                          {item.qty} x &#x20B9;{item.price} = <br />&#x20B9;
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Order ID:</Col>
                  <Col>{order._id}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>&#x20B9;{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>&#x20B9;{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>&#x20B9;{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <h3>Cash on Delivery</h3>}
                  {/* Paypal stuff */}
                  {/* {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )} */}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
