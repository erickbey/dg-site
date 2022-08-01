import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      
        <div className='centering-div'>
          <div className='flex-container'>
            <h2>My Wishlist</h2>
            { userWishlist.map((item, index) => 
            <Link to={`/products/${item}`} state={{disc: item}} style={{  color: 'inherit', textDecoration: 'inherit'}}>
              <div className='wishlist-item-container'>
                <img
                  className="cart-disc-image"
                  src={require(`../../../images/${item.image}`)}
                  alt="disc"
                />
                <p><span>{item.name}</span></p>
                <p><span>${item.price}</span></p>
              </div>
              </Link>
            )}
          </div>
      </div>
    </div>
  )
}

export default MyWishlist