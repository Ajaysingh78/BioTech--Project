import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Network, 
  AlertTriangle, 
  FlaskConical, 
  Radio, 
  Settings,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Patient Tracker', href: '/patients', icon: Users },
  { name: 'Contact Graph', href: '/contacts', icon: Network },
  { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'Lab Ingest', href: '/lab', icon: FlaskConical },
  { name: 'Devices', href: '/devices', icon: Radio },
  { name: 'Admin', href: '/admin', icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="bg-primary p-2 rounded-lg">
          <Shield className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">MediShield AI</h1>
          <p className="text-xs text-muted-foreground">Contact Tracing</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Hospital Info */}
      <div className="border-t border-border p-4">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Current Facility</p>
          <p className="text-sm font-semibold text-foreground">Central Metro Hospital</p>
          <p className="text-xs text-muted-foreground mt-1">4 wards • 72 beds</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
