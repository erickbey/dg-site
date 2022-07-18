import React from 'react';
import './MyProfile.css';
import Navigationbar from '../../components/NavigationBar/Navigationbar';
import MyInformation from './MyInformation/MyInformation';
import ChangePassword from './ChangePassword/ChangePassword';
import MyOrders from './MyOrders/MyOrders';
import MyReviews from './MyReviews/MyReviews';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../queries/UserQueries';

function MyProfile() {

  useQuery(GET_USER, {
    onCompleted: (userData) => {
      if(userData.user) {
        console.log(userData.user);
      }
      return null
    }
  });

  return (
    <div>
        <Navigationbar />
        
        <MyInformation />

        {/* make a link to each of these and let them have there own page or just use modals */}
        <ChangePassword />

        <MyReviews />

        <MyOrders />

        {/* wishlist */}
    </div>
  )
}

export default MyProfile