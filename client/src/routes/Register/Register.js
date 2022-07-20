import React, { useEffect, useState } from 'react';
import Navigationbar from '../../components/NavigationBar/Navigationbar';
import './Register.css';
import { ADD_USER_MUTATION } from '../../queries/UserQueries';
import { useMutation } from '@apollo/client';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false)

  const [addUser, { data }] = useMutation(ADD_USER_MUTATION)

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({
        variables: {
            name,
            email,
            userName,
            password,
            passwordConfirm
          }
    });
    
}

  useEffect(() => {
    if(data){
      if(data.addUser.userErrors.length) {
        setError(data.addUser.userErrors[0].message);
        console.log(error);
      };
      if(data.addUser.token){
        localStorage.setItem("token", data.addUser.token);
        setSuccess(true);
        setTimeout(() => {
          window.location = '/login';
        }, "1000");     
      };
    }
  }, [data, error])

  return (
    <div>
      <Navigationbar />

      <div className='centering-container'>
        <div className='register-container'>
          {success ? <SuccessMessage message={'Account added successfully'} /> : null}
            <h2>Create your account</h2>
            <form onSubmit={handleSubmit}>
            {error && <p style={{color:"red", fontWeight:600}}>{error}</p>}
                <input type="text" className='login-input' title="name" placeholder="Name" onChange={(e) => setName(e.target.value)}/><br/>
                <input type="email" className='login-input' title="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/><br/>
                <input type="text" className='login-input' title="username" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/><br/>
                <input type="password" className='login-input' title="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/><br/>
                <input type="password" className='login-input' title="confirm password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirm(e.target.value)}/><br/>
                <button type="submit" className='register-button'>Register</button><br/>
                <p>Already a member? Sign-in <a className="register" href="/login">here!</a></p>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register