import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api'
import TypingIndicator from '../components/TypingIndicator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      setLoading(true);

      try{
        const data = await registerUser(name, email, password);
        toast.success(data.message)
        localStorage.setItem("email", email)

        setLoading(false);

        navigate("/verify-otp");
      } catch(error) {
        toast.error(error.message || "Registeration Failed");
        setLoading(false)
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

            {loading ? (
              <button type='submit'><TypingIndicator /></button>
            ) : (
              <button type='submit'>Register</button>
            )}
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
        <ToastContainer
        theme='dark'
        />
    </div>
  )
}

export default Register