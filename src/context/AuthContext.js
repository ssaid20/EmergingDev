import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call an API endpoint to check if the user is authenticated
    fetch('/api/user', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setCurrentUser(data);
        setLoading(false);
      });
  }, []);

  const handleLogin = (username, password) => {
    return fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to log in');
    })
    .then(data => {
      setCurrentUser(data);
    });
  };

  const handleLogout = () => {
    return fetch('/api/user/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(() => {
      setCurrentUser(null);
    });
  };

  const handleRegister = (username, password) => {
    return fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to register');
    })
    .then(data => {
      setCurrentUser(data);
    });
  };

  const value = {
    currentUser,
    handleLogin,
    handleLogout,
    handleRegister
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
