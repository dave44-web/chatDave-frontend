import React, { useRef, useState } from 'react'
import { requestPasswordReset, resetPassword } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import TypingIndicator from "../components/TypingIndicator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgottenPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [newPassword, setNewPassword] = useState("")
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    
        const handleChange = (index, e) => {
            const value = e.target.value;
            if (!isNaN(value) && value.length <= 1) {
                const newOtp = [...otp];
                newOtp[index] = value;
                setOtp(newOtp);
    
                if (value && index < otp.length - 1){
                    inputRefs.current[index + 1].focus();
                }
            }
        };
    
        const handleKeyDown = (index, e) => {
            if (e.key === "Backspace" && !otp[index] && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    
        const handleRequestOtp = async () => {
            setLoading(true);

            const res = await requestPasswordReset(email);
            if (res.message === "User not found") {
                toast.error(res.message);
            };
            if (res.message === "Otp sent") {
                toast.success(res.message)
                setStep(2)
            };
            setLoading(false);
        };
    
        const handleResetPassword = async (e) => {
            e.preventDefault();
            setLoading(true);
    
            const enteredOtp = otp.join("");
            if (enteredOtp.length !== otp.length) {
                toast.warning("Enter Complete OTP")
                setLoading(false);
                return;
            }
    
            const res = await resetPassword(email, enteredOtp, newPassword);
            toast.success(res.message);
            if (res.message === "Password Reset successful"){
                localStorage.removeItem("token")
                navigate('/login')
            }
            setLoading(false);
        }
  return (
    <div className='change-pass'>
        {step === 1 ? (
            <>
                <h2>Change Password</h2>
                <input type="email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} className='email' required/>
                
                {loading ? (
                    <button onClick={handleRequestOtp} className='btn'><TypingIndicator /></button>
                ) : (
                    <button onClick={handleRequestOtp} className='btn'>Verify Email</button>
                )}
            </>
        ) : (
            <>
                <h2>Otp and New Password</h2>
                <div className="otp-inputs">
                {otp.map((digit, index) => (
                    <input key={index} type="text" value={digit} maxLength='1' ref={(el) => (inputRefs.current[index] = el)} onChange={(e) => handleChange(index, e)} onKeyDown={(e) => handleKeyDown(index, e)} className="otp-box" />
                ))}
                </div>
                <input type="password" placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='password' />
                
                {loading ? (
                    <button onClick={handleResetPassword} className='btn'><TypingIndicator /></button>
                ) : (
                    <button onClick={handleResetPassword} className='btn'>Reset Password</button>
                )}
            </>
        )}
        <ToastContainer
        theme='dark' />
    </div>
  )
}

export default ForgottenPassword