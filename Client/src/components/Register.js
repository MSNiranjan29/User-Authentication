import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register({ setAlertMessage }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    reEnterPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const registerhandle = async () => {
    try {
      const { username, email, password, reEnterPassword } = user;

      // Validate user input
      if (!username || !email || !password || !reEnterPassword) {
        throw new Error("Please fill out all fields.");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.");
      }

      // Validate password length
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      // Check if password and re-entered password match
      if (password !== reEnterPassword) {
        throw new Error("Passwords do not match. Please re-enter passwords.");
      }

      // Send POST request to register user
      const response = await axios.post("http://localhost:5000/api/register", user);

      // Log response data
      console.log("Response:", response.data);

      // Alert message from server
      setAlertMessage(response.data.message);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error("Registration failed:", error.message);
      setAlertMessage("Registration failed: " + error.message);
    }
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      <input type='text' name="username" value={user.username} placeholder='Your Username' onChange={handleChange} required />
      <input type='text' name="email" value={user.email} placeholder='Your Email' onChange={handleChange} required />
      <input type='password' name="password" value={user.password} placeholder='Your Password' onChange={handleChange} required />
      <input type='password' name="reEnterPassword" value={user.reEnterPassword} placeholder='Re-enter Password' onChange={handleChange} required />
      <div className='button' onClick={registerhandle}>Register</div>
    </div>
  );
}

export default Register;
