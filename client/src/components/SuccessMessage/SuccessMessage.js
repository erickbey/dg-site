import React from 'react'

function SuccessMessage({ message }) {
  return (
    <div className='success-message-container' style={{backgroundColor:"green", fontWeight:600, position:"absolute", top:300}}>
        <h2>{message}</h2>
    </div>
  )
}

export default SuccessMessage