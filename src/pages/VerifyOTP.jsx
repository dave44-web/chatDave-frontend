import { useEffect, useRef, useState } from "react"
import { verifyOTP, sendOTP } from "../utils/api"
import { useNavigate } from "react-router-dom"
import { FaCheck } from "react-icons/fa6";
import TypingIndicator from "../components/TypingIndicator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOTP = ({ email: initialEmail }) => {

    const [email, setEmail] = useState(initialEmail || "")
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [resendDisabled, setResendDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const inputRefs = useRef([]);


    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if(!email && storedEmail){
            setEmail(storedEmail);
        }
    }, [email]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const enteredOtp = otp.join("");

        if(!email) {
            toast.warning("Please enter email");
            return;
        }
        
        if(!enteredOtp) {
            toast.warning("Please enter otp");
            return;
        }

        if (enteredOtp.length !== otp.length){
            toast.error("Enter complete Otp");
            return;
        }
        try {
            setLoading(true);
            const result = await verifyOTP(email, enteredOtp);
            toast.success(result.message);
            setLoading(false);
            navigate("/login");
        } catch (error) {
            toast.error(error.message)
            setLoading(false);
        }
    }

    const handleResendOTP = async () => {
        if(!email) {
            toast.error("Email is required to resend OTP");
            return;
        }
        setResendDisabled(true);
        try {
            const response = await sendOTP(email);
            toast.success(response.message);
        } catch (error) {
            toast.error(error.message || "Error resending OTP");
        }

        setTimeout(() => setResendDisabled(false), 60000);
    }
  return (
    <div className="verify-otp">
        <h2>Verify OTP</h2>
            <input type="email" value={email} readOnly className="email-input" />

            <div className="otp-inputs">
                {otp.map((digit, index) => (
                    <input key={index} type="text" value={digit} maxLength='1' ref={(el) => (inputRefs.current[index] = el)} onChange={(e) => handleChange(index, e)} onKeyDown={(e) => handleKeyDown(index, e)} className="otp-box" />
                ))}
            </div>
            {loading ? (
                <button onClick={handleSubmit}><TypingIndicator /></button>
            ) : (
                <button onClick={handleSubmit}>Verify <FaCheck /></button>
            )}
            <button onClick={handleResendOTP} disabled={resendDisabled}>
                {resendDisabled ? "Resend OTP (Wait 1 min)" : "Resend OTP"}
            </button>
            <ToastContainer
                theme='dark'
            />
    </div>
  )
}

export default VerifyOTP