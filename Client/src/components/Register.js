// Register.js
import React, { useState } from 'react';

function Register({ setAlertMessage }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setAlertMessage('Please fill in all fields.'); // Alert for empty fields
      return;
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setAlertMessage('User registered successfully.'); // Alert for successful registration
        // Redirect or handle success
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error(error);
      // Handle error
      setAlertMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '300px' }}>      
    <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required /><br />
        <br />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
        <br />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
