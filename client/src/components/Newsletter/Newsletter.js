import React from 'react';
import './Newsletter.css';

function Newsletter() {
  return (
    <div className='newsletter-centering-container'>
        <div className='newsletter-container'>
            <h2>Sign up for our newsletter!</h2>
            <p>Subscribe to learn more about our products, be the first to hear about deals and discounts, and more!</p>
            <input type="email" className='email-input' title="email" placeholder="email" /> <br/>
            <button type="submit" className='subscribe-button'>Subscribe</button><br/>
        </div>
    </div>
  )
}

export default Newsletter