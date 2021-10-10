import React from 'react'
import { Link } from 'react-router-dom'

const KeywordBar = () => {
  const keywords = ['Class 10', 'Class 11', 'Class 12', 'NCERT', 'JAC', 'CBSE', 'Best Book']
  return (
    <>
      <div
        style={{
          margin: '0.3rem 0',
          padding: '0.3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderTop: '2px solid #91b2d3',
          color: '#333382',
          overflow: 'scroll',
          width: '100%',
          height: 'calc(1.5em + 2rem + 0px)',
          scrollbarWidth: 'none'
        }}
      >
        {keywords.map((keyword) => (
          <span className='keyword-bar-items' key={keyword}>
            <Link to={`/search/${keyword}`}>{`# ${keyword}`}</Link>
          </span>
        ))}
      </div>
    </>
  )
}

export default KeywordBar
