import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// La cuenta manda: si trae idioma/tema preferidos (María: portugués y
// oscuro), se aplican sobre lo que tenga el navegador. Se aplica al iniciar
// sesión Y en cada carga con sesión ya abierta — dentro de la sesión, lo que
// la persona elija se respeta (y se guarda en su cuenta desde los propios
// contextos de idioma/tema).
const aplicarPrefsDeCuenta = (u) => {
  try {
    if (u?.preferred_language || u?.preferred_theme) {
      window.dispatchEvent(new CustomEvent('exygen-account-prefs', {
        detail: { language: u.preferred_language, theme: u.preferred_theme },
      }));
    }
  } catch { /* sin window (tests): no pasa nada */ }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('np_token');
    if (token) {
      api.get('/auth/me')
        .then((res) => {
          setUser(res.data);
          // También al recargar con sesión ya abierta: la cuenta es la fuente
          // de verdad. Esto no pisa la elección manual del usuario, porque
          // cuando cambia idioma/tema con sesión abierta los contextos ya lo
          // guardan en su cuenta (PUT /auth/me/prefs).
          aplicarPrefsDeCuenta(res.data);
        })
        .catch((err) => {
          // OJO: solo se tira el token si el servidor DIJO que no sirve.
          // Antes, cualquier fallo lo borraba — incluido un timeout o un 502.
          // O sea que una intermitencia de la API cerraba la sesión de todo el
          // que recargara la página, y encima para siempre: el token ya no
          // estaba para reintentar. Un servidor que no contesta no sabe nada
          // sobre la validez de tu sesión.
          const estado = err?.response?.status;
          if (estado === 401 || estado === 403) localStorage.removeItem('np_token');
        })
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
    aplicarPrefsDeCuenta(res.data.user);
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
    aplicarPrefsDeCuenta(sessionUser);
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
