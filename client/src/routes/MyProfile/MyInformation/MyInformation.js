import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Navigationbar from '../../../components/NavigationBar/Navigationbar';
import { CHANGE_USER_INFO_MUTATION } from '../../../queries/UserQueries';
import './MyInformation.css';

function MyInformation() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const [changeUserInfo, { data }] = useMutation(CHANGE_USER_INFO_MUTATION)

  const handleSubmit = (e) => {
    e.preventDefault();
    changeUserInfo({
        variables: {
            name,
            userName,
            email
          }
    });
  }

  useEffect(() => {
    if(data){
      if(data.changeUserInfo.userErrors.length) {
        setError(data.signIn.userErrors[0].message)
        console.log(error)
      }
    }
  }, [data, error])


  return (
    <div>
      <div className='centering-div'>
        <div className='change-userInfo-container'>
            <h2>Change Your Personal Information</h2>
            <form onSubmit={handleSubmit}>
              {error && <p style={{color:"red", fontWeight:600}}>{error}</p>}
              <input type="email" className='userInfo-input' title="Email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/><br/>
              <input type="password" className='userInfo-input' title="Password" placeholder="password" onChange={(e) => setName(e.target.value)}/><br/>
              <input type="password" className='userInfo-input' title="Password" placeholder="passwordChange" onChange={(e) => setUserName(e.target.value)}/><br/>
              <button type="submit" className='userInfo-button'>Submit</button><br/>
            </form>
        </div>
      </div>
    </div>
  )
}

export default MyInformation