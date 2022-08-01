import React from 'react';
import './SuccessMessage.css';

function SuccessMessage({ message }) {
  return (
    <div className='success-message-container' style={{position:"absolute", top:300}}>
        <h2>{message}</h2>
    </div>
  )
}

export default SuccessMessage;