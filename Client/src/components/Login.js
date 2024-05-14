import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedIn, setAlertMessage }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to login user
      const response = await axios.post("http://localhost:5000/api/login", formData);

      if (response.status === 200) {
        setLoggedIn(true);
        navigate('/home');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      setAlertMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br />
        <div className="button" onClick={handleSubmit}>Login</div> {/* Styled button */}
      </form>
    </div>
  );
}

export default Login;
