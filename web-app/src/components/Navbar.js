import React, {useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  // function to switch nav open boolean used to set classes and styling
  const toggleNavOpen = () => {
    setNavOpen(!navOpen);
  }

  // setting state to close navbar on link click (so doesn't stay open when change page), only for mobile/small screens
  const closeNavOnClick = () => {
    setNavOpen(false);
  }
  return (
    <nav className={navOpen ? "Navbar Navbar-open" : "Navbar"}>
        <h1><span className="navbar__title"><Link className="navbar__links-title" to="/home">Watson Assistant Utils</Link></span></h1>
        <div className='navbar__links'>
            <Link to='/home' onClick={()=>closeNavOnClick()}><button className='navbar__links-home' id='nav_home'>Home</button></Link>
            <Link to='/find-jumps' onClick={()=>closeNavOnClick()}><button className='navbar__links-find-jumps' id='nav_jump-finder'>Jump-To Finder</button></Link>
            <Link to='/find-intent' onClick={()=>closeNavOnClick()}><button className='navbar__links-find-intent' id='nav_intent-finder'>Node Intent Finder</button></Link>
            <Link to='/find-nodes' onClick={()=>closeNavOnClick()}><button className='navbar__links-find-nodes' id='nav_node-finder'>Intent Node Finder</button></Link>
        </div>
        <button className={navOpen ? "burger burger-open" : "burger"} id="burger-toggle" onClick={()=>toggleNavOpen()}> 
          <div id="open-button">
          <FontAwesomeIcon icon={faBars} size="lg"/>
          </div>

          <div id="close-button">
          <FontAwesomeIcon icon={faCircleXmark} size="lg"/>
          </div>
        </button>
    </nav>
  )
}

export default Navbar;