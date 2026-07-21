import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('np_token');
    if (token) {
      api.get('/auth/me')
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem('np_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    // Cuentas con 2FA (admins): la contrasena sola no basta; la pantalla de
    // login pide el codigo con el pase corto que manda el servidor.
    if (res.data.needs_totp) return res.data;
    localStorage.setItem('np_token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  // El registro YA NO inicia sesion: la cuenta nace sin confirmar y el usuario
  // tiene que abrir el enlace del correo. Devolvemos la respuesta tal cual para
  // que la pantalla muestre "revisa tu correo".
  const register = async (name, email, password, consents = {}) => {
    const language = localStorage.getItem('nova-language') || 'es';
    const res = await api.post('/auth/register', { name, email, password, language, ...consents });
    return res.data;
  };

  // Sesion que llega ya resuelta por el backend (confirmar correo o activar invitacion).
  const adoptSession = (token, sessionUser) => {
    localStorage.setItem('np_token', token);
    setUser(sessionUser);
  };

  const logout = () => {
    localStorage.removeItem('np_token');
    setUser(null);
  };

  const refreshUser = async () => {
    const res = await api.get('/auth/me');
    setUser(res.data);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, adoptSession }}>
      {children}
    </AuthContext.Provider>
  );
};
