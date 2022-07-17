import React from 'react';
import './ProductCard.css';

function ProductCard({ id, name, manufacture, price, image }) {
  return (
    <div className='product-container'>
        <div className='product-image'>
          <img className='discImage' src={require(`../../images/${image}`)} alt='disc' />
        </div>
        <div className='product-content-container'>
          <h2 className='content-text'>{manufacture} {name}</h2>
          <h3 className='content-text-description'>${price}</h3>
        </div>
    </div>
  )
}

export default ProductCard
