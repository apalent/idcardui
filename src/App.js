import React, { useState } from 'react';
import LoginPage from './LoginPage'; // Assuming you have a LoginPage component
import IdCardForm from './IdCardForm'; // Your IdCardForm component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLoginSuccess = (value) => {
    // You can call this function when the login is successful
    setIsAdmin(value)
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <IdCardForm isAdmin= {isAdmin}/>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
