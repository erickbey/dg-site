import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Navigationbar from '../../../components/NavigationBar/Navigationbar';
import SuccessMessage from '../../../components/SuccessMessage/SuccessMessage';
import { CHANGE_USER_INFO_MUTATION } from '../../../queries/UserQueries';
import './MyInformation.css';

function MyInformation() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false)

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
      };
      if(data.updateUser.status === 'Success'){
        setSuccess(true);    
      };
    }
  }, [data, error])


  return (
    <div>
      <Navigationbar />

      <div className='centering-div'>
      {success ? <SuccessMessage message={'User Info Updated Successfully'} /> : null}
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