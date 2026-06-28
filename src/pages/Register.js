import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('La contraseña debe tener al menos 6 caracteres'); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Cuenta creada con éxito');
      navigate('/cuenta');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error al registrarse');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4"><div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center"><FlaskConical className="h-5 w-5 text-white" /></div><span className="font-heading font-bold text-xl">Nova Peptides</span></div>
        <h1 className="font-heading text-2xl font-bold">Crear cuenta</h1>
        <p className="text-sm text-muted-foreground mt-1">Únete para dar seguimiento a tus pedidos</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><Label>Nombre completo</Label><Input className="mt-1.5" value={form.name} onChange={(e) => set('name', e.target.value)} data-testid="register-name-input" required /></div>
          <div><Label>Correo electrónico</Label><Input type="email" className="mt-1.5" value={form.email} onChange={(e) => set('email', e.target.value)} data-testid="register-email-input" required /></div>
          <div><Label>Contraseña</Label><Input type="password" className="mt-1.5" value={form.password} onChange={(e) => set('password', e.target.value)} data-testid="register-password-input" required /></div>
          <Button type="submit" className="w-full" disabled={loading} data-testid="register-submit-button">{loading ? 'Creando...' : 'Crear cuenta'}</Button>
        </form>
        <p className="text-sm text-muted-foreground mt-4 text-center">¿Ya tienes cuenta? <Link to="/login" className="text-[hsl(var(--primary))] font-medium">Inicia sesión</Link></p>
      </Card>
    </div>
  );
};

export default Register;
