import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import { GET_USER } from '../../queries/UserQueries';
import logo from '../../images/logo(1).png';
import './NavigationBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function Navigationbar({ cartLength }) {
  const [userName, setUserName] = useState("");

  const items = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(items);

  let displayLength;
  
  if(!cartLength) {
      displayLength = cart.length;
    } else {
      displayLength = cartLength;
    }

  useEffect(() => {
    JSON.parse(localStorage.getItem("cart") || "[]")
  }, [cart])

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
    localStorage.setItem("cart", [])
    window.location.reload()
  }

  return (
    <div className='navigation-container'>
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
                            <DropdownButton id="dropdown-basic-button" title={userName}>
                                <Dropdown.Item href="/change-password"><Nav.Link href={`/user-info/${userName}`}>User Info</Nav.Link></Dropdown.Item>
                                <Dropdown.Item href="/change-password"><Nav.Link href={`/change-password/${userName}`}>Change Password</Nav.Link></Dropdown.Item>
                                <Dropdown.Item href="/change-password"><Nav.Link href={`/my-reviews/${userName}`}>My Reviews</Nav.Link></Dropdown.Item>
                                <Dropdown.Item href="/change-password"><Nav.Link href={`/my-orders/${userName}`}>My Orders</Nav.Link></Dropdown.Item>
                                <Dropdown.Item href="/change-password"><Nav.Link href={`/my-wishlist/${userName}`}>My Wishlist</Nav.Link></Dropdown.Item>
                            </DropdownButton>
                              <p className='header-text' variant="secondary" onClick={handleLogout}>Logout</p>
                            <Nav.Link href="/cart">
                              <p className='header-text' variant="secondary">Cart</p>
                            </Nav.Link>
                            {!displayLength
                            ? null
                            : <button className='cart-display-button'>{displayLength}</button>
                            } 
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