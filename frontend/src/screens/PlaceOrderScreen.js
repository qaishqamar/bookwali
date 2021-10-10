import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(
    cart.itemsPrice < 100 ? 29 : cart.itemsPrice < 250 ? 24 : 19
  )
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                <p>
                  <strong>Name: </strong> {cart.shippingAddress.buyerName}
                </p>
                <p>
                  <strong>Phone: </strong> {`+91 ${cart.shippingAddress.phone}`}
                </p>
                <p>
                  <strong>2nd Phone: </strong>
                  {cart.shippingAddress.phone2
                    ? '+91 ' + cart.shippingAddress.phone2
                    : 'Not provided'}
                </p>
                {cart.shippingAddress.address}, {cart.shippingAddress.address2},{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col
                          md={3}
                          style={{
                            flex: '0 0 100%',
                            maxWidth: '100%',
                          }}
                        >
                          <Message variant='success'>
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
                            style={{
                              width: '4rem',
                              height: '4rem',
                            }}
                          />
                        </Col>

                        <Col>
                          {item.qty} x &#x20B9;{item.price} = <br />
                          &#x20B9;
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
          <Message variant='success'>
            <h2>Shipping Price Update</h2>
            <hr />
            <span style={{ color: '#800' }}>PLEASE NOTE:</span> We have updated
            our shipping prices. All new orders will be charged as following.
            <h3>Ranchi Prices</h3>
            <Row>
              <Col>&#x20B9; 1-99</Col>
              <Col>&#x20B9;29</Col>
            </Row>
            <hr/>
            <Row>
              <Col>&#x20B9; 100-249</Col>
              <Col>&#x20B9;24</Col>
            </Row>
            <hr/>
            <Row>
              <Col>&#x20B9; 250 & Above</Col>
              <Col>&#x20B9;19</Col>
            </Row>
            <hr/>
          </Message>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>&#x20B9;{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>&#x20B9;{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>&#x20B9;{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
