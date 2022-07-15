import React from 'react'

function SuccessMessage() {
  return (
    <div className='success-message-container' style={{backgroundColor:"green", fontWeight:600, position:"absolute", top:300}}>
        <h2>Your Account has been successfully added!</h2>
    </div>
  )
}

export default SuccessMessage