import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Meta from '../components/Meta'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
  
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  
  const whatsappHandler = () => {
    const return_k = '%0D%0A' //enter key in urlencoded format
    const space_k = '+' //space key in urlencoded format
    const products_nameAndQty = cartItems.map( item => `${item.name}${space_k}x${space_k}${item.qty}`)
    const text = `I${space_k}want${space_k}to${space_k}buy:${space_k}${return_k}${products_nameAndQty.map(item => return_k + item)}`
    const whatsapp_url = `https://api.whatsapp.com/send?phone=919060373137&text=Hi!${return_k}`
    window.location.href = `${whatsapp_url}${text}${return_k}`
  }

  return (
    <Row>
      <Meta title="Cart"/>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item className='cart-items' key={item.product}>
                <Link
                  style={{
                    display: 'block',
                    margin: '1rem 0',
                    padding: '0.5rem',
                    backgroundColor: '#e7ffdf',
                  }}
                  to={`/product/${item.product}`}
                >
                  {item.name}
                </Link>

                <Image
                  src={item.image}
                  alt={item.name}
                  fluid
                  rounded
                  style={{
                    maxWidth: '64px',
                  }}
                />
                <span className='mr-3 ml-3' md={2}>
                  &#x20B9; {item.price}
                </span>

                <Form.Control
                  as='select'
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

                <Button
                  type='button'
                  variant='light'
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  <i className="fas fa-trash"></i>
                  <span> Delete</span>
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              &#x20B9;{' '}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                variant='success'
                disabled={cartItems.length === 0}
                onClick={whatsappHandler}
              >
                <i className="fab fa-whatsapp"></i>
                <span> Order on Whatsapp</span>
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Order here
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
