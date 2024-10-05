import React, { createContext, useState, useEffect } from 'react';

// Create the Auth context
const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    isAuthenticated: false,
  });

  // This will check if there's a token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({
        token: token,
        isAuthenticated: true,
      });
    }
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({
      token: token,
      isAuthenticated: true,
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
