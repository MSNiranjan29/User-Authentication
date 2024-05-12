// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import About from './components/About';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null); // State for alert messages

  const logout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        {/* Alert Message */}
        {alertMessage && <div className="alert">{alertMessage}</div>}

        <nav>
          <ul>
            {loggedIn && (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/register" element={<Register setAlertMessage={setAlertMessage} />} /> {/* Pass setAlertMessage */}
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setAlertMessage={setAlertMessage} />} /> {/* Pass setAlertMessage */}
          <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
