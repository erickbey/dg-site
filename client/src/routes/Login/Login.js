import React, { useEffect, useState } from 'react';
import Navigationbar from '../../components/NavigationBar/Navigationbar';
import './Login.css';
import { SIGN_IN_MUTATION } from '../../queries/UserQueries';
import { useMutation } from '@apollo/client';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [signIn, { data }] = useMutation(SIGN_IN_MUTATION)

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({
        variables: {
            email,
            password
          }
    });
  }

  useEffect(() => {
    if(data){
      if(data.signIn.userErrors.length) {
        setError(data.signIn.userErrors[0].message)
        console.log(error)
      }
      if(data.signIn.token){
        localStorage.setItem("token", data.signIn.token)
        window.location = '/';
      } 
    }
  }, [data, error])

  return (
    <div>
      <Navigationbar />

      <div className='centering-container'>
        <div className='login-container'>
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit}>
              {error && <p style={{color:"red", fontWeight:600}}>{error}</p>}
              <input type="email" className='login-input' title="Email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/><br/>
                <input type="password" className='login-input' title="Password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/><br/>
                <button type="submit" className='login-button'>Login</button><br/>
                <p>Not a member? Sign up<a className="login" href="/register"> here!</a></p>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login