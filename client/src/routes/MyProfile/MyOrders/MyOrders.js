import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Navigationbar from '../../../components/NavigationBar/Navigationbar';
import { GET_USER } from '../../../queries/UserQueries';
import './MyOrders.css';

function MyOrders() {
  const [userOrders, setUserOrders] = useState([]);

  useQuery(GET_USER, {
    onCompleted: (data) => {
      if(data.user !== null) {
        setUserOrders(data.user.orders);
      } else {
        return null
      }
    }
  });

  return (
    <div className='orders-page-container'>
      <Navigationbar />
        
        <div className='centering-div'>
          <div className='flex-container'>
            <h2>My Orders</h2>
            {!userOrders
            ? <p>You have not made any orders yet</p>
            : userOrders.map((order, index) => 
                <div className='order-container'>
                  {order.items.map((item, index) => 
                    <div className='each-item-container'>
                      <img
                        className="cart-disc-image"
                        src={require(`../../../images/${item.image}`)}
                        alt="disc"
                      />
                      <p>{item.name}</p> 
                      <p>${item.price}</p>
                    </div>
                  )}
                </div>
          )}
            
          </div>
        </div>
    </div>
  )
}

export default MyOrders