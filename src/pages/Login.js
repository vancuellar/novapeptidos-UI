import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FlaskConical, ShieldCheck, Truck, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success('Bienvenido de nuevo');
      navigate(user.role === 'admin' ? '/admin' : '/cuenta');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error al iniciar sesión');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="flex items-center gap-2 mb-4"><div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center"><FlaskConical className="h-5 w-5 text-[hsl(var(--primary-foreground))]" /></div><span className="font-heading font-bold text-xl">Nova Peptides</span></div>
          <h2 className="font-heading text-2xl font-bold tracking-tight">Tu fuente confiable de péptidos de investigación en México</h2>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><ShieldCheck className="h-5 w-5 text-[hsl(var(--primary))]" /> COA por lote y pureza verificada</li>
            <li className="flex gap-2"><Truck className="h-5 w-5 text-[hsl(var(--primary))]" /> Envío nacional 2-5 días</li>
            <li className="flex gap-2"><BadgeCheck className="h-5 w-5 text-[hsl(var(--primary))]" /> Historial de pedidos y soporte experto</li>
          </ul>
        </div>
        <Card className="p-6">
          <h1 className="font-heading text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-sm text-muted-foreground mt-1">Accede a tu cuenta de Nova Peptides</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div><Label>Correo electrónico</Label><Input type="email" className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="login-email-input" required /></div>
            <div><Label>Contraseña</Label><Input type="password" className="mt-1.5" value={password} onChange={(e) => setPassword(e.target.value)} data-testid="login-password-input" required /></div>
            <Button type="submit" className="w-full" disabled={loading} data-testid="login-submit-button">{loading ? 'Ingresando...' : 'Iniciar sesión'}</Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4 text-center">¿No tienes cuenta? <Link to="/registro" className="text-[hsl(var(--primary))] font-medium">Regístrate</Link></p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
