import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='Navbar'>
        <h1><span className="navbar__title"><Link className="navbar__links-title" to="/home">Watson Assistant Utils</Link></span></h1>
        <div className='navbar__links'>
            <Link to='/home'><button className='navbar__links-home' id='nav_home'>Home</button></Link>
            <Link to='/find-jumps'><button className='navbar__links-find-jumps' id='nav_jump-finder'>Jump-To Finder</button></Link>
            <Link to='/find-intent'><button className='navbar__links-find-intent' id='nav_intent-finder'>Node Intent Finder</button></Link>
            <Link to='/find-nodes'><button className='navbar__links-find-nodes' id='nav_node-finder'>Intent Node Finder</button></Link>
        </div>
    </div>
  )
}

export default Navbar;