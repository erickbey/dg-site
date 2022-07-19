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
        <h2>My Orders</h2>

        <div className='centering-div'>
          <div className='flex-container'>
            { userOrders.map((order, index) => 
                <div className='order-container'>
                  {order.items.map((item, index) => 
                    <p>Item: {item.name}  Price: ${item.price}</p>
                  )}
                </div>
          )}
          </div>
        </div>
    </div>
  )
}

export default MyOrders