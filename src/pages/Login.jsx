import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import { IoIosLogIn } from "react-icons/io";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(!email || !password){
        alert("Email and Password are required");
        return;
      }

      try {
        const data = await loginUser(email, password);
        alert("Login Successful");

        localStorage.setItem("token", data.token);
        navigate("/chatbot");
      }catch(error) {
        alert(error.message || "Login Failed");
        if (error.message === "Email not verified, Please verify your email") {
          navigate('/verify-otp');
        }
      }
    };

  return (
    <div className='login-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>E-mail</label>
          </div>
          <div className="input-box">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label>Password</label>
          </div>
            <button type='submit'><IoIosLogIn /> Login</button>
          <p>Don't have an account? <a href="/register">Register</a></p>
          <a href="/forgotten-password">Forgotten Password ?</a>
        </form>
    </div>
  )
}

export default Login