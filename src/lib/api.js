import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('np_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

// Currency formatting (MXN)
export const formatMXN = (value) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);

export const PAYMENT_METHODS = [
  { id: 'mercado_pago', label: 'Mercado Pago', desc: 'Tarjetas, saldo y meses sin intereses', icon: 'Wallet' },
  { id: 'tarjeta', label: 'Tarjeta de crédito / débito', desc: 'Visa, Mastercard, American Express', icon: 'CreditCard' },
  { id: 'oxxo', label: 'OXXO (efectivo)', desc: 'Paga en cualquier tienda OXXO', icon: 'Store' },
  { id: 'spei', label: 'Transferencia SPEI', desc: 'Transferencia bancaria interbancaria', icon: 'Landmark' },
  { id: 'contra_entrega', label: 'Pago contra entrega', desc: 'Paga al recibir tu pedido', icon: 'Truck' },
];

export const PAYMENT_LABELS = PAYMENT_METHODS.reduce((acc, m) => { acc[m.id] = m.label; return acc; }, {});

export const STATUS_LABELS = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};
