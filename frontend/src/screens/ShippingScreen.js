import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import CityAddress from './CityAddress'
import '../constants/globalVar'


const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [buyerName, setBuyerName] = useState("")
  const [phone, setPhone] = useState("")
  const [phone2, setPhone2] = useState("")
  const [pinCode, setPincode] = useState("834009")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [charge, setCharge] = useState(0)
  const [totalCharge, setTotalCharge] = useState(0)
  const [country, setCountry] = useState("India")
  const dispatch = useDispatch()

  
  
  const submitHandler = (e) => {
    setCity(global.cityName)
    setPincode(global.pinNo)
    setTotalCharge(global.totalMrp+charge)
    e.preventDefault()
    dispatch(saveShippingAddress({ buyerName, phone, phone2, pinCode, address2, city, totalCharge, country }))
    history.push('/payment/#msg')
  }
  // const styleCharge=()=>{
  //   fontSize: 14;
  //   color:'blue';
  // }
  



  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='buyerName'>
          <Form.Label>Buyer Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your name ...'
            value={buyerName}
            required
            onChange={(e) => setBuyerName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone'>
          <Form.Label>Phone No. </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Phone no. ...'
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group controlId='phone2'>
          <Form.Label>Second Phone No. </Form.Label>
          <Form.Control
            type='text'
            placeholder='Optional ...'
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <CityAddress setAdd ={charge =>setCharge(charge)}/> 
          {/* <Form.Control
              
            type='text'
            placeholder='Enter house / appartment no., society / colony name, ...'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          >
           */}
           
          {/* </Form.Control> */}
        </Form.Group>

        <Form.Group controlId='address2'>
          <Form.Label>Locality</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter landmark, nearby police station / post office, etc ...'
            value={address2}
            required
            onChange={(e) => setAddress2(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='charge'>

          <Form.Label>Shiping Charge :</Form.Label>
          <Form.Label className="chargeValue">{charge}</Form.Label>
      
        </Form.Group>

        <Form.Group controlId='totalCost'>
          <Form.Label>Total Cost  :</Form.Label>
          
          <Form.Label> {global.totalMrp+charge}</Form.Label>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            disabled
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
