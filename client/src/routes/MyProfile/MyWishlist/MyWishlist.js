import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Navigationbar from '../../../components/NavigationBar/Navigationbar';
import { GET_USER } from '../../../queries/UserQueries';
import './MyWishlist.css';

function MyWishlist() {
  const [userWishlist, setUserWishlist] = useState([]);

  useQuery(GET_USER, {
    onCompleted: (data) => {
      if(data.user !== null) {
        setUserWishlist(data.user.wishlist);
      } else {
        return null
      }
    }
  });
  return (
    <div className='wishlist-page-container'>
      <Navigationbar />
      
      <h2>My Wishlist</h2>
        <div className='centering-div'>
          <div className='flex-container'>
            { userWishlist.map((item, index) => 
              <div className='wishlist-item-container'>
                <p>Disc: {item.name}</p>
                <p>Price: {item.price}</p>
              </div>
            )}
          </div>
      </div>
    </div>
  )
}

export default MyWishlist