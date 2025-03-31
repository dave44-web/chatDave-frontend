import React, { useRef, useState } from 'react'
import { requestPasswordReset, resetPassword } from '../utils/api';
import { useNavigate } from 'react-router-dom';


const ForgottenPassword = () => {
    const [email, setEmail] = useState("");
        const [otp, setOtp] = useState(new Array(6).fill(""));
        const [newPassword, setNewPassword] = useState("")
        const [step, setStep] = useState(1);
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
            const res = await requestPasswordReset(email);
            alert(res.message);
            if (res.message === "Otp sent") setStep(2);
        };
    
        const handleResetPassword = async (e) => {
            e.preventDefault();
    
            const enteredOtp = otp.join("");
            if (enteredOtp.length !== otp.length) {
                alert("Enter Complete OTP")
                return;
            }
    
            const res = await resetPassword(email, enteredOtp, newPassword);
    
            alert(res.message);
            if (res.message === "Password Reset successful");
            localStorage.removeItem("token")
            navigate('/login')
        }
  return (
    <div className='change-pass'>
        {step === 1 ? (
            <>
                <h2>Change Password</h2>
                <input type="text" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={handleRequestOtp}>Verify Email</button>
            </>
        ) : (
            <>
                <h2>Otp and New Password</h2>
                <div className="otp-inputs">
                {otp.map((digit, index) => (
                    <input key={index} type="text" value={digit} maxLength='1' ref={(el) => (inputRefs.current[index] = el)} onChange={(e) => handleChange(index, e)} onKeyDown={(e) => handleKeyDown(index, e)} className="otp-box" />
                ))}
                </div>
                <input type="password" placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button onClick={handleResetPassword}>Reset Password</button>
            </>
        )}
    </div>
  )
}

export default ForgottenPassword