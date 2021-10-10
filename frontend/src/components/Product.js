import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ width, height, product }) => {
  // Calculating savings percent
  const perc = (Number(product.mrp - product.price) / product.mrp) * 100
  const percent = Math.floor(perc).toString().slice(0, 3)
  const shorten = (text) => {
		if (text.length <= 32) return text
		else {
			return text.slice(0, 31) + '...'
		}
	}

  return (
    <section
      style={{
        width: `${width}`,
        height: `${height}`,
      }}
    >
      <Card className='my-1 mx-1 rounded'>
        <Link aria-label={product.name} to={`/product/${product._id}`}>
          <Card.Img aria-label={product.name} src={product.image} variant='top' />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='h3'>{shorten(product.name)}</Card.Title>
          </Link>

          <Card.Text as='p' style={
            {
              color: '#063'
            }
          }>
            {product.category === 'Book' ? product.author : product.brand}
          </Card.Text>

          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          
          <Card.Text as='div'>
            &#x20B9;{' '}
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: '700',
              }}
            >
              {product.price + ' '}
            </span><br/>
            <span
              style={{
                color: '#222',
              }}
            >
              &#x20B9;{' '}<s>{product.mrp}</s>
            </span>
            <span
              style={{
                margin: '0 0.4rem',
                padding: '0.05rem 0.45rem',
                color: '#fff',
                fontSize: '0.84rem',
                verticalAlign: 'middle',
                borderRadius: '99rem',
                backgroundColor: '#196',
              }}
            >
              -{percent}%
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </section>
  )
}

export default Product
