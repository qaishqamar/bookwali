import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <h2>Links</h2>
        <section>
          <div>
            <Link className='footer-links' to='/'>
              Home
            </Link>
          </div>
          <div>
            <Link className='footer-links' to='/contact'>
              Contact Us
            </Link>
            <ul style={
              {
                listStyle: 'none',
                marginTop: '0.5rem',
                paddingLeft: '0.5rem'
              }
            }>
              <li>
                <span style={
                  {
                    transform: 'rotateZ(90deg)',
                  }
                } className='fas fa-phone'></span>
                {' : '}
                <a className='contact-links' href='tel:+919060373137'>
                  +91 9060-3731-37
                </a>
              </li>
              <li>
                <span className='fab fa-whatsapp'></span>{' : '}
                <a className='contact-links' href='https://wa.me/message/KRXB55NGWO4KA1' target='_blank' rel='noopener noreferrer'>
                  Chat on Whatsapp
                </a>
              </li>
              <li>
                <span className='fas fa-envelope'></span>{' : '}
                <a
                  className='contact-links'
                  href='mailto:bookwalistore@gmail.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  bookwalistore@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <Link className='footer-links' to='/about'>
              About Us
            </Link>
          </div>
        </section>
        <hr style={
          {
            background: 'white',
            marginBottom: '0'
          }
        }/>
        <Row>
          <Col className='text-center py-3 footer-text'>
            Copyright &copy; bookwali.in
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
