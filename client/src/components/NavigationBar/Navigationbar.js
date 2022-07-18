import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import { GET_USER } from '../../queries/UserQueries';
import logo from '../../images/logo(1).png';
import './NavigationBar.css';
import { Link } from 'react-router-dom';


function Navigationbar() {
  const [userName, setUserName] = useState("");

  useQuery(GET_USER, {
    onCompleted: (data) => {
      if(data.user !== null) {
        setUserName(data.user.userName);
      } else {
        return null
      }
    }
  });

  const handleLogout = () => {
    localStorage.setItem("token", null);
    window.location.reload()
  }

  return (
    <div>
      <Navbar
        className="test"
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="/" className='header-text' style={{ marginRight: '100px', fontSize: '1.4rem'}}><img className='logo-image' src={logo} alt='logo' /> Flying Hyzer</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className='header-text'>Home</Nav.Link>
              <Nav.Link href="/products" className='header-text'>Products</Nav.Link>
              <Nav.Link href="/about" className='header-text'>About</Nav.Link>
            </Nav>
            <Nav>
              {userName ? <div className='profile-settings-container'>
                            <Nav.Link href="/my-profile/:id">
                              <p className='header-text' variant="secondary" style={{ textDecoration: 'underline'}}>{userName}</p>
                            </Nav.Link>
                              <p className='header-text' variant="secondary" onClick={handleLogout}>Logout</p>
                            <Nav.Link href="/cart">
                              <p className='header-text' variant="secondary">Cart</p>
                            </Nav.Link>
                          </div>
                          
                          : <div className='profile-settings-container'>
                              <Nav.Link href="/login">
                                <p className='header-text' variant="secondary">Login</p>
                              </Nav.Link>
                            </div>
                            }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigationbar;