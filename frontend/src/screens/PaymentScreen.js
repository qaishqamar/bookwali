import React, { useEffect, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import Message from '../components/Message'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  useEffect(() => {
    window.scrollTo(0,200)
  },[])

  return (
    <FormContainer
      style={{
        padding: '0',
        margin: '0',
      }}
    >
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Message variant='success' id='msg'>
        <strong>We also accept: </strong>
        <br />
        <ul
          style={{
            listStyle: 'square',
            padding: '0 0 0 12px',
          }}
        >
          <li>
            <strong>UPI</strong> - GooglePay, PhonePe, Paytm, etc
          </li>
          <li>
            <strong>Debit Card</strong> - Visa, MasterCard, Rupay
          </li>
          <li>
            <strong>Wallets</strong> - Paytm, etc.
          </li>
        </ul>
        when you order by Cash on Delivery.
        <hr/>
        <p>
          Call us on{' '}
          <a style={{ fontWeight: '700' }} href='tel:+919060373137'>
            +91 9060-3731-37
          </a>{' '}
          anytime to know about about available payment methods before placing your order.
        </p>
      </Message>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Cash on Delivery'
              id='cash-on-delivery'
              name='paymentMethod'
              value='cash-on-delivery'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Razorpay - Coming Soon'
              id='Razorpay'
              name='paymentMethod'
              value='Razorpay'
              disabled
              // onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='PayPal - Coming Soon'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              disabled
              // onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
