import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Navigationbar from '../../../components/NavigationBar/Navigationbar';
import { CHANGE_USER_INFO_MUTATION, GET_USER } from '../../../queries/UserQueries';
import './MyInformation.css';

function MyInformation() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  // useQuery(GET_USER, {
  //   onCompleted: (data) => {
  //     if(data.user !== null) {
  //       setCurrentUserId(data.user.id);
  //     } else {
  //       return null
  //     }
  //   }
  // });

  const [updateUser, { data }] = useMutation(CHANGE_USER_INFO_MUTATION, {
    onCompleted: (data) => console.log(data)
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
        variables: {
            name,
            userName,
            email
          }
    });
  }

  useEffect(() => {
    if(data){
      if(data.updateUser.userErrors.length) {
        setError(data.updateUser.userErrors[0].message)
        console.log(error)
      }
    }
  }, [data, error])


  return (
    <div>
      <Navigationbar />

      <div className='centering-div'>
        <div className='change-userInfo-container'>
            <h2>Change Your Personal Information</h2>
            <form onSubmit={handleSubmit}>
              {error && <p style={{color:"red", fontWeight:600}}>{error}</p>}
              <input type="text" className='userInfo-input' title="Name" placeholder="Name" onChange={(e) => setName(e.target.value)}/><br/>
              <input type="text" className='userInfo-input' title="Password" placeholder="User Name" onChange={(e) => setUserName(e.target.value)}/><br/>
              <input type="email" className='userInfo-input' title="Email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/><br/>
              <button type="submit" className='userInfo-button'>Submit</button><br/>
            </form>
        </div>
      </div>
    </div>
  )
}

export default MyInformation