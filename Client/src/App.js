import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleLogout = () => {
    setLoggedIn(false);
    setAlertMessage('Logged out successfully');
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {loggedIn ? (
              <>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <div className="button" onClick={handleLogout}>Logout</div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        {alertMessage && <div className="alert">{alertMessage}</div>}
        <Routes>
          <Route path="/register" element={<Register setAlertMessage={setAlertMessage} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setAlertMessage={setAlertMessage} />} />
          <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
