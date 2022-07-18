import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Navigationbar from '../../../components/NavigationBar/Navigationbar';
import { CHANGE_PASSWORD_MUTATION } from '../../../queries/UserQueries';
import './ChangePassword.css';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [error, setError] = useState("");

  const [changePassword, { data }] = useMutation(CHANGE_PASSWORD_MUTATION)

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword({
        variables: {
            currentPassword,
            password,
            passwordChange
          }
    });
  }

  useEffect(() => {
    if(data){
      if(data.changePassword.userErrors.length) {
        setError(data.signIn.userErrors[0].message)
        console.log(error)
      }
    }
  }, [data, error])


  return (
    <div>
      <div className='centering-div'>
        <div className='change-password-container'>
            <h2>Change Your Password</h2>
            <form onSubmit={handleSubmit}>
              {error && <p style={{color:"red", fontWeight:600}}>{error}</p>}
              <input type="email" className='passwordChange-input' title="Email" placeholder="email" onChange={(e) => setCurrentPassword(e.target.value)}/><br/>
              <input type="password" className='passwordChange-input' title="Password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/><br/>
              <input type="password" className='passwordChange-input' title="Password" placeholder="passwordChange" onChange={(e) => setPasswordChange(e.target.value)}/><br/>
              <button type="submit" className='passwordChange-button'>Submit</button><br/>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword