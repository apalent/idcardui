import React, { useState } from 'react';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {

    const correctUsername = process.env.REACT_APP_USERNAME;
    const correctPassword = process.env.REACT_APP_PASSWORD;
    const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
    if (username === correctUsername && password === correctPassword) {
      // Redirect to the main page or perform a successful login action
      onLoginSuccess(false);
    } else  if (username === adminUsername && password === adminPassword) {
      onLoginSuccess(true);
    }
    else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '2rem',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          maxWidth: '300px',
        }}
      >
        <h1
          style={{
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '1.5rem',
          }}
        >
          Login
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        {loginError && (
          <p
            className="error"
            style={{
              color: 'red',
              textAlign: 'center',
              marginTop: '1rem',
            }}
          >
            {loginError}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
