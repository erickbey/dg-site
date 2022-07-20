import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Navigationbar from '../../../components/NavigationBar/Navigationbar';
import { GET_USER } from '../../../queries/UserQueries';
import './MyReviews.css';

function MyReviews() {
  const [userReviews, setUserReviews] = useState([])

  useQuery(GET_USER, {
    onCompleted: (data) => {
      if(data.user !== null) {
        setUserReviews(data.user.reviews);
      } else {
        return null
      }
    }
  });

  console.log(userReviews)

  return (
    <div className='reviews-page-container'>
      <Navigationbar />
    
      <div className='centering-div'>
          <div className='flex-container'>
            <h2>My Reviews</h2>
            { userReviews.map((review, index) => 
                <div className='review-container'>
                  <p><span>Title:</span> {review.title}</p>
                  <p><span>Comment:</span> {review.comment}</p>
                  <p><span>Rating:</span> {review.rating}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default MyReviews