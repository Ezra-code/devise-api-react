import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = ({isLoggedIn}) => {
  return (
    <div className='navbar'>
        {isLoggedIn ? <Link to='/'>Home</Link> : null}
        {isLoggedIn ? null : <Link to='/login'>Login</Link>}
        {isLoggedIn ? null : <Link to='/signup'>Signup</Link>}
    </div>
  )
}

export default Navbar