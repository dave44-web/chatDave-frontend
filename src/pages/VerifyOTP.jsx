import { useEffect, useRef, useState } from "react"
import { verifyOTP, sendOTP } from "../utils/api"
import { useNavigate } from "react-router-dom"
import { FaCheck } from "react-icons/fa6";

const VerifyOTP = ({ email: initialEmail }) => {

    const [email, setEmail] = useState(initialEmail || "")
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [resendDisabled, setResendDisabled] = useState(false);
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
            alert("Please enter email");
            return;
        }

        if (enteredOtp.length !== otp.length){
            alert("Enter complete Otp");
            return;
        }
        try {
            const result = await verifyOTP(email, enteredOtp);
            alert(result.message);
            navigate("/login");
        } catch (error) {
            alert(error.message)
        }
    }

    const handleResendOTP = async () => {
        if(!email) {
            alert("Email is required to resend OTP");
            return;
        }
        setResendDisabled(true);
        try {
            const response = await sendOTP(email);
            alert(response.message);
        } catch (error) {
            alert(error.message || "Error resending OTP");
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
            <button onClick={handleSubmit}>Verify <FaCheck /></button>
            <button onClick={handleResendOTP} disabled={resendDisabled}>
                {resendDisabled ? "Resend OTP (Wait 1 min)" : "Resend OTP"}
            </button>
    </div>
  )
}

export default VerifyOTP