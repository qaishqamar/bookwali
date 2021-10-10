import React, { useState, useEffect } from 'react'
import { Form, Button, FormGroup, FormControl } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'

const ContactScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [qry, setQry] = useState('Request book/product listing')
  const [msg, setMsg] = useState('')
  const [contactType, setContactType] = useState([
    {
      id: 1,
      query: 'Request book/product listing',
      sample_msg: 'Please add the following books/products on the website: ',
    },
    {
      id: 2,
      query: 'Buying books/stationaries',
      sample_msg: 'I have a question regarding a book/product item: ',
    },
    {
      id: 3,
      query: 'Orders/Deliveries',
      sample_msg: 'I want to know the status of my order: ',
    },
    {
      id: 4,
      query: 'Selling on bookwali',
      sample_msg: 'I am interested in selling books on your website: ',
    },
    {
      id: 5,
      query: 'Website issues, feature requests, suggestions',
      sample_msg: 'I found an issue on this page: ',
    },
    {
      id: 6,
      query: 'Other questions',
      sample_msg: 'I need help regarding: ',
    },
  ])

  // const redirect = location.search ? location.search.split('=')[1] : '/'

  const urlEncode = (text) => {
    text = text.replaceAll(' ','+')
  }
  const return_k = '%0D%0A' //enter key in urlencoded format
  
  const usertext = `I am ${name}.${return_k}${return_k}Query for: ${qry}${return_k}Message: ${msg}`

  const submitHandler = (e) => {
    e.preventDefault()
    // const text = urlEncode(usertext)
    const whatsapp_url = `https://api.whatsapp.com/send?phone=919060373137&text=Hi!${return_k}`
    window.location.href = `${whatsapp_url}${usertext}${return_k}${return_k}`
  }

  return (
    <FormContainer>
      <Meta title="Contact"/>
      <h2>Contact</h2>
      <Form onSubmit={submitHandler}>
          <FormGroup controlId='contactType'>
            <Form.Label>Contact us for: </Form.Label>
            <FormControl
              as='select'
              name='contactType'
              aria-selected
              className='form-control'
              
              onChange={(e) => {
                setQry(`${e.target.value}${return_k}`)
              }}
              >
                {(contactType.map((query) => 
                  <option key={query.id}>{query.query}</option>
                ))}
            </FormControl>
          </FormGroup>
          
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='message'>
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as='textarea'
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          {/* <p>{usertext}</p> */}

          <Button type='submit' variant='success'>
            <i className="fab fa-whatsapp"></i>
            <span> Send</span>
          </Button>
      </Form>

      {/* <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row> */}
    </FormContainer>
  )
}

export default ContactScreen
