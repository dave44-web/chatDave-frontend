import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillHome } from "react-icons/ai";
import { FaRobot } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <nav className='navbar'>
        <ul className='nav-links'>
            {isAuthenticated ? (
              <>
                <li><Link className='link' to='/chatbot'><FaRobot /></Link></li>
                <li><Link className='link' to='/notes'><LuNotebookPen /></Link></li>
                <li><Link className='link' to='/account'><FaUser /></Link></li>
                <button onClick={handleLogout}><CiLogout /></button>
              </>
            ) : (
              <>
              <li><Link className='link' to='/'><AiFillHome /></Link></li>
                <Link to='/login' className='link log-sign'>Log In</Link>
                <Link to='/register' className='link log-sign'>Register</Link>
              </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar