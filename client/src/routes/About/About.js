import React from 'react';
import './About.css';
import Footer from '../../components/Footer/Footer';
import Navigationbar from '../../components/NavigationBar/Navigationbar';

function About() {
  return (
    <div>
        <Navigationbar />
        
        <div className='about-container'>
          <div className='about-section'>
            <h1>Who We Are</h1>
            <img src='https://udisc-parse.s3.amazonaws.com/r_f66151e4-681c-4d1c-a4a3-3ba6d58e1360_FBBA9829-1589-4F7E-8948-08790B5CA121.jpeg' alt='disc golf store' />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Diam vulputate ut pharetra sit amet. Erat pellentesque adipiscing commodo elit at imperdiet dui. Amet nisl suscipit adipiscing bibendum est ultricies. Eget mi proin sed libero enim sed faucibus. Maecenas pharetra convallis posuere morbi leo. Eros donec ac odio tempor. Purus in massa tempor nec. Integer eget aliquet nibh praesent tristique magna sit. Senectus et netus et malesuada fames ac. Justo laoreet sit amet cursus sit. Gravida rutrum quisque non tellus orci ac auctor augue.</p>
          </div>
        </div>

        <div className='footer-placement'>
          <Footer />
        </div>
    </div>
  )
}

export default About