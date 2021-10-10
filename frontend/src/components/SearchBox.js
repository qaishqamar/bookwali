import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type='text'
          name='q'
          title='seach box'
          aria-label='search box'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search for books...'
        ></Form.Control>
        <Button
          type='submit'
          variant='outline-success'
          style={{
            marginLeft: '0.25rem',
          }}
        >
          Search
        </Button>
      </Form>
    </>
  )
}

export default SearchBox
