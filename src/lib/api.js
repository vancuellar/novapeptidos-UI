import axios from 'axios';
import { registrarFallo, registrarExito } from '@/lib/estadoApi';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// El timeout NO es un lujo. Sin él, axios espera indefinidamente: una petición
// a un backend colgado (que acepta la conexión y no contesta) se queda pegada
// hasta que el sistema operativo se rinde, dos minutos después. Durante ese
// rato el navegador tiene el hueco ocupado y la página se siente muerta.
const ESPERA_MAXIMA = 20000;

const api = axios.create({ baseURL: API, timeout: ESPERA_MAXIMA });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('np_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------------------------------------------------------------------------
//  Reintentos con espera creciente
// ---------------------------------------------------------------------------
//
//  SOLO se reintentan las lecturas (GET). Un POST JAMÁS se reintenta: repetir
//  un POST /orders crea un pedido doble y un cobro doble. Ese es el motivo de
//  que esta lista sea tan corta y tan aburrida.
//
//  Y solo cuando el fallo es del transporte, no del contenido: sin respuesta
//  (red caída, DNS, timeout) o 502/503/504 (la puerta está, el de adentro no).
//  Un 400 o un 401 son respuestas legítimas y no se repiten.

const METODOS_QUE_SE_REPITEN = ['get', 'head', 'options'];
const CODIGOS_QUE_SE_REPITEN = [502, 503, 504];
const ESPERAS = [500, 1500]; // dos reintentos: tres intentos en total

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

const sePuedeReintentar = (error) => {
  const metodo = (error.config?.method || '').toLowerCase();
  if (!METODOS_QUE_SE_REPITEN.includes(metodo)) return false;
  if (!error.response) return true;                                  // sin respuesta
  return CODIGOS_QUE_SE_REPITEN.includes(error.response.status);     // pasarela caída
};

const esFalloDeTransporte = (error) =>
  !error.response || CODIGOS_QUE_SE_REPITEN.includes(error.response.status);

api.interceptors.response.use(
  (respuesta) => {
    registrarExito();
    return respuesta;
  },
  async (error) => {
    const config = error.config;

    if (config && sePuedeReintentar(error)) {
      config.__intentos = config.__intentos || 0;
      if (config.__intentos < ESPERAS.length) {
        await dormir(ESPERAS[config.__intentos]);
        config.__intentos += 1;
        return api(config);
      }
    }

    // Se acabaron los intentos (o no aplicaban).
    if (esFalloDeTransporte(error)) {
      registrarFallo();
      // Marca para que quien atrape el error sepa distinguir "el servidor dijo
      // que no" de "el servidor no contestó", y pueda dar el mensaje correcto.
      error.sinRespuesta = true;
    } else {
      // Hubo respuesta del servidor (400, 401, 404...): la API está viva.
      registrarExito();
    }
    return Promise.reject(error);
  },
);

/**
 * ¿Este error fue porque el servidor no contestó (y no porque dijera que no)?
 * Sirve para elegir entre "código no válido" y "estamos en mantenimiento".
 */
export const esCaidaDeApi = (error) =>
  Boolean(error?.sinRespuesta) ||
  (!error?.response && Boolean(error?.request)) ||
  error?.code === 'ECONNABORTED' ||
  error?.code === 'ERR_NETWORK';

export default api;

// Currency formatting (MXN)
export const formatMXN = (value) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);

export const PAYMENT_METHODS = [
  { id: 'tarjeta', icon: 'CreditCard' },
  { id: 'oxxo', icon: 'Store' },       // efectivo en tienda, vía Mercado Pago
  { id: 'spei', icon: 'Landmark' },
  { id: 'cripto', icon: 'Bitcoin' },
];
