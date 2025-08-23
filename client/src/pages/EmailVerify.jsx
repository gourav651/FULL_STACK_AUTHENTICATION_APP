import React, { useState, useRef, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = () => {

  const [otp, setOtp] = useState(new Array(6).fill(""));
  axios.defaults.withCredentials = true;
  const {backendUrl,isLoggedin,userData,getUserData} = useContext(AppContent)

  const navigate = useNavigate();

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // allow only numbers
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const onSubmitHandler = async (e)=>{
    try{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e=> e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account',{otp})

      if(data.success){
        toast.success(data.message)
        getUserData();
        navigate('/')
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim().slice(0, 6);
    const pasteArray = paste.split("");

    const newOtp = [...otp];
    pasteArray.forEach((char, index) => {
      if (index < newOtp.length) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);

    // Focus next empty field
    const firstEmpty = pasteArray.length < 6 ? pasteArray.length : 5;
    if (inputRefs.current[firstEmpty]) {
      inputRefs.current[firstEmpty].focus();
    }
  };

  useEffect(()=>{
    isLoggedin && userData && userData.isVerified && navigate('/')},[isLoggedin,userData])


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 ">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form onSubmit={onSubmitHandler} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6 digit code sent to your email id
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {otp.map((value, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              value={value}
              required
              className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
