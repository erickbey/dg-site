import React from 'react';
import './Footer.css';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className='footer-container'>

            <div className='social-icons-container'>
                <FacebookIcon className='social-icon' fontSize='large' />
                <TwitterIcon className='social-icon' fontSize='large' />
                <InstagramIcon className='social-icon' fontSize='large' />
                <GoogleIcon className='social-icon' fontSize='large' />
                <LinkedInIcon className='social-icon' fontSize='large' />
            </div>
            <div className='copyright-container'>
                <p>&copy; 2022 Erick Bey</p>
            </div>
    </div>
  )
}

export default Footer