import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import { IoIosLogIn } from "react-icons/io";
import TypingIndicator from '../components/TypingIndicator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      
      e.preventDefault();
      
      if(!email || !password){
        alert("Email and Password are required");
        return;
      }
      
      setLoading(true);
      try {
        const data = await loginUser(email, password);
        toast.success("Login Successful");
        setLoading(false);

        localStorage.setItem("token", data.token);
        navigate("/chatbot");
      }catch(error) {
        toast.error(error.message || "Login Failed");
        setLoading(false);
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
          {loading ? (
            <button type='submit'><TypingIndicator /></button>
          ) : (
            <button type='submit'><IoIosLogIn /> Login</button>
          )}
          <p>Don't have an account? <Link to="/register">Register</Link></p>
          <Link to="/forgotten-password">Forgotten Password ?</Link>
        </form>
        <ToastContainer theme='dark' />
    </div>
  )
}

export default Login