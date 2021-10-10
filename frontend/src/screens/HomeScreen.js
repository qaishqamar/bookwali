import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import KeywordBar from '../components/KeywordBar'
import { Helmet } from 'react-helmet'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      <Helmet>
        <link rel='canonical' href='https://www.bookwali.in/' />
        <meta property='og:url' content='https://www.bookwali.in/' />
        <meta property='og:title' content='Book Wali' />
        <meta property='og:type' content='website' />
        <meta
          property='og:description'
          content='Buy NCERT books for CBSE and JAC Board in Ranchi. Get books for Class 10, Class 11, Class 12 and other competitive exams.'
        />
        <meta
          property='og:image'
          content='https://www.bookwali.in/logo192.png'
        />
      </Helmet>
      {!keyword ? (
        <>
          <KeywordBar />
          <ProductCarousel />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h2 style={{ borderBottom: '2px solid black', maxWidth: '25rem' }}>
            <span style={{ fontSize: '1rem' }}>In</span> Books
          </h2>
          <Row xs={2}>
            {products.map((product) =>
              product.category === 'Book' ? (
                <Col
                  style={{
                    width: '10fr',
                    height: '24fr',
                  }}
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Product width={'10fr'} height={'16fr'} product={product} />
                </Col>
              ) : (
                ''
              )
            )}
          </Row>
          <p
            className='alert-success'
            style={{
              padding: '1rem',
              textAlign: 'center',
              fontSize: '1.1rem',
            }}
          >
            Can't find what you're looking for?
            <br />
            <Link to='/contact'>
              <Button
                variant='success'
                style={{
                  margin: '1rem 0',
                }}
              >
                <i className='fas fa-book'></i>
                <span> make a book listing request</span>
              </Button>
            </Link>
            <br />
            We'll make it available <span>within a few hours</span> if possible.
          </p>
          <h2 style={{ borderBottom: '2px solid black', maxWidth: '25rem' }}>
            <span style={{ fontSize: '1rem' }}>In</span> Stationaries
          </h2>
          <Row xs={2}>
            {products.map((product) =>
              product.category === 'Stationary' ? (
                <Col
                  style={{
                    width: '24fr',
                    height: '16fr',
                  }}
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Product width={'16fr'} height={'10fr'} product={product} />
                </Col>
              ) : (
                ''
              )
            )}
          </Row>
          <h2 style={{ borderBottom: '2px solid black', maxWidth: '25rem' }}>
            <span style={{ fontSize: '1rem' }}>In</span> More Products
          </h2>
          <Row xs={2}>
            {products.map((product) =>
              product.category !== 'Stationary' ? (
                product.category !== 'Book' ? (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ) : (
                  ''
                )
              ) : (
                ''
              )
            )}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
