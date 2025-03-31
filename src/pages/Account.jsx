import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getUser } from '../utils/api';
import TypingIndicator from '../components/TypingIndicator';
import { FaLink } from "react-icons/fa6";

const Account = () => {

  const [user, setUser] = useState(null);
  const [verified, setVerified] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData)
        
      } catch (error) {
        console.error("Error loading user: ", error);
        alert("Error loading user: ", error);
      }
    };
    fetchUser();
  }, []);

  const getVerification = () => {
    if (user.isVerified == true) {
      alert("User is verified");
      setVerified("Yes");
    }
  }

  return (
    <div className='Account'>
      <h2>Account Details</h2>
      {
        user ? (
          <div className='account-details'>
            <div className="details">
              <p><strong>Name: </strong>{user.name}</p>
              <p><strong>Email: </strong>{user.email}</p>
            </div>

            <div className="verify-details">
              <p><strong>Verified:</strong> {verified}</p>
              <button onClick={getVerification}>Check Verification</button>
            </div>

            <div className="password-change">
              <Link to='/forgotten-password' className='link'>Change Password <FaLink /></Link>
            </div>
          </div>

        ) : (
          <TypingIndicator />
        )
      }
    </div>
  )
}

export default Account