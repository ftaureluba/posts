// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {}
});

export const AuthProvider = ({
  children
}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token);
  }, []);

  const login = (token: any) => {
    localStorage.setItem('auth-token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;