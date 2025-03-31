import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api'

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const data = await registerUser(name, email, password);
        alert(data.message)

        localStorage.setItem("email", email)

        navigate("/verify-otp");
      } catch(error) {
        alert(error.message || "Registeration Failed");
      }
    };

  return (
    <div className='login-container'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input type="name" value={name} onChange={(e) => setName(e.target.value)} required />
              <label>Name</label>
            </div>
            <div className="input-box">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label>E-mail</label>
            </div>
            <div className="input-box">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <label>Password</label>
            </div>
            <button type='submit'>Register</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </div>
  )
}

export default Register