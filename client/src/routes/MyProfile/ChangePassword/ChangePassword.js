import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Navigationbar from '../../../components/NavigationBar/Navigationbar';
import SuccessMessage from '../../../components/SuccessMessage/SuccessMessage';
import { CHANGE_PASSWORD_MUTATION } from '../../../queries/UserQueries';
import './ChangePassword.css';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false)

  const [changePassword, { data }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: (data) => console.log(data)
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword({
        variables: {
            currentPassword,
            password,
            passwordConfirm
          }
    });
  }

  useEffect(() => {
    if(data){
      if(data.changePassword.userErrors.length) {
        setError(data.changePassword.userErrors[0].message)
        console.log(error)
      }
      if(data.changePassword.status === 'Success'){
        setSuccess(true);    
      };
    }
  }, [data, error])


  return (
    <div>
      <Navigationbar />

      <div className='centering-div'>
      {success ? <SuccessMessage message={'Password Updated Successfully'} /> : null}
        <div className='change-password-container'>
            <h2>Change Your Password</h2>
            <form onSubmit={handleSubmit}>
              {error && <p style={{color:"red", fontWeight:600}}>{error}</p>}
              <input type="password" className='passwordChange-input' title="Email" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)}/><br/>
              <input type="password" className='passwordChange-input' title="Password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)}/><br/>
              <input type="password" className='passwordChange-input' title="Password" placeholder="Confirm New Password" onChange={(e) => setPasswordConfirm(e.target.value)}/><br/>
              <button type="submit" className='passwordChange-button'>Submit</button><br/>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword