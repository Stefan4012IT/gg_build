import React, { createContext, useState, useEffect } from 'react';

// Kreiramo kontekst
export const AuthContext = createContext();

// Provider komponenta
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Trenutni korisnik
  const [token, setToken] = useState(null); // JWT token

  // Inicijalizacija korisnika iz lokalnog skladišta pri učitavanju aplikacije
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Funkcija za logovanje
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
  };

  // Funkcija za odjavu
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};