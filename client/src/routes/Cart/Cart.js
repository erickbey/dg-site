import React, { useState } from 'react';
import './Cart.css';
import { useLocation } from 'react-router-dom';
import Navigationbar from '../../components/NavigationBar/Navigationbar'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_ORDER_MUTATION } from '../../queries/OrderQueries';
import { GET_USER } from '../../queries/UserQueries';

function Cart() {
  // const [userId, SetUserId] = useState("")

  const location = useLocation();
  const items = location.state.items;

  let cartTotal = 0;
  let itemIds = [];

  // useQuery(GET_USER, {
  //   onCompleted: (data) => {
  //     if(data.user !== null) {
  //       SetUserId(data.user.id);
  //     } else {
  //       return null
  //     }
  //   }
  // });

  const [addOrder] = useMutation(ADD_ORDER_MUTATION, {onCompleted: (data) => console.log(data)});

  const handleCheckout = () => {    
    addOrder({
        variables: {
          items: itemIds
        }
    });
  }

  // console.log(userId)
  console.log(itemIds)

  return (
    <div>
      <Navigationbar />

      <h2>Items in Cart</h2>
      { items.map((item, index) => 
        <div className='item-container'>
          {cartTotal += item.disc.price} {itemIds.push(item.disc.id)}
          {item.disc.name}    ${item.disc.price}
        </div>
      )}
      {cartTotal}
      <button className='checkout-button' onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default Cart