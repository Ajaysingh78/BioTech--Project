import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Activity } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const demoAccounts = [
    { role: 'Admin', email: 'admin@medishield.ai', password: 'demo123' },
    { role: 'Infection Control Officer', email: 'ico@medishield.ai', password: 'demo123' },
    { role: 'Doctor', email: 'doctor@medishield.ai', password: 'demo123' },
    { role: 'Nurse', email: 'nurse@medishield.ai', password: 'demo123' },
    { role: 'Lab Technician', email: 'lab@medishield.ai', password: 'demo123' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const account = demoAccounts.find(acc => acc.email === email && acc.password === password);
    
    if (account) {
      toast.success(`Welcome back! Logging in as ${account.role}`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } else {
      toast.error('Invalid credentials. Please try a demo account.');
    }
  };

  const quickLogin = (account: typeof demoAccounts[0]) => {
    setEmail(account.email);
    setPassword(account.password);
    toast.success(`Logging in as ${account.role}`);
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Branding */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-3 rounded-xl">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">MediShield AI</h1>
              <p className="text-muted-foreground">Digital Contact Tracing & Screening</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Activity className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Real-time Pathogen Detection</h3>
                <p className="text-sm text-muted-foreground">Advanced NLP identifies MDR organisms from lab results instantly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Activity className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Intelligent Contact Tracing</h3>
                <p className="text-sm text-muted-foreground">Visualize exposure chains with interactive graphs and timelines</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Activity className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Proactive Risk Scoring</h3>
                <p className="text-sm text-muted-foreground">ML-powered predictions to prevent outbreaks before they spread</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials or use a demo account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">Demo Accounts (all password: demo123)</p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <Button
                    key={account.email}
                    variant="outline"
                    size="sm"
                    onClick={() => quickLogin(account)}
                    className="text-xs"
                  >
                    {account.role}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
