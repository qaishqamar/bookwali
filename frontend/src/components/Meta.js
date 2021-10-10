import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Book Wali',
  description:
    "Buy NCERT books for CBSE and JAC Board in Ranchi. Get books for Class 10, Class 11, Class 12 and other competitive exams. Don't like signing up on websites? No worries. Order books on Whatsapp or on a phone call.",
  keywords:
    'ncert book ranchi, book home delivery ranchi, online bookstore ranchi, buy books and stationaries online in ranchi',
}

export default Meta
