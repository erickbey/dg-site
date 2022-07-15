import React from 'react';
import './ProductCard.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function ProductCard({ name, manufacture, price, image }) {
  return (
    <div className='product-container'>
        <div className='product-image'>
          <img className='discImage' src={require(`../../images/${image}`)} alt='disc' />
        </div>
        <div className='product-content-container'>
          <h2 className='content-text'>{manufacture} {name}</h2>
          <h3 className='content-text-description'>${price}</h3>
          <div className='buttons-container'>
            <button type="submit" className='cart-button'><AddCircleOutlineOutlinedIcon /></button><br/>
            <button type="submit" className='wishlist-button'><FavoriteBorderOutlinedIcon /></button><br/>
          </div>
        </div>
    </div>
  )
}

export default ProductCard
