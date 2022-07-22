import React, { useState, useEffect } from 'react';
import './Nav.css';

function Nav() {
  //adding scroll lisner to sence and add black background in nav
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener('scroll'); //it will remove listner before it kicks
    };
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      {/**this means always have class nav but when show is true it will have nav__black */}
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
        alt='Netflix logo'
        className='nav__logo'
      />
      <img
        src='https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
        alt='Netflix Logo'
        className='nav__avatar'
      />
    </div>
  );
}

export default Nav;
