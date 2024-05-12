import React, { useState } from 'react';

function Login({ setLoggedIn }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });
    if (response.ok) {
      setLoggedIn(true);
      // Redirect or handle success
    } else {
      // Handle error
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '300px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
        <br />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
