import React, { useEffect, useState } from 'react'
import './Header.css';
import logo from '../src/Assets/nlogo.png'

const Header = () => {

  const [show, handleShow] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className = {`header ${ show && "nav__black" }`}>
        <img className='logo' src={logo} alt="" />
      
    </div>
  )
}

export default Header
