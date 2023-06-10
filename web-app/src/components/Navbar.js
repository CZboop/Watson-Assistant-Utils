import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='Navbar'>
        <h1><span className="navbar__title"><Link className="navbar__links-title" to="/home">Watson Assistant Utils</Link></span></h1>
        <div className='navbar__links'>
            <Link to='/home'><button className='navbar__links-home'>Home</button></Link>
            <Link to='/find-intent'><button className='navbar__links-find-intent'>Find Intent</button></Link>
            <Link to='/find-nodes'><button className='navbar__links-find-nodes'>Find Nodes</button></Link>
            <Link to='/find-jumps'><button className='navbar__links-find-jumps'>Find Jump-Tos</button></Link>
        </div>
    </div>
  )
}

export default Navbar;