import React from 'react'
import { useLocation } from 'react-router-dom';
import Navigationbar from '../../components/NavigationBar/Navigationbar'

function Cart() {
  const location = useLocation();
  const items = location.state.items;
  console.log(items)

  return (
    <div>
      <Navigationbar />

      <h2>Items in Cart</h2>
      { items.map((item, index) => 
        <div className='item-container'>
          {item.disc.name}    ${item.disc.price}
        </div>
      )}
    </div>
  )
}

export default Cart