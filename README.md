# 🚀 MERN Authentication App

**A full-stack MERN Authentication Application that provides secure user management with modern best practices. It includes user registration with email OTP verification, secure login/logout using JWT and HTTP-only cookies, password reset with email OTP, and refresh token-based session handling.**

---

## 🔥 Features Overview

- 📝 **User Registration** with Email OTP Verification  
- 🔑 **Secure Login & Logout** with JWT + Cookies  
- 🔄 **Access & Refresh Token** flow for session management  
- 📩 **Forgot Password** → OTP → Set New Password  
- ⏱ **OTP Expiry & Resend** support  
- 🛡 **Hashed Passwords & OTPs** using Bcrypt  
- 🔒 **Protected Routes** & Auth Middleware  
- ⚡ **Clean Project Structure** (Client + Server)  
- 🌐 **Ready for Production Deployment**  

---

## 📝 Register (User Signup)

- 👤 New user signs up with **Name, Email & Password**  
- 📩 System sends a **6-digit OTP** to the registered email  
- ✅ User enters OTP → Email is **verified & account activated**  
- 🛡 OTPs are **time-limited** (e.g., 10 minutes) & **hashed** for security  
- 🔄 **Resend OTP** available if needed  

---

## 🔑 Login

- 📧 User logs in with **Email & Password**  
- 🛡 Credentials are **verified & password hashed** (Bcrypt)  
- 🍪 On success, **Access & Refresh Tokens** are stored in **HTTP-only cookies**  
- 🔄 Automatic **token refresh** keeps the session alive securely  
- 🚫 Invalid credentials → **error response with status code**  

---

## 📩 Email (OTP) Setup

- Configure your **SMTP provider** in `server/.env`  
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_app_password
EMAIL_FROM="MERN Auth <no-reply@yourapp.com>"
