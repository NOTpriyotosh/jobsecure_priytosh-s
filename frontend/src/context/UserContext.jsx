import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user from backend (persistent login)
  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
      setUser(res.data);
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Save user after login/signup
  const saveUser = (userData) => {
    setUser(userData);
  };

  // Logout
  const logout = async () => {
    await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logout, fetchCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
